"use client";

import { useState, useCallback, useEffect } from "react";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

type Format = "standard" | "no-hyphens" | "uppercase";

function generateUUID(fmt: Format): string {
  const raw = crypto.randomUUID();
  if (fmt === "no-hyphens") return raw.replace(/-/g, "");
  if (fmt === "uppercase")  return raw.toUpperCase();
  return raw;
}

function CopyBtn({ text, label }: { text: string; label?: string }) {
  const [c, setC] = useState(false);
  return (
    <button type="button" onClick={async () => { await navigator.clipboard.writeText(text); setC(true); setTimeout(() => setC(false), 2000); }}
      className={cn("h-6 px-2 rounded-[5px] border text-[11px] font-[500] leading-none transition-colors duration-100 shrink-0",
        c ? "bg-green-50 border-green-200 text-green-700" : "bg-white border-[#E5E5E5] text-[#6B6B6B] hover:border-[#0A0A0A]")}>
      {c ? "✓" : (label ?? "Copy")}
    </button>
  );
}

export default function UuidGeneratorPage() {
  const [format,   setFormat]   = useState<Format>("standard");
  const [uuid,     setUuid]     = useState("");
  const [bulk,     setBulk]     = useState<string[]>([]);
  const [bulkCount,setBulkCount]= useState(10);

  const regen = useCallback(() => {
    setUuid(generateUUID(format));
    setBulk([]);
  }, [format]);

  const genBulk = useCallback(() => {
    setBulk(Array.from({ length: bulkCount }, () => generateUUID(format)));
  }, [format, bulkCount]);

  useEffect(() => { regen(); }, [format]);
  useEffect(() => { setUuid(generateUUID(format)); }, []);

  return (
    <ToolPageWrapper
      toolName="UUID Generator"
      description="Generate cryptographically random UUID v4 strings. Bulk generate up to 100, copy individually or all at once."
      category="Developer"
      isFree={true}
      howItWorks={[
        "A UUID v4 is generated automatically on page load.",
        "Use the format options to get hyphenated, no-hyphen, or uppercase UUIDs.",
        "Enter a count and click Generate to create up to 100 UUIDs at once.",
      ]}
      relatedTools={[
        { name: "Password Generator",  slug: "password-generator",  desc: "Generate strong random passwords instantly" },
        { name: "Timestamp Converter", slug: "timestamp-converter",  desc: "Convert Unix timestamps to human dates"    },
        { name: "Base64 Encoder",      slug: "base64-encoder",      desc: "Encode and decode Base64 strings"          },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* Single UUID display */}
        <div className="flex items-center gap-3 p-4 rounded-[10px] border border-[#E5E5E5] bg-[#F5F5F5]">
          <p className="flex-1 font-mono text-[15px] text-[#0A0A0A] break-all m-0 leading-snug min-w-0">
            {uuid || "—"}
          </p>
          <div className="flex gap-2 shrink-0">
            {uuid && <CopyBtn text={uuid} />}
            <button type="button" onClick={regen} aria-label="Regenerate"
              className="w-8 h-8 rounded-[6px] border border-[#E5E5E5] bg-white flex items-center justify-center text-[#6B6B6B] hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 8A6 6 0 102 8" /><polyline points="14 4 14 8 10 8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Version indicator */}
        <div className="flex gap-2">
          <span className={cn("h-7 px-3 rounded-[6px] border text-[12px] font-[500] leading-none flex items-center",
            "bg-[#0A0A0A] text-white border-[#0A0A0A]")}>v4 (random)</span>
          {["v1","v5"].map((v) => (
            <span key={v} className="h-7 px-3 rounded-[6px] border border-[#E5E5E5] text-[12px] font-[400] text-[#9B9B9B] leading-none flex items-center">
              {v} — coming soon
            </span>
          ))}
        </div>

        {/* Format options */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Format</label>
          <div className="flex gap-2 flex-wrap">
            {([
              { id: "standard",    label: "Standard (with hyphens)" },
              { id: "no-hyphens", label: "No hyphens"              },
              { id: "uppercase",  label: "Uppercase"               },
            ] as { id: Format; label: string }[]).map(({ id, label }) => (
              <button key={id} type="button" onClick={() => setFormat(id)}
                className={cn("h-8 px-3 rounded-[8px] border text-[12px] font-[500] leading-none transition-colors duration-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1",
                  format === id ? "bg-[#0A0A0A] text-white border-[#0A0A0A]" : "bg-white text-[#6B6B6B] border-[#E5E5E5] hover:border-[#0A0A0A] hover:text-[#0A0A0A]")}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-[#E5E5E5]" />

        {/* Bulk */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none whitespace-nowrap">How many?</label>
              <input type="number" min={1} max={100} value={bulkCount}
                onChange={(e) => setBulkCount(Math.min(100, Math.max(1, Number(e.target.value))))}
                className="w-20 h-9 px-3 rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5] text-[13px] text-[#0A0A0A] font-mono outline-none focus:bg-white focus:border-[#0A0A0A] transition-colors duration-100" />
            </div>
            <button type="button" onClick={genBulk}
              className={cn("h-9 px-4 rounded-[8px] border border-[#E5E5E5] bg-white flex-1",
                "text-[13px] font-[500] text-[#0A0A0A] leading-none",
                "transition-colors duration-100 hover:border-[#0A0A0A]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2")}>
              Generate {bulkCount} UUIDs
            </button>
          </div>

          {bulk.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-[12px] text-[#6B6B6B] m-0">{bulk.length} UUIDs generated</p>
                <CopyBtn text={bulk.join("\n")} label="Copy all" />
              </div>
              <div className="max-h-64 overflow-y-auto border border-[#E5E5E5] rounded-[8px] divide-y divide-[#E5E5E5]">
                {bulk.map((u, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2 bg-white hover:bg-[#F5F5F5]">
                    <span className="flex-1 font-mono text-[12px] text-[#0A0A0A] break-all min-w-0">{u}</span>
                    <CopyBtn text={u} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </ToolPageWrapper>
  );
}