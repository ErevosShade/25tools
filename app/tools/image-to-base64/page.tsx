"use client";

import { useState, useCallback, useRef } from "react";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

type OutputFormat = "raw" | "datauri" | "css" | "html";

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

function readAsDataURL(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

const FORMAT_OPTIONS: { id: OutputFormat; label: string }[] = [
  { id: "raw",     label: "Raw Base64"          },
  { id: "datauri", label: "Data URI"             },
  { id: "css",     label: "CSS background-image" },
  { id: "html",    label: "HTML <img> tag"       },
];

export default function ImageToBase64Page() {
  const [file,      setFile]      = useState<File | null>(null);
  const [dataUri,   setDataUri]   = useState("");
  const [format,    setFormat]    = useState<OutputFormat>("datauri");
  const [copied,    setCopied]    = useState(false);
  const [isDragging,setIsDragging]= useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const ALLOWED = ["image/jpeg","image/png","image/webp","image/gif","image/svg+xml"];

  const handleFile = useCallback(async (f: File) => {
    if (!ALLOWED.includes(f.type)) {
      return;
    }
    setFile(f);
    setCopied(false);
    const uri = await readAsDataURL(f);
    setDataUri(uri);
  }, []);

  const getOutput = useCallback((): string => {
    if (!dataUri) return "";
    const base64 = dataUri.split(",")[1] ?? "";
    switch (format) {
      case "raw":     return base64;
      case "datauri": return dataUri;
      case "css":     return `background-image: url(${dataUri});`;
      case "html":    return `<img src="${dataUri}" alt="image" />`;
    }
  }, [dataUri, format]);

  const output = getOutput();
  const base64Size = output ? new TextEncoder().encode(output).length : 0;

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageWrapper
      toolName="Image to Base64"
      description="Convert any image to a Base64 string, data URI, CSS background, or HTML img tag. Runs entirely in your browser."
      category="Developer"
      isFree={true}
      howItWorks={[
        "Upload a JPG, PNG, WebP, GIF or SVG image.",
        "Choose your output format — raw Base64, data URI, CSS or HTML.",
        "Copy the result to your clipboard with one click.",
      ]}
      relatedTools={[
        { name: "Base64 Encoder",  slug: "base64-encoder",  desc: "Encode and decode Base64 strings"      },
        { name: "Image Compressor",slug: "image-compressor",desc: "Compress JPG, PNG and WebP files"       },
        { name: "Color Picker",    slug: "color-picker",    desc: "Pick colors and convert between formats" },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* Upload */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
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
            <polyline points="3 21 9 15 13 19 18 14 25 21" />
          </svg>
          <p className="text-[13px] font-[500] text-[#0A0A0A] m-0 leading-none">
            {isDragging ? "Drop image here" : "Drop image here or click to upload"}
          </p>
          <p className="text-[11px] text-[#6B6B6B] m-0 leading-none">JPG, PNG, WebP, GIF, SVG</p>
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="sr-only" tabIndex={-1} />
        </div>

        {/* Preview + info */}
        {file && dataUri && (
          <div className="flex items-start gap-4 p-4 rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5]">
            <img
              src={dataUri}
              alt={`Preview of uploaded image: ${file.name}`}
              className="w-20 h-20 object-contain rounded-[6px] border border-[#E5E5E5] bg-white shrink-0"
              style={{ maxHeight: "80px" }}
            />
            <div className="flex flex-col gap-1.5 min-w-0">
              <p className="text-[13px] font-[500] text-[#0A0A0A] m-0 truncate">{file.name}</p>
              <p className="text-[11px] text-[#6B6B6B] m-0">Type: {file.type}</p>
              <p className="text-[11px] text-[#6B6B6B] m-0">Original: {formatBytes(file.size)}</p>
              <p className="text-[11px] text-[#6B6B6B] m-0">Base64 size: {formatBytes(base64Size)}</p>
            </div>
            <button type="button" onClick={() => { setFile(null); setDataUri(""); }}
              className="text-[#9B9B9B] hover:text-[#0A0A0A] transition-colors duration-100 shrink-0 ml-auto">
              <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <line x1="2" y1="2" x2="12" y2="12" /><line x1="12" y1="2" x2="2" y2="12" />
              </svg>
            </button>
          </div>
        )}

        {/* Format selector */}
        {dataUri && (
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Output format</label>
            <div className="flex flex-col gap-2">
              {FORMAT_OPTIONS.map(({ id, label }) => (
                <label key={id} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="format" value={id} checked={format === id}
                    onChange={() => setFormat(id)} className="accent-[#0A0A0A] cursor-pointer" />
                  <span className="text-[13px] font-[400] text-[#0A0A0A]">{label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Output */}
        {output && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Output</label>
              <button type="button" onClick={handleCopy}
                className={cn("h-7 px-3 rounded-[6px] border text-[12px] font-[500] leading-none transition-colors duration-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1",
                  copied ? "bg-green-50 border-green-200 text-green-700" : "bg-white border-[#E5E5E5] text-[#0A0A0A] hover:border-[#0A0A0A]")}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea readOnly value={output}
              className="w-full h-40 px-3.5 py-3 rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5] font-mono text-[11px] text-[#0A0A0A] leading-relaxed resize-none outline-none cursor-default overflow-y-auto" />
          </div>
        )}

      </div>
    </ToolPageWrapper>
  );
}