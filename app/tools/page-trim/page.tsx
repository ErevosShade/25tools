"use client";

import { useState, useCallback, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

interface PageThumb {
  pageIndex: number;
  dataUrl:   string;
}

function formatBytes(b: number) {
  if (b < 1024)        return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

export default function PdfCutterPage() {
  const [file,          setFile]          = useState<File | null>(null);
  const [thumbs,        setThumbs]        = useState<PageThumb[]>([]);
  const [selected,      setSelected]      = useState<Set<number>>(new Set());
  const [mode,          setMode]          = useState<"keep" | "delete">("delete");
  const [loading,       setLoading]       = useState(false);
  const [rendering,     setRendering]     = useState(false);
  const [resultUrl,     setResultUrl]     = useState<string | null>(null);
  const [error,         setError]         = useState("");
  const [isDragging,    setIsDragging]    = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileBytes = useRef<ArrayBuffer | null>(null);

  const renderThumbs = useCallback(async (bytes: ArrayBuffer) => {
    setRendering(true);
    setThumbs([]);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      // Use local worker to avoid CDN failures on local network / HTTP origins
      const workerUrl = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      );
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl.toString();
      const pdf    = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
      const result: PageThumb[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page     = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.4 });
        const canvas   = document.createElement("canvas");
        canvas.width   = viewport.width;
        canvas.height  = viewport.height;
        // FIX 1: Assert ctx as non-null to satisfy TypeScript
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctx      = canvas.getContext("2d") as any;
        await page.render({ canvasContext: ctx, viewport } as any).promise;
        result.push({ pageIndex: i - 1, dataUrl: canvas.toDataURL() });
      }
      setThumbs(result);
    } catch {
      setError("Could not render PDF pages. The file may be corrupted.");
    } finally {
      setRendering(false);
    }
  }, []);

  const handleFile = useCallback(async (f: File) => {
    if (f.type !== "application/pdf") {
      setError("Only PDF files are accepted.");
      return;
    }
    setError("");
    setSelected(new Set());
    setResultUrl(null);
    setFile(f);
    const bytes = await f.arrayBuffer();
    fileBytes.current = bytes;
    renderThumbs(bytes);
  }, [renderThumbs]);

  const togglePage = (idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
    setResultUrl(null);
  };

  const handleProcess = useCallback(async () => {
    if (!fileBytes.current || thumbs.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const doc = await PDFDocument.load(fileBytes.current, { ignoreEncryption: true });
      const allIndices = thumbs.map((t) => t.pageIndex);
      const keepIndices = mode === "delete"
        ? allIndices.filter((i) => !selected.has(i))
        : allIndices.filter((i) => selected.has(i));

      if (keepIndices.length === 0) {
        setError("No pages would remain after this operation.");
        setLoading(false);
        return;
      }

      const out   = await PDFDocument.create();
      const pages = await out.copyPages(doc, keepIndices);
      pages.forEach((p) => out.addPage(p));
      const bytes = await out.save();
      // FIX 2: Cast Uint8Array to a type Blob accepts
      setResultUrl(URL.createObjectURL(new Blob([bytes as BlobPart], { type: "application/pdf" })));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Processing failed.");
    } finally {
      setLoading(false);
    }
  }, [fileBytes, thumbs, mode, selected]);

  const pagesKept = mode === "delete"
    ? thumbs.length - selected.size
    : selected.size;

  return (
    <ToolPageWrapper
      toolName="PageTrim - PDF Cutter Tool"
      description="Upload a PDF, visually select pages to remove or keep, and download the result. Runs entirely in your browser."
      category="PDF"
      isFree={true}
      howItWorks={[
        "Upload a PDF — all pages render as visual thumbnails.",
        "Select the pages you want to remove (or keep) by clicking them.",
        "Click Download PDF to get your edited file instantly.",
      ]}
      relatedTools={[
        { name: "PDF Merger",    slug: "pdf-merger",    desc: "Merge multiple PDFs into one file"            },
        { name: "Images to PDF", slug: "images-to-pdf", desc: "Convert multiple images into a single PDF"    },
        { name: "Word to PDF",   slug: "word-to-pdf",   desc: "Convert DOCX Word documents to PDF in browser"},
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* Upload */}
        {!file && (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            onClick={() => inputRef.current?.click()}
            role="button" tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            className={cn(
              "flex flex-col items-center justify-center gap-2 w-full h-36 rounded-[10px] border-2 border-dashed",
              "cursor-pointer select-none transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2",
              isDragging ? "border-[#0A0A0A] bg-[#F5F5F5]" : "border-[#D0D0D0] hover:border-[#0A0A0A] hover:bg-[#F5F5F5]"
            )}
          >
            <svg className="w-7 h-7 text-[#6B6B6B]" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 3h11l7 7v15a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" />
              <polyline points="16 3 16 10 23 10" />
            </svg>
            <p className="text-[13px] font-[500] text-[#0A0A0A] m-0 leading-none">Drop PDF here or click to upload</p>
            <p className="text-[11px] text-[#6B6B6B] m-0 leading-none">PDF only — no size limit</p>
            <input ref={inputRef} type="file" accept="application/pdf"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="sr-only" tabIndex={-1} />
          </div>
        )}

        {/* File info + controls */}
        {file && (
          <div className="flex items-center justify-between gap-3 p-3 rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5]">
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[13px] font-[500] text-[#0A0A0A] m-0 truncate">{file.name}</p>
              <p className="text-[11px] text-[#6B6B6B] m-0">{formatBytes(file.size)} · {thumbs.length} pages</p>
            </div>
            <button type="button" onClick={() => { setFile(null); setThumbs([]); setSelected(new Set()); setResultUrl(null); fileBytes.current = null; }}
              className="text-[12px] text-[#6B6B6B] hover:text-[#0A0A0A] underline underline-offset-2 hover:no-underline transition-colors duration-100 shrink-0">
              Change file
            </button>
          </div>
        )}

        {/* Mode toggle */}
        {thumbs.length > 0 && (
          <div className="flex gap-1 p-1 bg-[#F5F5F5] rounded-[8px] w-fit">
            {(["delete","keep"] as const).map((m) => (
              <button key={m} type="button" onClick={() => { setMode(m); setSelected(new Set()); setResultUrl(null); }}
                className={cn(
                  "px-4 h-7 rounded-[6px] text-[13px] font-[500] leading-none capitalize transition-colors duration-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1",
                  mode === m ? "bg-white text-[#0A0A0A] shadow-sm" : "text-[#6B6B6B] hover:text-[#0A0A0A]"
                )}>
                {m === "delete" ? "Select pages to delete" : "Select pages to keep"}
              </button>
            ))}
          </div>
        )}

        {/* Status */}
        {thumbs.length > 0 && (
          <p className="text-[12px] text-[#6B6B6B] m-0">
            {thumbs.length} pages — <span className="text-[#0A0A0A] font-[500]">{selected.size} selected</span>
            {selected.size > 0 && ` — ${pagesKept} page${pagesKept !== 1 ? "s" : ""} will remain`}
          </p>
        )}

        {/* Rendering state */}
        {rendering && (
          <div className="flex items-center gap-3 py-8 justify-center">
            <svg className="w-5 h-5 animate-spin text-[#6B6B6B]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-[13px] text-[#6B6B6B] m-0">Rendering page thumbnails…</p>
          </div>
        )}

        {/* Thumbnail grid */}
        {thumbs.length > 0 && !rendering && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {thumbs.map((thumb) => {
              const isSelected = selected.has(thumb.pageIndex);
              const willDelete = mode === "delete" && isSelected;
              return (
                <button
                  key={thumb.pageIndex}
                  type="button"
                  onClick={() => togglePage(thumb.pageIndex)}
                  className={cn(
                    "relative flex flex-col items-center gap-1.5 p-1.5 rounded-[8px] border-2 transition-all duration-100",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1",
                    willDelete
                      ? "border-red-400 bg-red-50"
                      : mode === "keep" && isSelected
                      ? "border-[#0A0A0A] bg-[#F5F5F5]"
                      : "border-[#E5E5E5] hover:border-[#D0D0D0]"
                  )}
                >
                  <div className="relative w-full">
                    <img
                      src={thumb.dataUrl}
                      alt={`Page ${thumb.pageIndex + 1}`}
                      className="w-full rounded-[4px] border border-[#E5E5E5]"
                    />
                    {willDelete && (
                      <div className="absolute inset-0 bg-red-500/20 rounded-[4px] flex items-center justify-center">
                        <span className="text-red-600 font-[700] text-lg">✕</span>
                      </div>
                    )}
                    {mode === "keep" && isSelected && (
                      <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-[#0A0A0A] flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="2 5 4 7 8 3" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] font-[400] text-[#6B6B6B] leading-none">
                    Page {thumb.pageIndex + 1}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Process button */}
        {thumbs.length > 0 && !rendering && (
          <button
            type="button"
            onClick={handleProcess}
            disabled={selected.size === 0 || loading}
            className={cn(
              "w-full h-9 rounded-[8px] flex items-center justify-center gap-2",
              "bg-[#0A0A0A] text-white text-[14px] font-[500] leading-none",
              "transition-colors duration-100 hover:bg-[#1a1a1a]",
              "disabled:bg-[#E5E5E5] disabled:text-[#9B9B9B] disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
            )}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing…
              </>
            ) : (
              `Download PDF (${pagesKept} page${pagesKept !== 1 ? "s" : ""})`
            )}
          </button>
        )}

        {error && <p className="text-[13px] text-red-500 m-0">{error}</p>}

        {resultUrl && (
          <a
            href={resultUrl}
            download={file?.name.replace(".pdf", "-edited.pdf") ?? "edited.pdf"}
            className={cn(
              "w-full h-9 rounded-[8px] flex items-center justify-center gap-2",
              "bg-white border border-[#0A0A0A] text-[14px] font-[500] text-[#0A0A0A] leading-none",
              "transition-colors duration-100 hover:bg-[#F5F5F5]"
            )}
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="8" y1="2" x2="8" y2="11" /><polyline points="5 8 8 11 11 8" /><path d="M3 13h10" />
            </svg>
            Download edited PDF
          </a>
        )}

      </div>
    </ToolPageWrapper>
  );
}