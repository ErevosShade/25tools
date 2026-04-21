"use client";

import { useState, useCallback, useRef } from "react";
import imageCompression from "browser-image-compression";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────
interface ImageItem {
  id:         string;
  file:       File;
  previewUrl: string;
  width:      number;
  height:     number;
}

interface CompressedItem {
  id:             string;
  name:           string;
  originalSize:   number;
  compressedSize: number;
  blobUrl:        string;
}

// ─── Helpers ──────────────────────────────────────────────────
function uid() { return Math.random().toString(36).slice(2, 9); }

function formatBytes(b: number) {
  if (b < 1024)         return `${b} B`;
  if (b < 1024 * 1024)  return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

function savingsPct(orig: number, comp: number) {
  return Math.round(((orig - comp) / orig) * 100);
}

function getDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload  = () => {
      res({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      rej(new Error("Could not read dimensions."));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

// Quality slider 1–100 → maxSizeMB (1 = 0.01MB, 100 = 1.0MB)
function qualityToMaxSizeMB(quality: number): number {
  return parseFloat((quality / 100).toFixed(2));
}

// ─── Size bar ─────────────────────────────────────────────────
function SizeBar({ original, compressed }: { original: number; compressed: number }) {
  const pct     = Math.min(100, (compressed / original) * 100);
  const savings = savingsPct(original, compressed);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-[11px] text-[#6B6B6B] leading-none">
        <span>{formatBytes(original)}</span>
        <span className={cn(
          "px-2 py-0.5 rounded-full font-[500] border text-[10px]",
          savings > 0
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-[#F5F5F5] text-[#6B6B6B] border-[#E5E5E5]"
        )}>
          {savings > 0 ? `Saved ${savings}%` : "No change"}
        </span>
        <span>{formatBytes(compressed)}</span>
      </div>
      <div className="w-full h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#0A0A0A] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function ImageCompressorPage() {
  const [images,     setImages]     = useState<ImageItem[]>([]);
  const [quality,    setQuality]    = useState(80);
  const [isDragging, setIsDragging] = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [results,    setResults]    = useState<CompressedItem[]>([]);
  const [error,      setError]      = useState("");
  // 🆕 ADDED: progress state for chunked compression feedback
  const [progress,   setProgress]   = useState({ current: 0, total: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  // 🆕 ADDED: limits
  const ALLOWED         = ["image/jpeg", "image/png", "image/webp"];
  const MAX_MB          = 50;
  const MAX_BATCH_MB    = 500;
  const MAX_FILES       = 20;
  const MAX_BYTES       = MAX_MB * 1024 * 1024;
  const MAX_BATCH_BYTES = MAX_BATCH_MB * 1024 * 1024;

  // ── Add files ──
  // 🆕 UPDATED: added per-file, batch, and file count validation
  const addFiles = useCallback(async (incoming: FileList | File[]) => {
    const arr = Array.from(incoming).filter((f) => ALLOWED.includes(f.type));
    if (arr.length === 0) {
      setError("Only JPG, PNG or WebP files are accepted.");
      return;
    }

    const oversized = arr.filter((f) => f.size > MAX_BYTES);
    if (oversized.length > 0) {
      setError(
        `${oversized.map((f) => f.name).join(", ")} exceed${oversized.length === 1 ? "s" : ""} ${MAX_MB}MB and were skipped.`
      );
    } else {
      setError("");
    }

    const valid = arr.filter((f) => f.size <= MAX_BYTES);
    if (valid.length === 0) return;

    const batchSize = valid.reduce((sum, f) => sum + f.size, 0);
    if (batchSize > MAX_BATCH_BYTES) {
      setError(`Total batch size exceeds ${MAX_BATCH_MB}MB. Please upload fewer files at once.`);
      return;
    }

    setResults([]);
    const newItems: ImageItem[] = await Promise.all(
      valid.map(async (file) => {
        const { width, height } = await getDimensions(file);
        return {
          id:         uid(),
          file,
          previewUrl: URL.createObjectURL(file),
          width,
          height,
        };
      })
    );
    // 🆕 UPDATED: cap uses MAX_FILES constant
    setImages((prev) => [...prev, ...newItems].slice(0, MAX_FILES));
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const removeImage = (id: string) => {
    setImages((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
    setResults((prev) => prev.filter((r) => r.id !== id));
  };

  // ── Compress — 100% browser, no API ──
  // 🆕 UPDATED: replaced Promise.all with chunked loop (3 at a time) + progress tracking
  const handleCompress = useCallback(async () => {
    if (images.length === 0) return;
    setLoading(true);
    setError("");
    setResults([]);
    setProgress({ current: 0, total: images.length });

    try {
      const CHUNK_SIZE = 3;
      const compressed: CompressedItem[] = [];

      for (let i = 0; i < images.length; i += CHUNK_SIZE) {
        const chunk = images.slice(i, i + CHUNK_SIZE);
        const chunkResults = await Promise.all(
          chunk.map(async (item) => {
            const options = {
              maxSizeMB:        qualityToMaxSizeMB(quality),
              maxWidthOrHeight: 1920,
              useWebWorker:     true,
              fileType:         item.file.type as "image/jpeg" | "image/png" | "image/webp",
            };
            const compressedFile = await imageCompression(item.file, options);
            return {
              id:             item.id,
              name:           item.file.name,
              originalSize:   item.file.size,
              compressedSize: compressedFile.size,
              blobUrl:        URL.createObjectURL(compressedFile),
            };
          })
        );
        compressed.push(...chunkResults);
        setResults([...compressed]);
        setProgress({ current: Math.min(i + CHUNK_SIZE, images.length), total: images.length });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Compression failed. Please try again.");
    } finally {
      setLoading(false);
      setProgress({ current: 0, total: 0 });
    }
  }, [images, quality]);

  // ── Download all ──
  const downloadAll = () => {
    results.forEach((r) => {
      const ext  = r.name.split(".").pop() ?? "jpg";
      const name = r.name.replace(/\.[^.]+$/, "") + `-compressed.${ext}`;
      const a    = Object.assign(document.createElement("a"), {
        href:     r.blobUrl,
        download: name,
      });
      a.click();
    });
  };

  const totalOriginal   = results.reduce((s, r) => s + r.originalSize,   0);
  const totalCompressed = results.reduce((s, r) => s + r.compressedSize, 0);

  return (
    <ToolPageWrapper
      toolName="Image Compressor"
      description="Compress JPG, PNG and WebP images instantly in your browser. No upload limits, no server — your files never leave your device."
      category="Image"
      isFree={true}
      howItWorks={[
        "Upload one or more JPG, PNG, or WebP images using the upload zone.",
        "Adjust the quality slider — lower means smaller files, higher means better quality.",
        "Click Compress and download your images individually or all at once.",
      ]}
      relatedTools={[
        { name: "PDF Merger",   slug: "pdf-merger",   desc: "Merge multiple PDFs into one file"        },
        { name: "QR Generator", slug: "qr-generator", desc: "Generate QR codes for any URL or text"   },
        { name: "Color Picker", slug: "color-picker",  desc: "Pick colors and convert between formats" },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* ── Upload zone ── */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload images"
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-2",
            "w-full h-32 rounded-[10px] border-2 border-dashed",
            "cursor-pointer select-none transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2",
            isDragging
              ? "border-[#0A0A0A] bg-[#F5F5F5]"
              : "border-[#D0D0D0] hover:border-[#0A0A0A] hover:bg-[#F5F5F5]"
          )}
        >
          <svg className="w-7 h-7 text-[#6B6B6B]" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="7" width="22" height="16" rx="2.5" />
            <circle cx="10" cy="13" r="2" />
            <polyline points="3 21 9 15 13 19 18 14 25 21" />
            <polyline points="18 4 14 8 10 4" />
            <line x1="14" y1="4" x2="14" y2="14" />
          </svg>
          <p className="text-[13px] font-[500] text-[#0A0A0A] m-0 leading-none">
            {isDragging ? "Drop images here" : "Drag & drop or click to upload"}
          </p>
          {/* 🆕 UPDATED: hint text reflects real limits */}
          <p className="text-[11px] text-[#6B6B6B] m-0 leading-none">
            JPG, PNG, WebP — up to {MAX_MB}MB per file · max {MAX_FILES} images
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(e) => e.target.files && addFiles(e.target.files)}
            className="sr-only"
            tabIndex={-1}
          />
        </div>

        {/* ── Image list ── */}
        {images.length > 0 && (
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {images.map((item) => {
              const result = results.find((r) => r.id === item.id);
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5]"
                >
                  <img
                    src={item.previewUrl}
                    alt={`Preview of ${item.file.name}`}
                    className="w-12 h-12 rounded-[6px] object-cover border border-[#E5E5E5] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                    <p className="text-[12px] font-[500] text-[#0A0A0A] m-0 truncate leading-none">
                      {item.file.name}
                    </p>
                    <p className="text-[11px] text-[#6B6B6B] m-0 leading-none">
                      {item.width}×{item.height}px · {formatBytes(item.file.size)}
                    </p>
                    {result && (
                      <SizeBar
                        original={result.originalSize}
                        compressed={result.compressedSize}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {result && (
                      <a
                        href={result.blobUrl}
                        download={
                          item.file.name.replace(/\.[^.]+$/, "") +
                          "-compressed." +
                          (item.file.name.split(".").pop() ?? "jpg")
                        }
                        className={cn(
                          "h-7 px-2.5 rounded-[6px] border border-[#0A0A0A]",
                          "text-[11px] font-[500] text-[#0A0A0A] leading-none",
                          "flex items-center gap-1",
                          "hover:bg-[#F5F5F5] transition-colors duration-100"
                        )}
                      >
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="6" y1="1" x2="6" y2="8" />
                          <polyline points="3 5 6 8 9 5" />
                          <path d="M2 10h8" />
                        </svg>
                        Save
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(item.id)}
                      aria-label={`Remove ${item.file.name}`}
                      className="text-[#9B9B9B] hover:text-[#0A0A0A] transition-colors duration-100"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                        <line x1="2" y1="2" x2="12" y2="12" />
                        <line x1="12" y1="2" x2="2"  y2="12" />
                      </svg>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* ── Quality slider ── */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between leading-none">
            <label htmlFor="quality" className="text-[13px] font-[500] text-[#0A0A0A]">
              Quality
            </label>
            <span className="text-[13px] font-[500] text-[#0A0A0A] tabular-nums">
              {quality}
            </span>
          </div>
          <input
            id="quality"
            type="range"
            min={10}
            max={100}
            step={1}
            value={quality}
            onChange={(e) => { setQuality(Number(e.target.value)); setResults([]); }}
            className="w-full h-1.5 appearance-none rounded-full bg-[#E5E5E5] cursor-pointer accent-[#0A0A0A]"
          />
          <div className="flex justify-between text-[11px] text-[#9B9B9B] leading-none">
            <span>Smaller file</span>
            <span>Better quality</span>
          </div>
        </div>

        {/* ── Compress button ── */}
        <button
          type="button"
          onClick={handleCompress}
          disabled={images.length === 0 || loading}
          className={cn(
            "w-full h-9 rounded-[8px] flex items-center justify-center gap-2",
            "bg-[#0A0A0A] text-white text-[14px] font-[500] leading-none",
            "transition-colors duration-100 hover:bg-[#1a1a1a]",
            "disabled:bg-[#E5E5E5] disabled:text-[#9B9B9B] disabled:cursor-not-allowed",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
          )}
        >
          {/* 🆕 UPDATED: shows X/Y progress during chunked compression */}
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {progress.total > 0
                ? `Compressing ${progress.current}/${progress.total}…`
                : "Compressing…"}
            </>
          ) : (
            `Compress ${images.length > 1 ? `${images.length} images` : "image"}`
          )}
        </button>

        {error && (
          <p className="text-[13px] text-red-500 m-0 leading-snug">{error}</p>
        )}

        {/* ── Bulk summary + download all ── */}
        {results.length > 1 && (
          <div className="flex flex-col gap-3 pt-4 border-t border-[#E5E5E5]">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-[#6B6B6B]">
                Total saved:{" "}
                <span className="font-[500] text-[#0A0A0A]">
                  {formatBytes(totalOriginal - totalCompressed)}
                </span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-[500] border bg-green-50 text-green-700 border-green-200">
                {savingsPct(totalOriginal, totalCompressed)}% smaller overall
              </span>
            </div>
            <button
              type="button"
              onClick={downloadAll}
              className={cn(
                "w-full h-9 rounded-[8px] flex items-center justify-center gap-2",
                "bg-white border border-[#0A0A0A]",
                "text-[14px] font-[500] text-[#0A0A0A] leading-none",
                "transition-colors duration-100 hover:bg-[#F5F5F5]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
              )}
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="8" y1="2" x2="8" y2="11" />
                <polyline points="5 8 8 11 11 8" />
                <path d="M3 13h10" />
              </svg>
              Download all {results.length} images
            </button>
          </div>
        )}

      </div>
    </ToolPageWrapper>
  );
}