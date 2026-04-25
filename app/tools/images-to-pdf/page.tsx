"use client";

import { useState, useCallback, useRef } from "react";
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor,
  useSensor, useSensors, DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, sortableKeyboardCoordinates, useSortable,
  verticalListSortingStrategy, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

interface ImageItem { id: string; file: File; previewUrl: string; }
type PageSize   = "a4" | "letter" | "a3";
type Orientation = "portrait" | "landscape";

function uid() { return Math.random().toString(36).slice(2, 9); }
function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

function DragHandle() {
  return (
    <svg className="w-4 h-4 text-[#9B9B9B] cursor-grab active:cursor-grabbing shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <circle cx="5.5" cy="4" r="1.2" /><circle cx="5.5" cy="8" r="1.2" /><circle cx="5.5" cy="12" r="1.2" />
      <circle cx="10.5" cy="4" r="1.2" /><circle cx="10.5" cy="8" r="1.2" /><circle cx="10.5" cy="12" r="1.2" />
    </svg>
  );
}

function SortableRow({ item, onRemove }: { item: ImageItem; onRemove: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  return (
    <li ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn("flex items-center gap-3 p-2 rounded-[8px] border border-[#E5E5E5] bg-white", isDragging && "shadow-lg border-[#0A0A0A] opacity-90")}>
      <div {...attributes} {...listeners} className="touch-none"><DragHandle /></div>
      <img src={item.previewUrl} alt={`Preview of ${item.file.name}`} className="w-12 h-12 rounded-[4px] object-cover border border-[#E5E5E5] shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-[500] text-[#0A0A0A] m-0 truncate">{item.file.name}</p>
        <p className="text-[11px] text-[#6B6B6B] m-0">{formatBytes(item.file.size)}</p>
      </div>
      <button type="button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.file.name}`}
        className="text-[#9B9B9B] hover:text-[#0A0A0A] transition-colors duration-100 shrink-0">
        <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <line x1="2" y1="2" x2="12" y2="12" /><line x1="12" y1="2" x2="2" y2="12" />
        </svg>
      </button>
    </li>
  );
}

export default function ImagesToPdfPage() {
  const [images,      setImages]      = useState<ImageItem[]>([]);
  const [isDragging,  setIsDragging]  = useState(false);
  const [pageSize,    setPageSize]    = useState<PageSize>("a4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [margin,      setMargin]      = useState(10);
  const [loading,     setLoading]     = useState(false);
  const [resultUrl,   setResultUrl]   = useState<string | null>(null);
  const [error,       setError]       = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const ALLOWED = ["image/jpeg","image/png","image/webp"];

  const addFiles = useCallback((files: FileList | File[]) => {
    const valid = Array.from(files).filter((f) => ALLOWED.includes(f.type));
    if (valid.length === 0) { setError("Only JPG, PNG or WebP images are accepted."); return; }
    setError(""); setResultUrl(null);
    setImages((prev) => [...prev, ...valid.map((f) => ({ id: uid(), file: f, previewUrl: URL.createObjectURL(f) }))]);
  }, []);

  const handleDragEnd = useCallback((e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setImages((items) => arrayMove(items, items.findIndex((i) => i.id === active.id), items.findIndex((i) => i.id === over.id)));
    }
  }, []);

  const handleCreate = useCallback(async () => {
    if (images.length === 0) return;
    setLoading(true); setError(""); setResultUrl(null);
    try {
      const { jsPDF } = await import("jspdf");
      const pageSizes: Record<PageSize, [number, number]> = { a4: [210, 297], letter: [215.9, 279.4], a3: [297, 420] };
      const [pw, ph] = pageSizes[pageSize];
      const [w, h]   = orientation === "landscape" ? [ph, pw] : [pw, ph];
      const doc      = new jsPDF({ orientation, unit: "mm", format: pageSize.toUpperCase() as "A4" | "A3" });

      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage();
        const imgData = await new Promise<string>((res, rej) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result as string);
          reader.onerror = rej;
          reader.readAsDataURL(images[i].file);
        });
        const m  = margin;
        const iw = w - m * 2;
        const ih = h - m * 2;
        // Maintain aspect ratio
        const img   = new window.Image();
        img.src     = imgData;
        await new Promise((res) => { img.onload = res; });
        const ratio = Math.min(iw / img.naturalWidth, ih / img.naturalHeight);
        const rw    = img.naturalWidth  * ratio;
        const rh    = img.naturalHeight * ratio;
        const x     = m + (iw - rw) / 2;
        const y     = m + (ih - rh) / 2;
        const fmt   = images[i].file.type === "image/png" ? "PNG" : "JPEG";
        doc.addImage(imgData, fmt, x, y, rw, rh);
      }

      const blob = doc.output("blob");
      setResultUrl(URL.createObjectURL(blob));
    } catch (e) {
      setError(e instanceof Error ? e.message : "PDF creation failed.");
    } finally {
      setLoading(false);
    }
  }, [images, pageSize, orientation, margin]);

  return (
    <ToolPageWrapper
      toolName="Images to PDF"
      description="Convert multiple images into a single PDF. Drag to reorder, choose page size and margins, then download instantly."
      category="PDF"
      isFree={true}
      howItWorks={[
        "Upload one or more JPG, PNG or WebP images.",
        "Drag to reorder them — each image becomes one page.",
        "Choose page size and margins, then click Create PDF.",
      ]}
      relatedTools={[
        { name: "PDF Merger",      slug: "pdf-merger",      desc: "Merge multiple PDFs into one file"         },
        { name: "PDF Page Cutter", slug: "pdf-cutter",      desc: "Remove specific pages from a PDF visually" },
        { name: "Image Compressor",slug: "image-compressor",desc: "Compress JPG, PNG and WebP files"          },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* Upload */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          role="button" tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-2 w-full h-32 rounded-[10px] border-2 border-dashed cursor-pointer select-none transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2",
            isDragging ? "border-[#0A0A0A] bg-[#F5F5F5]" : "border-[#D0D0D0] hover:border-[#0A0A0A] hover:bg-[#F5F5F5]"
          )}
        >
          <svg className="w-7 h-7 text-[#6B6B6B]" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="7" width="22" height="16" rx="2.5" /><circle cx="10" cy="13" r="2" />
            <polyline points="3 21 9 15 13 19 18 14 25 21" /><polyline points="18 4 14 8 10 4" />
            <line x1="14" y1="4" x2="14" y2="14" />
          </svg>
          <p className="text-[13px] font-[500] text-[#0A0A0A] m-0 leading-none">
            {isDragging ? "Drop images here" : "Drop images here or click — each becomes one page"}
          </p>
          <p className="text-[11px] text-[#6B6B6B] m-0 leading-none">JPG, PNG, WebP — no limit</p>
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple
            onChange={(e) => e.target.files && addFiles(e.target.files)} className="sr-only" tabIndex={-1} />
        </div>

        {/* File list */}
        {images.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-[500] text-[#6B6B6B] uppercase tracking-[0.07em] leading-none m-0">
              {images.length} image{images.length !== 1 ? "s" : ""} — will create a {images.length}-page PDF
            </p>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={images.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {images.map((item) => (
                    <SortableRow key={item.id} item={item} onRemove={(id) => { setImages((p) => p.filter((i) => i.id !== id)); setResultUrl(null); }} />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5]">
          {/* Page size */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[500] text-[#0A0A0A] leading-none uppercase tracking-[0.05em]">Page size</label>
            <div className="flex gap-1">
              {(["a4","letter","a3"] as PageSize[]).map((s) => (
                <button key={s} type="button" onClick={() => setPageSize(s)}
                  className={cn("flex-1 h-7 rounded-[6px] border text-[11px] font-[500] uppercase leading-none transition-colors duration-100",
                    pageSize === s ? "bg-[#0A0A0A] text-white border-[#0A0A0A]" : "bg-white text-[#6B6B6B] border-[#E5E5E5] hover:border-[#0A0A0A]")}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          {/* Orientation */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[500] text-[#0A0A0A] leading-none uppercase tracking-[0.05em]">Orientation</label>
            <div className="flex gap-1">
              {(["portrait","landscape"] as Orientation[]).map((o) => (
                <button key={o} type="button" onClick={() => setOrientation(o)}
                  className={cn("flex-1 h-7 rounded-[6px] border text-[11px] font-[500] capitalize leading-none transition-colors duration-100",
                    orientation === o ? "bg-[#0A0A0A] text-white border-[#0A0A0A]" : "bg-white text-[#6B6B6B] border-[#E5E5E5] hover:border-[#0A0A0A]")}>
                  {o}
                </button>
              ))}
            </div>
          </div>
          {/* Margin */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-[12px] font-[500] text-[#0A0A0A] leading-none uppercase tracking-[0.05em]">Margin</label>
              <span className="text-[12px] text-[#6B6B6B] tabular-nums">{margin}mm</span>
            </div>
            <input type="range" min={0} max={40} step={1} value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full h-1.5 appearance-none rounded-full bg-[#E5E5E5] cursor-pointer accent-[#0A0A0A]" />
          </div>
        </div>

        {/* Create */}
        <button type="button" onClick={handleCreate} disabled={images.length === 0 || loading}
          className={cn(
            "w-full h-9 rounded-[8px] flex items-center justify-center gap-2",
            "bg-[#0A0A0A] text-white text-[14px] font-[500] leading-none",
            "transition-colors duration-100 hover:bg-[#1a1a1a]",
            "disabled:bg-[#E5E5E5] disabled:text-[#9B9B9B] disabled:cursor-not-allowed",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
          )}>
          {loading ? (
            <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Creating PDF…</>
          ) : `Create PDF from ${images.length} image${images.length !== 1 ? "s" : ""}`}
        </button>

        {error && <p className="text-[13px] text-red-500 m-0">{error}</p>}

        {resultUrl && (
          <a href={resultUrl} download="images-to-pdf-devkit25.pdf"
            className={cn("w-full h-9 rounded-[8px] flex items-center justify-center gap-2",
              "bg-white border border-[#0A0A0A] text-[14px] font-[500] text-[#0A0A0A] leading-none",
              "transition-colors duration-100 hover:bg-[#F5F5F5]")}>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="8" y1="2" x2="8" y2="11" /><polyline points="5 8 8 11 11 8" /><path d="M3 13h10" />
            </svg>
            Download PDF
          </a>
        )}

      </div>
    </ToolPageWrapper>
  );
}