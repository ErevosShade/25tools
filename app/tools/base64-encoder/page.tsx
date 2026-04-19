"use client";

import { useState, useCallback } from "react";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";


type Tab = "encode" | "decode";

export default function Base64EncoderPage() {
  const [tab,    setTab]    = useState<Tab>("encode");
  const [input,  setInput]  = useState("");
  const [copied, setCopied] = useState(false);

  const output = useCallback((): { value: string; error: string } => {
    if (!input.trim()) return { value: "", error: "" };
    try {
      if (tab === "encode") return { value: btoa(unescape(encodeURIComponent(input))), error: "" };
      return { value: decodeURIComponent(escape(atob(input))), error: "" };
    } catch {
      return { value: "", error: tab === "decode" ? "Invalid Base64 string." : "Encoding failed." };
    }
  }, [input, tab]);

  const { value: outputValue, error } = output();

  const handleCopy = async () => {
    if (!outputValue) return;
    await navigator.clipboard.writeText(outputValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setInput("");
    setCopied(false);
  };

  return (
    <ToolPageWrapper
      toolName="Base64 Encoder"
      description="Encode text to Base64 or decode Base64 strings back to plain text, instantly in your browser."
      category="Developer"
      isFree={true}
      howItWorks={[
        "Choose Encode or Decode using the tabs.",
        "Paste your text or Base64 string into the input area.",
        "The result appears instantly — copy it with one click.",
      ]}
      relatedTools={[
        { name: "URL Encoder",    slug: "url-encoder",    desc: "Encode and decode URLs safely"          },
        { name: "JSON Formatter", slug: "json-formatter", desc: "Format and validate JSON instantly"     },
        { name: "Regex Tester",   slug: "regex-tester",   desc: "Test regex patterns with live matching" },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-[#F5F5F5] rounded-[8px] w-fit">
          {(["encode","decode"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleTabChange(t)}
              className={cn(
                "px-4 h-7 rounded-[6px] text-[13px] font-[500] leading-none capitalize transition-colors duration-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1",
                tab === t
                  ? "bg-white text-[#0A0A0A] shadow-sm"
                  : "text-[#6B6B6B] hover:text-[#0A0A0A]"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">
            {tab === "encode" ? "Plain text" : "Base64 string"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tab === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
            spellCheck={false}
            className={cn(
              "w-full h-36 px-3.5 py-3 rounded-[8px] border border-[#E5E5E5]",
              "bg-[#F5F5F5] font-mono text-[13px] text-[#0A0A0A] leading-relaxed",
              "placeholder:text-[#9B9B9B] resize-y outline-none",
              "focus:bg-white focus:border-[#0A0A0A] transition-colors duration-100"
            )}
          />
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">
              {tab === "encode" ? "Base64 output" : "Decoded text"}
            </label>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!outputValue}
              className={cn(
                "h-7 px-3 rounded-[6px] border text-[12px] font-[500] leading-none transition-colors duration-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1",
                copied
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-white border-[#E5E5E5] text-[#0A0A0A] hover:border-[#0A0A0A]",
                "disabled:text-[#9B9B9B] disabled:border-[#E5E5E5] disabled:cursor-not-allowed"
              )}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          {error ? (
            <p className="text-[13px] text-red-500 font-mono m-0">{error}</p>
          ) : (
            <textarea
              readOnly
              value={outputValue}
              placeholder="Output will appear here..."
              className={cn(
                "w-full h-36 px-3.5 py-3 rounded-[8px] border border-[#E5E5E5]",
                "bg-[#F5F5F5] font-mono text-[13px] text-[#0A0A0A] leading-relaxed",
                "placeholder:text-[#9B9B9B] resize-y outline-none cursor-default"
              )}
            />
          )}
        </div>

      </div>
    </ToolPageWrapper>
  );
}