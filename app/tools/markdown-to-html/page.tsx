"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

const PLACEHOLDER = `# Hello World

This is **bold** and this is *italic*.

## Features
- Live preview
- HTML source view
- One-click copy

\`\`\`js
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`

[Visit DevKit25](https://25tools.dev)`;

type ViewMode = "preview" | "source";

function CopyBtn({ text }: { text: string }) {
  const [c, setC] = useState(false);
  return (
    <button type="button" onClick={async () => { await navigator.clipboard.writeText(text); setC(true); setTimeout(() => setC(false), 2000); }}
      className={cn("h-7 px-3 rounded-[6px] border text-[12px] font-[500] leading-none transition-colors duration-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1",
        c ? "bg-green-50 border-green-200 text-green-700" : "bg-white border-[#E5E5E5] text-[#0A0A0A] hover:border-[#0A0A0A]")}>
      {c ? "Copied!" : "Copy HTML"}
    </button>
  );
}

function insertAtCursor(textarea: HTMLTextAreaElement, before: string, after = ""): string {
  const start = textarea.selectionStart;
  const end   = textarea.selectionEnd;
  const sel   = textarea.value.slice(start, end);
  return textarea.value.slice(0, start) + before + sel + after + textarea.value.slice(end);
}

export default function MarkdownToHtmlPage() {
  const [markdown, setMarkdown] = useState(PLACEHOLDER);
  const [html,     setHtml]     = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    (async () => {
      const { marked } = await import("marked");
      setHtml(await marked.parse(markdown));
    })();
  }, [markdown]);

  const insertSyntax = useCallback((before: string, after = "") => {
    const ta = textareaRef.current;
    if (!ta) return;
    setMarkdown(insertAtCursor(ta, before, after));
    ta.focus();
  }, []);

  const downloadHtml = () => {
    const blob = new Blob([`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Converted</title></head><body>${html}</body></html>`], { type: "text/html" });
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "converted.html" });
    a.click();
  };

  const charCount = markdown.length;

  const TOOLBAR = [
    { label: "B",  title: "Bold",          before: "**",  after: "**"  },
    { label: "I",  title: "Italic",         before: "*",   after: "*"   },
    { label: "H",  title: "Heading",        before: "## ", after: ""    },
    { label: "[]", title: "Link",           before: "[",   after: "](url)" },
    { label: "<>", title: "Inline code",    before: "`",   after: "`"   },
    { label: "•",  title: "Bullet list",    before: "- ",  after: ""    },
  ];

  return (
    <ToolPageWrapper
      toolName="Markdown to HTML"
      description="Convert Markdown to HTML with a live preview. Switch between rendered output and raw HTML source."
      category="Developer"
      isFree={true}
      howItWorks={[
        "Type or paste Markdown in the left panel.",
        "The HTML preview updates live as you type.",
        "Copy the HTML or download it as an .html file.",
      ]}
      relatedTools={[
        { name: "CSS Minifier",   slug: "css-minifier",   desc: "Minify and beautify CSS instantly"      },
        { name: "JSON Formatter", slug: "json-formatter", desc: "Format and validate JSON instantly"      },
        { name: "Word Counter",   slug: "word-counter",   desc: "Count words, characters and reading time"},
      ]}
    >
      <div className="flex flex-col gap-4">

        {/* Toolbar */}
        <div className="flex items-center gap-1 flex-wrap">
          {TOOLBAR.map(({ label, title, before, after }) => (
            <button key={title} type="button" title={title} onClick={() => insertSyntax(before, after)}
              className="w-8 h-8 rounded-[6px] border border-[#E5E5E5] bg-white text-[12px] font-[600] font-mono text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]">
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Input */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">Markdown</label>
              <span className="text-[11px] text-[#6B6B6B]">{charCount.toLocaleString()} chars</span>
            </div>
            <textarea
              ref={textareaRef}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              spellCheck={false}
              className={cn(
                "w-full h-80 px-3.5 py-3 rounded-[8px] border border-[#E5E5E5]",
                "bg-[#F5F5F5] font-mono text-[12px] text-[#0A0A0A] leading-relaxed",
                "resize-none outline-none focus:bg-white focus:border-[#0A0A0A] transition-colors duration-100"
              )}
            />
          </div>

          {/* Output */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-1 p-0.5 bg-[#F5F5F5] rounded-[6px]">
                {(["preview","source"] as ViewMode[]).map((m) => (
                  <button key={m} type="button" onClick={() => setViewMode(m)}
                    className={cn("px-3 h-6 rounded-[5px] text-[11px] font-[500] capitalize leading-none transition-colors duration-100",
                      viewMode === m ? "bg-white text-[#0A0A0A] shadow-sm" : "text-[#6B6B6B] hover:text-[#0A0A0A]")}>
                    {m}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <CopyBtn text={html} />
                <button type="button" onClick={downloadHtml}
                  className="h-7 px-3 rounded-[6px] border border-[#E5E5E5] bg-white text-[12px] font-[500] text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors duration-100">
                  Download .html
                </button>
              </div>
            </div>
            {viewMode === "preview" ? (
              <div
                className="h-80 px-4 py-3 rounded-[8px] border border-[#E5E5E5] bg-white overflow-y-auto text-[13px] leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <textarea
                readOnly value={html}
                className="h-80 px-3.5 py-3 rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5] font-mono text-[11px] text-[#0A0A0A] leading-relaxed resize-none outline-none cursor-default"
              />
            )}
          </div>
        </div>

      </div>
    </ToolPageWrapper>
  );
}