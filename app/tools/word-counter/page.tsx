"use client";

import { useMemo } from "react";
import { useState } from "react";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

interface Stats {
  words:       number;
  charsWithSp: number;
  charsNoSp:   number;
  sentences:   number;
  paragraphs:  number;
  readingTime: number;
}

function getStats(text: string): Stats {
  if (!text.trim()) return { words: 0, charsWithSp: 0, charsNoSp: 0, sentences: 0, paragraphs: 0, readingTime: 0 };
  const words       = text.trim().split(/\s+/).filter(Boolean).length;
  const charsWithSp = text.length;
  const charsNoSp   = text.replace(/\s/g, "").length;
  const sentences   = (text.match(/[^.!?]*[.!?]+/g) ?? []).length;
  const paragraphs  = text.split(/\n{2,}/).filter((p) => p.trim()).length || (text.trim() ? 1 : 0);
  const readingTime = Math.ceil(words / 200);
  return { words, charsWithSp, charsNoSp, sentences, paragraphs, readingTime };
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-1.5 p-3 rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5]">
      <span className="text-[22px] font-[500] text-[#0A0A0A] leading-none tabular-nums">
        {value}
      </span>
      <span className="text-[11px] font-[400] text-[#6B6B6B] leading-none uppercase tracking-[0.05em]">
        {label}
      </span>
    </div>
  );
}

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const stats = useMemo(() => getStats(text), [text]);

  return (
    <ToolPageWrapper
      toolName="Word Counter"
      description="Count words, characters, sentences, paragraphs, and estimated reading time as you type."
      category="Text"
      isFree={true}
      howItWorks={[
        "Paste or type your text into the input area.",
        "All statistics update live with every keystroke.",
        "Use the reading time estimate to gauge content length for articles or emails.",
      ]}
      relatedTools={[
        { name: "Case Converter",  slug: "case-converter",  desc: "Convert text between cases instantly"  },
        { name: "JSON Formatter",  slug: "json-formatter",  desc: "Format and validate JSON instantly"    },
        { name: "Base64 Encoder",  slug: "base64-encoder",  desc: "Encode and decode Base64 strings"     },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* Stats grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          <StatCard label="Words"       value={stats.words.toLocaleString()}       />
          <StatCard label="Chars (w/ spaces)"  value={stats.charsWithSp.toLocaleString()} />
          <StatCard label="Chars (no spaces)"  value={stats.charsNoSp.toLocaleString()}   />
          <StatCard label="Sentences"   value={stats.sentences.toLocaleString()}   />
          <StatCard label="Paragraphs"  value={stats.paragraphs.toLocaleString()}  />
          <StatCard label="Read time"   value={`${stats.readingTime} min`}         />
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E5E5E5]" />

        {/* Input */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Your text</label>
            {text && (
              <button
                type="button"
                onClick={() => setText("")}
                className="text-[12px] text-[#6B6B6B] hover:text-[#0A0A0A] underline underline-offset-2 hover:no-underline transition-colors duration-100 leading-none"
              >
                Clear
              </button>
            )}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here..."
            className={cn(
              "w-full h-64 px-3.5 py-3 rounded-[8px] border border-[#E5E5E5]",
              "bg-[#F5F5F5] text-[14px] text-[#0A0A0A] leading-relaxed",
              "placeholder:text-[#9B9B9B] resize-y outline-none",
              "focus:bg-white focus:border-[#0A0A0A] transition-colors duration-100"
            )}
          />
        </div>

      </div>
    </ToolPageWrapper>
  );
}