"use client";

import { useState, useCallback, useRef } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { KeyboardSensor } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────
interface PdfFile {
  id:    string;
  file:  File;
}

// ─── Helpers ──────────────────────────────────────────────────
function formatBytes(bytes: number): string {
  if (bytes < 1024)        return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Drag handle icon ─────────────────────────────────────────
function DragHandle() {
  return (
    <svg
      className="w-4 h-4 text-[#9B9B9B] shrink-0 cursor-grab active:cursor-grabbing"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="5.5" cy="4"  r="1.2" />
      <circle cx="5.5" cy="8"  r="1.2" />
      <circle cx="5.5" cy="12" r="1.2" />
      <circle cx="10.5" cy="4"  r="1.2" />
      <circle cx="10.5" cy="8"  r="1.2" />
      <circle cx="10.5" cy="12" r="1.2" />
    </svg>
  );
}

// ─── PDF icon ─────────────────────────────────────────────────
function PdfIcon() {
  return (
    <svg
      className="w-8 h-8 shrink-0"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 4h13l7 7v17a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1z" />
      <polyline points="19 4 19 11 26 11" />
      <line x1="10" y1="17" x2="22" y2="17" />
      <line x1="10" y1="21" x2="18" y2="21" />
    </svg>
  );
}

// ─── Sortable file row ────────────────────────────────────────
function SortableFileRow({
  item,
  index,
  total,
  onRemove,
}: {
  item:     PdfFile;
  index:    number;
  total:    number;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform:  CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5",
        "bg-white border border-[#E5E5E5] rounded-[8px]",
        "transition-shadow duration-150",
        isDragging && "shadow-lg border-[#0A0A0A] z-50 opacity-90"
      )}
    >
      {/* Drag handle */}
      <div {...attributes} {...listeners} className="touch-none">
        <DragHandle />
      </div>

      {/* Index badge */}
      <span className="w-5 h-5 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center shrink-0">
        <span className="text-[10px] font-[500] text-[#6B6B6B] leading-none tabular-nums">
          {index + 1}
        </span>
      </span>

      {/* File info */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <p className="text-[13px] font-[500] text-[#0A0A0A] leading-snug m-0 truncate">
          {item.file.name}
        </p>
        <p className="text-[11px] font-[400] text-[#6B6B6B] leading-none m-0">
          {formatBytes(item.file.size)}
        </p>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.file.name}`}
        className="text-[#9B9B9B] hover:text-[#0A0A0A] transition-colors duration-100 shrink-0 focus-visible:outline-none"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <line x1="2" y1="2" x2="12" y2="12" />
          <line x1="12" y1="2" x2="2"  y2="12" />
        </svg>
      </button>
    </li>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function PdfMergerPage() {
  const [files,       setFiles]       = useState<PdfFile[]>([]);
  const [isDragging,  setIsDragging]  = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [resultUrl,   setResultUrl]   = useState<string | null>(null);
  const [error,       setError]       = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // ── Add files ──
  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr   = Array.from(incoming);
    const valid = arr.filter((f) => f.type === "application/pdf");
    const over  = arr.filter((f) => f.size > 5 * 1024 * 1024);

    if (over.length > 0) {
      setError(`Some files exceed 5MB: ${over.map((f) => f.name).join(", ")}`);
      return;
    }
    if (valid.length < arr.length) {
      setError("Only PDF files are accepted.");
      return;
    }

    setError("");
    setResultUrl(null);
    setFiles((prev) => [
      ...prev,
      ...valid.map((file) => ({ id: uid(), file })),
    ]);
  }, []);

  // ── Drop zone handlers ──
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  // ── Reorder ──
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  // ── Remove ──
  const handleRemove = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setResultUrl(null);
    setError("");
  }, []);

  // ── Merge ──
  const handleMerge = useCallback(async () => {
    if (files.length < 2) {
      setError("Upload at least 2 PDF files.");
      return;
    }

    setLoading(true);
    setError("");
    setResultUrl(null);

    try {
      const fd = new FormData();
      files.forEach(({ file }) => fd.append("files[]", file));

      const res = await fetch("/api/tools/merge-pdf", {
        method: "POST",
        body:   fd,
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Merge failed. Please try again.");
      }

      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Merge failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [files]);

  // ── Download ──
  const handleDownload = useCallback(() => {
    if (!resultUrl) return;
    const a    = document.createElement("a");
    a.href     = resultUrl;
    a.download = "merged.pdf";
    a.click();
  }, [resultUrl]);

  // ── Reset ──
  const handleReset = useCallback(() => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFiles([]);
    setResultUrl(null);
    setError("");
  }, [resultUrl]);

  return (
    <ToolPageWrapper
      toolName="PDF Merger"
      description="Merge multiple PDF files into one in seconds. Files are processed in your browser session and never stored."
      category="PDF"
      isFree={true}
      howItWorks={[
        "Upload two or more PDF files using the upload zone.",
        "Drag rows to reorder the pages as needed.",
        "Click Merge PDFs to combine them into one file.",
        "Download the merged PDF instantly.",
      ]}
      relatedTools={[
        { name: "Image Compressor", slug: "image-compressor", desc: "Compress JPG, PNG and WebP files"        },
        { name: "QR Generator",     slug: "qr-generator",     desc: "Generate QR codes for any URL or text"  },
        { name: "Word Counter",     slug: "word-counter",     desc: "Count words, characters and reading time"},
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* ── Upload zone ── */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true);  }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload PDF files"
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-3",
            "w-full h-36 rounded-[10px]",
            "border-2 border-dashed",
            "cursor-pointer select-none",
            "transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2",
            isDragging
              ? "border-[#0A0A0A] bg-[#F5F5F5]"
              : "border-[#D0D0D0] hover:border-[#0A0A0A] hover:bg-[#F5F5F5]"
          )}
        >
          <div className="text-[#6B6B6B]">
            <PdfIcon />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-[14px] font-[500] text-[#0A0A0A] m-0 leading-none">
              {isDragging ? "Drop PDFs here" : "Drag & drop or click to upload"}
            </p>
            <p className="text-[12px] font-[400] text-[#6B6B6B] m-0 leading-none">
              PDF only — max 5MB each
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            multiple
            onChange={(e) => e.target.files && addFiles(e.target.files)}
            className="sr-only"
            tabIndex={-1}
          />
        </div>

        {/* ── File list ── */}
        {files.length > 0 && (
          <div className="flex flex-col gap-2">

            {/* List header */}
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-[500] text-[#6B6B6B] uppercase tracking-[0.07em] leading-none m-0">
                {files.length} file{files.length !== 1 ? "s" : ""} · drag to reorder
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="text-[12px] font-[400] text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-100 leading-none underline underline-offset-2 hover:no-underline"
              >
                Clear all
              </button>
            </div>

            {/* Sortable list */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={files.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {files.map((item, index) => (
                    <SortableFileRow
                      key={item.id}
                      item={item}
                      index={index}
                      total={files.length}
                      onRemove={handleRemove}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>

            {/* Add more */}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className={cn(
                "w-full h-9 rounded-[8px]",
                "border border-dashed border-[#D0D0D0]",
                "text-[13px] font-[400] text-[#6B6B6B]",
                "hover:border-[#0A0A0A] hover:text-[#0A0A0A]",
                "transition-colors duration-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
              )}
            >
              + Add more files
            </button>
          </div>
        )}

        {/* ── Merge button ── */}
        <button
          type="button"
          onClick={handleMerge}
          disabled={files.length < 2 || loading}
          className={cn(
            "w-full h-9 rounded-[8px]",
            "bg-[#0A0A0A] text-white",
            "text-[14px] font-[500] leading-none",
            "transition-colors duration-100 hover:bg-[#1a1a1a]",
            "disabled:bg-[#E5E5E5] disabled:text-[#9B9B9B] disabled:cursor-not-allowed",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2",
            "flex items-center justify-center gap-2"
          )}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Merging…
            </>
          ) : (
            `Merge ${files.length >= 2 ? `${files.length} PDFs` : "PDFs"}`
          )}
        </button>

        {/* ── Error ── */}
        {error && (
          <p className="text-[13px] font-[400] text-red-500 leading-snug m-0 max-w-none">
            {error}
          </p>
        )}

        {/* ── Result ── */}
        {resultUrl && (
          <div className="flex flex-col gap-3 pt-4 border-t border-[#E5E5E5]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
              <p className="text-[13px] font-[500] text-[#0A0A0A] leading-none m-0">
                {files.length} PDFs merged successfully
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className={cn(
                "w-full h-9 rounded-[8px]",
                "bg-white border border-[#0A0A0A]",
                "text-[14px] font-[500] text-[#0A0A0A] leading-none",
                "transition-colors duration-100 hover:bg-[#F5F5F5]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2",
                "flex items-center justify-center gap-2"
              )}
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="8"  y1="2" x2="8"  y2="11" />
                <polyline points="5 8 8 11 11 8" />
                <path d="M3 13h10" />
              </svg>
              Download merged.pdf
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="text-[12px] font-[400] text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-100 leading-none underline underline-offset-2 hover:no-underline w-fit mx-auto"
            >
              Start over
            </button>
          </div>
        )}

      </div>
    </ToolPageWrapper>
  );
}