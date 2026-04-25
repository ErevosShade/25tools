"use client";

import { useState, useCallback } from "react";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")        // remove comments
    .replace(/\s+/g, " ")                      // collapse whitespace
    .replace(/\s*([{}:;,>~+])\s*/g, "$1")     // remove spaces around tokens
    .replace(/;\s*}/g, "}")                    // remove trailing semicolons
    .replace(/\s*!\s*important/g, "!important")
    .trim();
}

function beautifyCss(css: string): string {
  let result  = "";
  let indent  = 0;
  const tokens = css.replace(/\s+/g, " ").split(/(?=[{}])|(?<=[{};])/);
  for (const token of tokens) {
    const t = token.trim();
    if (!t) continue;
    if (t.endsWith("{")) {
      result += "  ".repeat(indent) + t + "\n";
      indent++;
    } else if (t === "}") {
      indent = Math.max(0, indent - 1);
      result += "  ".repeat(indent) + "}\n\n";
    } else {
      const props = t.split(";").filter(Boolean);
      for (const p of props) {
        result += "  ".repeat(indent) + p.trim() + ";\n";
      }
    }
  }
  return result.trim();
}

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  return `${(b / 1024).toFixed(2)} KB`;
}

function savingsPct(orig: number, min: number) {
  if (!orig) return 0;
  return Math.round(((orig - min) / orig) * 100);
}

export default function CssMinifierPage() {
  const [input,   setInput]   = useState("");
  const [output,  setOutput]  = useState("");
  const [mode,    setMode]    = useState<"minify" | "beautify" | null>(null);
  const [copied,  setCopied]  = useState(false);

  const origSize = new TextEncoder().encode(input).length;
  const outSize  = new TextEncoder().encode(output).length;
  const savings  = savingsPct(origSize, outSize);

  const handleMinify = useCallback(() => {
    setOutput(minifyCss(input));
    setMode("minify");
  }, [input]);

  const handleBeautify = useCallback(() => {
    setOutput(beautifyCss(input));
    setMode("beautify");
  }, [input]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext  = mode === "minify" ? ".min.css" : ".css";
    const blob = new Blob([output], { type: "text/css" });
    const a    = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `styles${ext}` });
    a.click();
  };

  return (
    <ToolPageWrapper
      toolName="CSS Minifier"
      description="Minify CSS to remove whitespace and comments, or beautify minified CSS back to readable code. Runs entirely in your browser."
      category="Developer"
      isFree={true}
      howItWorks={[
        "Paste your CSS into the input area.",
        "Click Minify to compress or Beautify to format.",
        "Copy the output or download it as a file.",
      ]}
      relatedTools={[
        { name: "JSON Formatter",    slug: "json-formatter",    desc: "Format and validate JSON instantly"          },
        { name: "Markdown to HTML",  slug: "markdown-to-html",  desc: "Convert Markdown to HTML with live preview"  },
        { name: "Base64 Encoder",    slug: "base64-encoder",    desc: "Encode and decode Base64 strings"            },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Input CSS</label>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setOutput(""); setMode(null); }}
            placeholder=".container { display: flex; gap: 16px; /* layout */ }"
            spellCheck={false}
            className={cn(
              "w-full h-48 px-3.5 py-3 rounded-[8px] border border-[#E5E5E5]",
              "bg-[#F5F5F5] font-mono text-[12px] text-[#0A0A0A] leading-relaxed",
              "placeholder:text-[#9B9B9B] resize-y outline-none",
              "focus:bg-white focus:border-[#0A0A0A] transition-colors duration-100"
            )}
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button type="button" onClick={handleMinify} disabled={!input.trim()}
            className={cn("h-8 px-4 rounded-[8px] bg-[#0A0A0A] text-white text-[13px] font-[500] leading-none",
              "transition-colors duration-100 hover:bg-[#1a1a1a]",
              "disabled:bg-[#E5E5E5] disabled:text-[#9B9B9B] disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2")}>
            Minify
          </button>
          <button type="button" onClick={handleBeautify} disabled={!input.trim()}
            className={cn("h-8 px-4 rounded-[8px] border border-[#0A0A0A] bg-white text-[13px] font-[500] text-[#0A0A0A] leading-none",
              "transition-colors duration-100 hover:bg-[#F5F5F5]",
              "disabled:border-[#E5E5E5] disabled:text-[#9B9B9B] disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2")}>
            Beautify
          </button>
          <button type="button" onClick={() => { setInput(""); setOutput(""); setMode(null); }} disabled={!input}
            className={cn("h-8 px-4 rounded-[8px] border border-[#E5E5E5] bg-white text-[13px] font-[400] text-[#6B6B6B] leading-none",
              "transition-colors duration-100 hover:border-[#0A0A0A] hover:text-[#0A0A0A]",
              "disabled:text-[#9B9B9B] disabled:cursor-not-allowed")}>
            Clear
          </button>
        </div>

        {/* Stats */}
        {output && (
          <div className="flex items-center gap-6 px-4 py-3 rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5] text-[12px]">
            <span className="text-[#6B6B6B]">Original: <span className="font-[500] text-[#0A0A0A] font-mono">{formatBytes(origSize)}</span></span>
            <span className="text-[#6B6B6B]">Output: <span className="font-[500] text-[#0A0A0A] font-mono">{formatBytes(outSize)}</span></span>
            {mode === "minify" && savings > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-[500]">
                Saved {savings}%
              </span>
            )}
          </div>
        )}

        {/* Output */}
        {output && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Output</label>
              <div className="flex gap-2">
                <button type="button" onClick={handleCopy}
                  className={cn("h-7 px-3 rounded-[6px] border text-[12px] font-[500] leading-none transition-colors duration-100",
                    copied ? "bg-green-50 border-green-200 text-green-700" : "bg-white border-[#E5E5E5] text-[#0A0A0A] hover:border-[#0A0A0A]")}>
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button type="button" onClick={handleDownload}
                  className="h-7 px-3 rounded-[6px] border border-[#E5E5E5] bg-white text-[12px] font-[500] text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors duration-100">
                  Download {mode === "minify" ? ".min.css" : ".css"}
                </button>
              </div>
            </div>
            <textarea readOnly value={output}
              className="w-full h-48 px-3.5 py-3 rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5] font-mono text-[12px] text-[#0A0A0A] leading-relaxed resize-y outline-none cursor-default" />
          </div>
        )}

      </div>
    </ToolPageWrapper>
  );
}