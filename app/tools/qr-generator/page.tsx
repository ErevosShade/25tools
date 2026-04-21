"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

const SIZES = [128, 256, 512] as const;
type QRSize = typeof SIZES[number];

export default function QrGeneratorPage() {
  const [text,     setText]     = useState("");
  const [size,     setSize]     = useState<QRSize>(256);
  const [dataUrl,  setDataUrl]  = useState("");
  const [error,    setError]    = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!text.trim()) { setDataUrl(""); setError(""); return; }
    if (!canvasRef.current) return; // ✅ FIX
    QRCode.toCanvas(
      canvasRef.current!,
      text,
      { width: size, margin: 2, color: { dark: "#0A0A0A", light: "#FFFFFF" } },
      (err) => {
        if (err) { setError("Failed to generate QR code."); setDataUrl(""); return; }
        setError("");
        setDataUrl(canvasRef.current!.toDataURL("image/png"));
      }
    );
  }, [text, size]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a    = document.createElement("a");
    a.href     = dataUrl;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <ToolPageWrapper
      toolName="QR Generator"
      description="Generate a QR code for any URL or text. Choose your size and download as PNG instantly."
      category="Converter"
      isFree={true}
      howItWorks={[
        "Enter any URL or text in the input field.",
        "The QR code generates instantly — pick a size that fits your needs.",
        "Download the QR code as a PNG file with one click.",
      ]}
      relatedTools={[
        { name: "URL Encoder",     slug: "url-encoder",     desc: "Encode and decode URLs safely"         },
        { name: "Image Compressor",slug: "image-compressor",desc: "Compress JPG, PNG and WebP files"      },
        { name: "Base64 Encoder",  slug: "base64-encoder",  desc: "Encode and decode Base64 strings"      },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">
            URL or text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com"
            className={cn(
              "w-full h-9 px-3.5 rounded-[8px] border border-[#E5E5E5]",
              "bg-[#F5F5F5] text-[14px] text-[#0A0A0A]",
              "placeholder:text-[#9B9B9B] outline-none",
              "focus:bg-white focus:border-[#0A0A0A] transition-colors duration-100"
            )}
          />
        </div>

        {/* Size selector */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Size</label>
          <div className="flex gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "h-8 px-4 rounded-[8px] border text-[13px] font-[500] leading-none transition-colors duration-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1",
                  size === s
                    ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                    : "bg-white text-[#6B6B6B] border-[#E5E5E5] hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
                )}
              >
                {s}px
              </button>
            ))}
          </div>
        </div>

        {/* Canvas (hidden, used for generation) */}
        <canvas ref={canvasRef} className="sr-only" />

        {/* Preview + download */}
        {error && <p className="text-[13px] text-red-500 m-0">{error}</p>}

        {dataUrl && !error && (
          <div className="flex flex-col items-center gap-4 pt-2 border-t border-[#E5E5E5]">
            <div className="p-4 rounded-[10px] border border-[#E5E5E5] bg-white inline-flex">
              <img
                src={dataUrl}
                alt={`QR code for: ${text}`}
                width={Math.min(size, 256)}
                height={Math.min(size, 256)}
                className="block"
              />
            </div>
            <button
              type="button"
              onClick={handleDownload}
              className={cn(
                "h-9 px-6 rounded-[8px]",
                "bg-white border border-[#0A0A0A]",
                "text-[14px] font-[500] text-[#0A0A0A] leading-none",
                "transition-colors duration-100 hover:bg-[#F5F5F5]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2",
                "flex items-center gap-2"
              )}
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="2" x2="8" y2="11" />
                <polyline points="5 8 8 11 11 8" />
                <path d="M3 13h10" />
              </svg>
              Download PNG ({size}×{size})
            </button>
          </div>
        )}

        {!text && (
          <div className="flex items-center justify-center h-32 rounded-[8px] border border-dashed border-[#E5E5E5]">
            <p className="text-[13px] text-[#9B9B9B] m-0">QR preview will appear here</p>
          </div>
        )}

      </div>
    </ToolPageWrapper>
  );
}