"use client";

import { useState, useCallback } from "react";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

type CaseType = "upper" | "lower" | "title" | "sentence" | "camel" | "snake";

const CASES: { id: CaseType; label: string }[] = [
  { id: "upper",    label: "UPPERCASE"     },
  { id: "lower",    label: "lowercase"     },
  { id: "title",    label: "Title Case"    },
  { id: "sentence", label: "Sentence case" },
  { id: "camel",    label: "camelCase"     },
  { id: "snake",    label: "snake_case"    },
];

function convert(text: string, type: CaseType): string {
  switch (type) {
    case "upper":    return text.toUpperCase();
    case "lower":    return text.toLowerCase();
    case "title":    return text.replace(/\b\w/g, (c) => c.toUpperCase());
    case "sentence": return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case "camel":
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
    case "snake":
      return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");
  }
}

export default function CaseConverterPage() {
  const [text,        setText]        = useState("");
  const [activeCase,  setActiveCase]  = useState<CaseType | null>(null);
  const [copied,      setCopied]      = useState(false);

  const outputText = activeCase ? convert(text, activeCase) : text;

  const handleCase = useCallback((type: CaseType) => {
    setActiveCase(type);
    setCopied(false);
  }, []);

  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageWrapper
      toolName="Case Converter"
      description="Convert text between uppercase, lowercase, title case, camelCase, snake_case and more instantly."
      category="Text"
      isFree={true}
      howItWorks={[
        "Paste or type your text into the input area.",
        "Click any case format button to convert the text instantly.",
        "Copy the result and use it wherever you need.",
      ]}
      relatedTools={[
        { name: "Word Counter",  slug: "word-counter",  desc: "Count words, characters and reading time" },
        { name: "URL Encoder",   slug: "url-encoder",   desc: "Encode and decode URLs safely"            },
        { name: "Base64 Encoder",slug: "base64-encoder",desc: "Encode and decode Base64 strings"        },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* Case buttons */}
        <div className="flex flex-wrap gap-2">
          {CASES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleCase(id)}
              className={cn(
                "h-8 px-3.5 rounded-[8px] border text-[13px] font-[500] leading-none",
                "transition-colors duration-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1",
                activeCase === id
                  ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                  : "bg-white text-[#0A0A0A] border-[#E5E5E5] hover:border-[#0A0A0A]"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Input</label>
          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value); setActiveCase(null); }}
            placeholder="Paste or type your text here..."
            className={cn(
              "w-full h-40 px-3.5 py-3 rounded-[8px] border border-[#E5E5E5]",
              "bg-[#F5F5F5] text-[14px] text-[#0A0A0A] leading-relaxed",
              "placeholder:text-[#9B9B9B] resize-y outline-none",
              "focus:bg-white focus:border-[#0A0A0A] transition-colors duration-100"
            )}
          />
        </div>

        {/* Output */}
        {activeCase && (
          <>
            <div className="h-px bg-[#E5E5E5]" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Output</label>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!outputText}
                  className={cn(
                    "h-7 px-3 rounded-[6px] border text-[12px] font-[500] leading-none transition-colors duration-100",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]",
                    copied
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-white border-[#E5E5E5] text-[#0A0A0A] hover:border-[#0A0A0A]",
                    "disabled:text-[#9B9B9B] disabled:cursor-not-allowed"
                  )}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <textarea
                readOnly
                value={outputText}
                className={cn(
                  "w-full h-40 px-3.5 py-3 rounded-[8px] border border-[#E5E5E5]",
                  "bg-[#F5F5F5] text-[14px] text-[#0A0A0A] leading-relaxed",
                  "resize-y outline-none cursor-default"
                )}
              />
            </div>
          </>
        )}

      </div>
    </ToolPageWrapper>
  );
}