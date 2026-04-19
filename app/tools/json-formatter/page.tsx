"use client";

import { useState, useCallback } from "react";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────
type ValidationState = "idle" | "valid" | "invalid";

// ─── Sub-components ───────────────────────────────────────────
function ValidationBadge({ state, error }: { state: ValidationState; error: string }) {
  if (state === "idle") return null;

  return (
    <div className="flex flex-col gap-1.5">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 w-fit",
          "px-2 py-1 rounded-full",
          "text-[11px] font-[500] leading-none",
          state === "valid"
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-600 border border-red-200"
        )}
      >
        {/* Dot */}
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            state === "valid" ? "bg-green-500" : "bg-red-500"
          )}
        />
        {state === "valid" ? "Valid JSON" : "Invalid JSON"}
      </span>

      {state === "invalid" && error && (
        <p className="text-[12px] font-[400] text-red-500 leading-snug m-0 max-w-none">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────
export default function JsonFormatterPage() {
  const [input,      setInput]      = useState("");
  const [output,     setOutput]     = useState("");
  const [validation, setValidation] = useState<ValidationState>("idle");
  const [error,      setError]      = useState("");
  const [copied,     setCopied]     = useState(false);

  // ── Live validation on input change ──
  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    setOutput("");

    if (!value.trim()) {
      setValidation("idle");
      setError("");
      return;
    }

    try {
      JSON.parse(value);
      setValidation("valid");
      setError("");
    } catch (e) {
      setValidation("invalid");
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, []);

  // ── Format (pretty-print) ──
  const handleFormat = useCallback(() => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setValidation("valid");
      setError("");
    } catch (e) {
      setValidation("invalid");
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  }, [input]);

  // ── Minify ──
  const handleMinify = useCallback(() => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setValidation("valid");
      setError("");
    } catch (e) {
      setValidation("invalid");
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  }, [input]);

  // ── Clear ──
  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setValidation("idle");
    setError("");
    setCopied(false);
  }, []);

  // ── Copy output ──
  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = output;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const charCount = output.length;

  return (
    <ToolPageWrapper
      toolName="JSON Formatter"
      description="Format, validate and minify JSON instantly in your browser. No data leaves your device."
      category="Developer"
      isFree={true}
      howItWorks={[
        "Paste your raw JSON into the input area.",
        "Click Format to pretty-print or Minify to compress.",
        "Copy the result or clear and start again.",
      ]}
      relatedTools={[
        { name: "Regex Tester",   slug: "regex-tester",   desc: "Test regex patterns with live highlighting" },
        { name: "Base64 Encoder", slug: "base64-encoder", desc: "Encode and decode Base64 strings" },
        { name: "URL Encoder",    slug: "url-encoder",    desc: "Encode and decode URLs safely" },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* ── Input section ── */}
        <div className="flex flex-col gap-2">

          {/* Input label row */}
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="json-input"
              className="text-[13px] font-[500] text-[#0A0A0A] leading-none"
            >
              Input
            </label>
            <ValidationBadge state={validation} error={error} />
          </div>

          {/* Textarea */}
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={'{\n  "paste": "your JSON here"\n}'}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className={cn(
              "w-full h-52 px-3.5 py-3",
              "rounded-[8px]",
              "border",
              "bg-[#F5F5F5]",
              "font-mono text-[13px] text-[#0A0A0A] leading-relaxed",
              "placeholder:text-[#9B9B9B]",
              "resize-y",
              "outline-none transition-colors duration-100",
              "focus:bg-white",
              validation === "invalid" && input.trim()
                ? "border-red-300 focus:border-red-400"
                : validation === "valid"
                ? "border-green-300 focus:border-green-400"
                : "border-[#E5E5E5] focus:border-[#0A0A0A]"
            )}
          />

          {/* Error below input */}
          {validation === "invalid" && error && (
            <p className="text-[12px] font-[400] text-red-500 leading-snug m-0 max-w-none font-mono">
              {error}
            </p>
          )}
        </div>

        {/* ── Action buttons ── */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleFormat}
            disabled={!input.trim() || validation === "invalid"}
            className={cn(
              "h-8 px-4 rounded-[8px]",
              "bg-[#0A0A0A] text-white",
              "text-[13px] font-[500] leading-none",
              "transition-colors duration-100",
              "hover:bg-[#1a1a1a]",
              "disabled:bg-[#E5E5E5] disabled:text-[#9B9B9B] disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
            )}
          >
            Format
          </button>

          <button
            type="button"
            onClick={handleMinify}
            disabled={!input.trim() || validation === "invalid"}
            className={cn(
              "h-8 px-4 rounded-[8px]",
              "bg-white text-[#0A0A0A]",
              "border border-[#0A0A0A]",
              "text-[13px] font-[500] leading-none",
              "transition-colors duration-100",
              "hover:bg-[#F5F5F5]",
              "disabled:border-[#E5E5E5] disabled:text-[#9B9B9B] disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
            )}
          >
            Minify
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={!input && !output}
            className={cn(
              "h-8 px-4 rounded-[8px]",
              "bg-white text-[#6B6B6B]",
              "border border-[#E5E5E5]",
              "text-[13px] font-[400] leading-none",
              "transition-colors duration-100",
              "hover:border-[#0A0A0A] hover:text-[#0A0A0A]",
              "disabled:text-[#9B9B9B] disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
            )}
          >
            Clear
          </button>
        </div>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-[#E5E5E5]" />

        {/* ── Output section ── */}
        <div className="flex flex-col gap-2">

          {/* Output label row */}
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="json-output"
              className="text-[13px] font-[500] text-[#0A0A0A] leading-none"
            >
              Output
            </label>

            {/* Char count + copy */}
            <div className="flex items-center gap-3">
              {output && (
                <span className="text-[12px] font-[400] text-[#6B6B6B] leading-none tabular-nums">
                  {charCount.toLocaleString()} chars
                </span>
              )}
              <button
                type="button"
                onClick={handleCopy}
                disabled={!output}
                className={cn(
                  "h-7 px-3 rounded-[6px]",
                  "border",
                  "text-[12px] font-[500] leading-none",
                  "transition-colors duration-100",
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
          </div>

          {/* Output textarea */}
          <textarea
            id="json-output"
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className={cn(
              "w-full h-52 px-3.5 py-3",
              "rounded-[8px]",
              "border border-[#E5E5E5]",
              "bg-[#F5F5F5]",
              "font-mono text-[13px] text-[#0A0A0A] leading-relaxed",
              "placeholder:text-[#9B9B9B]",
              "resize-y",
              "outline-none cursor-default",
              "select-all"
            )}
          />
        </div>

      </div>
    </ToolPageWrapper>
  );
}