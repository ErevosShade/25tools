"use client";

import { useState, useMemo } from "react";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

type Flag = "g" | "i" | "m";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags,   setFlags]   = useState<Set<Flag>>(new Set(["g"]));
  const [testStr, setTestStr] = useState("");

  const toggleFlag = (f: Flag) =>
    setFlags((prev) => {
      const next = new Set(prev);
      next.has(f) ? next.delete(f) : next.add(f);
      return next;
    });

  const { segments, matchCount, regexError } = useMemo(() => {
    if (!pattern) return { segments: [{ text: testStr, match: false }], matchCount: 0, regexError: "" };

    try {
      const flagStr = Array.from(flags).join("");
      // Always include 'g' for iteration
      const re = new RegExp(pattern, flagStr.includes("g") ? flagStr : flagStr + "g");
      const matches = [...testStr.matchAll(re)];

      if (matches.length === 0) return { segments: [{ text: testStr, match: false }], matchCount: 0, regexError: "" };

      const segs: { text: string; match: boolean }[] = [];
      let cursor = 0;
      for (const m of matches) {
        const start = m.index ?? 0;
        if (start > cursor) segs.push({ text: testStr.slice(cursor, start), match: false });
        segs.push({ text: m[0], match: true });
        cursor = start + m[0].length;
      }
      if (cursor < testStr.length) segs.push({ text: testStr.slice(cursor), match: false });

      return { segments: segs, matchCount: matches.length, regexError: "" };
    } catch (e) {
      return {
        segments: [{ text: testStr, match: false }],
        matchCount: 0,
        regexError: e instanceof Error ? e.message : "Invalid regex",
      };
    }
  }, [pattern, flags, testStr]);

  return (
    <ToolPageWrapper
      toolName="Regex Tester"
      description="Write and test regular expressions with live match highlighting. No setup, no installs."
      category="Developer"
      isFree={true}
      howItWorks={[
        "Enter your regular expression in the pattern field and toggle flags as needed.",
        "Paste or type your test string in the text area below.",
        "All matches are highlighted instantly — the total count appears below the string.",
      ]}
      relatedTools={[
        { name: "JSON Formatter", slug: "json-formatter", desc: "Format and validate JSON instantly"     },
        { name: "URL Encoder",    slug: "url-encoder",    desc: "Encode and decode URLs safely"          },
        { name: "Base64 Encoder", slug: "base64-encoder", desc: "Encode and decode Base64 strings"      },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* Pattern + flags */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Pattern</label>
          <div className="flex items-center gap-2">
            <span className="text-[16px] text-[#9B9B9B] font-mono leading-none">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. \d+"
              spellCheck={false}
              className={cn(
                "flex-1 h-9 px-3 rounded-[8px] border font-mono",
                "text-[13px] text-[#0A0A0A] bg-[#F5F5F5]",
                "placeholder:text-[#9B9B9B] outline-none focus:bg-white transition-colors duration-100",
                regexError ? "border-red-300 focus:border-red-400" : "border-[#E5E5E5] focus:border-[#0A0A0A]"
              )}
            />
            <span className="text-[16px] text-[#9B9B9B] font-mono leading-none">/</span>
            {/* Flags */}
            {(["g","i","m"] as Flag[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => toggleFlag(f)}
                className={cn(
                  "w-8 h-9 rounded-[8px] border font-mono text-[13px] font-[500] transition-colors duration-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1",
                  flags.has(f)
                    ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                    : "bg-white text-[#6B6B6B] border-[#E5E5E5] hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          {regexError && (
            <p className="text-[12px] text-red-500 font-mono m-0 leading-snug">{regexError}</p>
          )}
        </div>

        {/* Test string */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Test string</label>
          <textarea
            value={testStr}
            onChange={(e) => setTestStr(e.target.value)}
            placeholder="Paste your test string here..."
            spellCheck={false}
            className={cn(
              "w-full h-36 px-3.5 py-3 rounded-[8px] border border-[#E5E5E5]",
              "bg-[#F5F5F5] font-mono text-[13px] text-[#0A0A0A] leading-relaxed",
              "placeholder:text-[#9B9B9B] resize-y outline-none focus:bg-white focus:border-[#0A0A0A]",
              "transition-colors duration-100"
            )}
          />
        </div>

        {/* Highlighted output */}
        {testStr && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Matches</label>
              <span className={cn(
                "text-[12px] font-[500] leading-none px-2 py-0.5 rounded-full border",
                matchCount > 0
                  ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                  : "bg-[#F5F5F5] text-[#6B6B6B] border-[#E5E5E5]"
              )}>
                {matchCount} {matchCount === 1 ? "match" : "matches"}
              </span>
            </div>
            <div className={cn(
              "w-full min-h-[80px] px-3.5 py-3 rounded-[8px] border border-[#E5E5E5]",
              "bg-[#F5F5F5] font-mono text-[13px] leading-relaxed break-all whitespace-pre-wrap"
            )}>
              {segments.map((seg, i) =>
                seg.match ? (
                  <mark key={i} className="bg-yellow-200 text-[#0A0A0A] rounded-[2px] px-0.5">
                    {seg.text}
                  </mark>
                ) : (
                  <span key={i} className="text-[#0A0A0A]">{seg.text}</span>
                )
              )}
            </div>
          </div>
        )}

      </div>
    </ToolPageWrapper>
  );
}