"use client";

import { useState, useCallback, useEffect } from "react";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

function formatRelative(ms: number): string {
  const diff = ms - Date.now();
  const abs  = Math.abs(diff);
  const future = diff > 0;
  if (abs < 60000)    return future ? "in a few seconds" : "a few seconds ago";
  if (abs < 3600000)  return `${future ? "in " : ""}${Math.round(abs/60000)} minute${Math.round(abs/60000)!==1?"s":""}${!future?" ago":""}`;
  if (abs < 86400000) return `${future ? "in " : ""}${Math.round(abs/3600000)} hour${Math.round(abs/3600000)!==1?"s":""}${!future?" ago":""}`;
  return `${future ? "in " : ""}${Math.round(abs/86400000)} day${Math.round(abs/86400000)!==1?"s":""}${!future?" ago":""}`;
}

function CopyBtn({ text }: { text: string }) {
  const [c, setC] = useState(false);
  return (
    <button type="button" onClick={async () => { await navigator.clipboard.writeText(text); setC(true); setTimeout(() => setC(false), 2000); }}
      className={cn("h-6 px-2 rounded-[5px] border text-[11px] font-[500] leading-none transition-colors duration-100 shrink-0",
        c ? "bg-green-50 border-green-200 text-green-700" : "bg-white border-[#E5E5E5] text-[#6B6B6B] hover:border-[#0A0A0A]")}>
      {c ? "✓" : "Copy"}
    </button>
  );
}

function OutputRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2 border-b border-[#F5F5F5] last:border-0">
      <span className="text-[11px] font-[500] text-[#6B6B6B] uppercase tracking-[0.04em] leading-none shrink-0 mt-0.5 w-20">{label}</span>
      <span className="flex-1 font-mono text-[12px] text-[#0A0A0A] leading-snug break-all">{value}</span>
      <CopyBtn text={value} />
    </div>
  );
}

export default function TimestampConverterPage() {
  const [unixInput,  setUnixInput]  = useState("");
  const [dateInput,  setDateInput]  = useState("");
  const [timeInput,  setTimeInput]  = useState("");
  const [unixResult, setUnixResult] = useState<{ date: Date } | null>(null);
  const [dateResult, setDateResult] = useState<{ sec: number; ms: number } | null>(null);
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const convertUnix = useCallback((val: string) => {
    const n = Number(val.trim());
    if (!val.trim() || isNaN(n)) { setUnixResult(null); return; }
    const ms = n > 1e10 ? n : n * 1000;
    setUnixResult({ date: new Date(ms) });
  }, []);

  const convertDate = useCallback(() => {
    if (!dateInput) { setDateResult(null); return; }
    const dt  = new Date(`${dateInput}T${timeInput || "00:00"}:00`);
    if (isNaN(dt.getTime())) { setDateResult(null); return; }
    setDateResult({ sec: Math.floor(dt.getTime() / 1000), ms: dt.getTime() });
  }, [dateInput, timeInput]);

  useEffect(() => { convertUnix(unixInput); }, [unixInput, convertUnix]);
  useEffect(() => { convertDate(); }, [dateInput, timeInput, convertDate]);

  const useNow = () => {
    const now  = Date.now();
    const date = new Date(now);
    setUnixInput(String(Math.floor(now / 1000)));
    setDateInput(date.toISOString().split("T")[0]);
    setTimeInput(date.toTimeString().slice(0, 5));
  };

  return (
    <ToolPageWrapper
      toolName="Timestamp Converter"
      description="Convert Unix timestamps to human-readable dates and back. Supports seconds and milliseconds, shows local and UTC time."
      category="Developer"
      isFree={true}
      howItWorks={[
        "Paste a Unix timestamp in the left panel to see the human-readable date.",
        "Enter a date and time in the right panel to get the Unix timestamp.",
        "Click 'Use current time' to populate both panels with the current moment.",
      ]}
      relatedTools={[
        { name: "JWT Reader",      slug: "jwt-reader",      desc: "Decode and inspect JWT tokens instantly" },
        { name: "UUID Generator",  slug: "uuid-generator",  desc: "Generate random UUID v4 strings in bulk" },
        { name: "JSON Formatter",  slug: "json-formatter",  desc: "Format and validate JSON instantly"      },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* Current time button + timezone */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <button type="button" onClick={useNow}
            className={cn("h-8 px-4 rounded-[8px] border border-[#E5E5E5] bg-white",
              "text-[13px] font-[500] text-[#0A0A0A] leading-none",
              "transition-colors duration-100 hover:border-[#0A0A0A]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2")}>
            Use current time
          </button>
          <span className="text-[12px] text-[#6B6B6B] leading-none">
            Timezone: <span className="font-mono text-[#0A0A0A]">{tz}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Unix → Human */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Unix timestamp</label>
              <input type="number" value={unixInput} onChange={(e) => setUnixInput(e.target.value)}
                placeholder="e.g. 1745567400"
                className={cn("w-full h-9 px-3.5 rounded-[8px] border border-[#E5E5E5]",
                  "bg-[#F5F5F5] font-mono text-[13px] text-[#0A0A0A]",
                  "placeholder:text-[#9B9B9B] outline-none focus:bg-white focus:border-[#0A0A0A] transition-colors duration-100")} />
              <p className="text-[11px] text-[#6B6B6B] m-0">Seconds or milliseconds — auto detected</p>
            </div>
            {unixResult && (
              <div className="flex flex-col border border-[#E5E5E5] rounded-[8px] overflow-hidden">
                <div className="px-3 py-2 bg-[#F5F5F5] border-b border-[#E5E5E5]">
                  <p className="text-[11px] font-[500] text-[#6B6B6B] uppercase tracking-[0.05em] m-0">Output</p>
                </div>
                <div className="px-3 py-2 flex flex-col">
                  <OutputRow label="Local"    value={unixResult.date.toLocaleString()} />
                  <OutputRow label="UTC"      value={unixResult.date.toISOString()} />
                  <OutputRow label="Relative" value={formatRelative(unixResult.date.getTime())} />
                  <OutputRow label="ISO 8601" value={unixResult.date.toISOString()} />
                  <OutputRow label="RFC 2822" value={unixResult.date.toUTCString()} />
                </div>
              </div>
            )}
          </div>

          {/* Human → Unix */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Date & time</label>
              <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)}
                className={cn("w-full h-9 px-3.5 rounded-[8px] border border-[#E5E5E5]",
                  "bg-[#F5F5F5] text-[13px] text-[#0A0A0A]",
                  "outline-none focus:bg-white focus:border-[#0A0A0A] transition-colors duration-100")} />
              <input type="time" value={timeInput} onChange={(e) => setTimeInput(e.target.value)}
                className={cn("w-full h-9 px-3.5 rounded-[8px] border border-[#E5E5E5]",
                  "bg-[#F5F5F5] text-[13px] text-[#0A0A0A]",
                  "outline-none focus:bg-white focus:border-[#0A0A0A] transition-colors duration-100")} />
            </div>
            {dateResult && (
              <div className="flex flex-col border border-[#E5E5E5] rounded-[8px] overflow-hidden">
                <div className="px-3 py-2 bg-[#F5F5F5] border-b border-[#E5E5E5]">
                  <p className="text-[11px] font-[500] text-[#6B6B6B] uppercase tracking-[0.05em] m-0">Output</p>
                </div>
                <div className="px-3 py-2 flex flex-col">
                  <OutputRow label="Seconds" value={String(dateResult.sec)} />
                  <OutputRow label="Ms"      value={String(dateResult.ms)}  />
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </ToolPageWrapper>
  );
}