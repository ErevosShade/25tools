"use client";

import { useState, useCallback, useRef } from "react";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

export default function WordToPdfPage() {
  const [file,       setFile]       = useState<File | null>(null);
  const [preview,    setPreview]    = useState("");
  const [loading,    setLoading]    = useState(false);
  const [resultUrl,  setResultUrl]  = useState<string | null>(null);
  const [error,      setError]      = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (f: File) => {
    if (!f.name.endsWith(".docx")) {
      setError("Only .docx files are supported.");
      return;
    }
    setError(""); setResultUrl(""); setPreview("");
    setFile(f);
    setLoading(true);
    try {
      const mammoth  = await import("mammoth");
      const arrayBuffer = await f.arrayBuffer();
      const result   = await mammoth.convertToHtml({ arrayBuffer });
      setPreview(result.value);
    } catch (e) {
      setError("Could not read the document. Make sure it is a valid .docx file.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleConvert = useCallback(async () => {
    if (!preview || !file) return;
    setLoading(true); setError(""); setResultUrl(null);
    try {
      const { jsPDF } = await import("jspdf");
      const doc       = new jsPDF({ unit: "pt", format: "a4" });
      const el        = document.createElement("div");
      el.innerHTML    = preview;
      el.style.cssText = "font-family:sans-serif;font-size:12pt;line-height:1.6;color:#000;padding:20px;width:550px;";
      document.body.appendChild(el);
      await new Promise<void>((resolve) => {
        doc.html(el, {
          callback: (d) => {
            document.body.removeChild(el);
            const blob = d.output("blob");
            setResultUrl(URL.createObjectURL(blob));
            resolve();
          },
          x: 40, y: 40,
          width: 515,
          windowWidth: 550,
        });
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed.");
    } finally {
      setLoading(false);
    }
  }, [preview, file]);

  return (
    <ToolPageWrapper
      toolName="Word to PDF"
      description="Convert Word .docx documents to PDF entirely in your browser. No server, no upload, no file size limit."
      category="PDF"
      isFree={true}
      howItWorks={[
        "Upload a .docx Word document using the upload zone.",
        "Preview the extracted content in the browser.",
        "Click Convert to PDF and download the result instantly.",
      ]}
      relatedTools={[
        { name: "PDF Merger",    slug: "pdf-merger",    desc: "Merge multiple PDFs into one file"         },
        { name: "PDF Page Cutter",slug: "pdf-cutter",   desc: "Remove specific pages from a PDF visually" },
        { name: "Images to PDF", slug: "images-to-pdf", desc: "Convert multiple images into a single PDF" },
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
              "flex flex-col items-center justify-center gap-2 w-full h-36 rounded-[10px] border-2 border-dashed cursor-pointer select-none transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2",
              isDragging ? "border-[#0A0A0A] bg-[#F5F5F5]" : "border-[#D0D0D0] hover:border-[#0A0A0A] hover:bg-[#F5F5F5]"
            )}
          >
            <svg className="w-8 h-8 text-[#6B6B6B]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 4h14l8 8v16a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
              <polyline points="20 4 20 12 28 12" />
            </svg>
            <p className="text-[13px] font-[500] text-[#0A0A0A] m-0 leading-none">
              {isDragging ? "Drop .docx here" : "Drop your Word document here or click to upload"}
            </p>
            <p className="text-[11px] text-[#6B6B6B] m-0 leading-none">.docx only — no file size limit</p>
            <input ref={inputRef} type="file" accept=".docx"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="sr-only" tabIndex={-1} />
          </div>
        )}

        {/* File info */}
        {file && (
          <div className="flex items-center justify-between gap-3 p-3 rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5]">
            <div className="min-w-0">
              <p className="text-[13px] font-[500] text-[#0A0A0A] m-0 truncate">{file.name}</p>
              <p className="text-[11px] text-[#6B6B6B] m-0">{formatBytes(file.size)}</p>
            </div>
            <button type="button" onClick={() => { setFile(null); setPreview(""); setResultUrl(null); setError(""); }}
              className="text-[12px] text-[#6B6B6B] hover:text-[#0A0A0A] underline underline-offset-2 hover:no-underline transition-colors duration-100 shrink-0">
              Change file
            </button>
          </div>
        )}

        {/* Warning */}
        {file && (
          <div className="px-4 py-3 rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5]">
            <p className="text-[12px] text-[#6B6B6B] m-0 leading-snug">
              ⚠️ Complex formatting like tables and images may not convert perfectly — this tool works best with text-heavy documents.
            </p>
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Document preview</label>
            <div
              className="max-h-64 overflow-y-auto p-4 rounded-[8px] border border-[#E5E5E5] bg-white text-[13px] text-[#0A0A0A] leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          </div>
        )}

        {/* Convert button */}
        {preview && !resultUrl && (
          <button type="button" onClick={handleConvert} disabled={loading}
            className={cn(
              "w-full h-9 rounded-[8px] flex items-center justify-center gap-2",
              "bg-[#0A0A0A] text-white text-[14px] font-[500] leading-none",
              "transition-colors duration-100 hover:bg-[#1a1a1a]",
              "disabled:bg-[#E5E5E5] disabled:text-[#9B9B9B] disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
            )}>
            {loading ? (
              <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Converting…</>
            ) : "Convert to PDF"}
          </button>
        )}

        {error && <p className="text-[13px] text-red-500 m-0">{error}</p>}

        {resultUrl && (
          <div className="flex flex-col gap-3 pt-4 border-t border-[#E5E5E5]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
              <p className="text-[13px] font-[500] text-[#0A0A0A] m-0">Conversion complete</p>
            </div>
            <a href={resultUrl} download={file?.name.replace(".docx",".pdf") ?? "document.pdf"}
              className={cn("w-full h-9 rounded-[8px] flex items-center justify-center gap-2",
                "bg-white border border-[#0A0A0A] text-[14px] font-[500] text-[#0A0A0A] leading-none",
                "transition-colors duration-100 hover:bg-[#F5F5F5]")}>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="8" y1="2" x2="8" y2="11" /><polyline points="5 8 8 11 11 8" /><path d="M3 13h10" />
              </svg>
              Download PDF
            </a>
          </div>
        )}

      </div>
    </ToolPageWrapper>
  );
}