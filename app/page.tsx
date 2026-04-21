"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { TOOLS, TOOL_CATEGORIES, filterTools, type ToolCategory } from "@/lib/tools";
import { cn } from "@/lib/utils";

type Category = ToolCategory | "All";

const CATEGORIES: Category[] = ["All", ...TOOL_CATEGORIES];

function SearchIcon() {
  return (
    <svg className="w-4 h-4 text-[#6B6B6B] shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="9" r="6" />
      <line x1="13.5" y1="13.5" x2="17" y2="17" />
    </svg>
  );
}

function ToolIcon({ category }: { category: string }) {
  const cls = "w-5 h-5 text-[#6B6B6B] shrink-0";
  switch (category) {
    case "Developer":
      return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="5 7 2 10 5 13" /><polyline points="15 7 18 10 15 13" /><line x1="11" y1="4" x2="9" y2="16" /></svg>;
    case "PDF":
      return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 2h8l4 4v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" /><polyline points="12 2 12 6 16 6" /><line x1="7" y1="11" x2="13" y2="11" /><line x1="7" y1="14" x2="11" y2="14" /></svg>;
    case "Image":
      return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="16" height="12" rx="2" /><circle cx="7" cy="9" r="1.5" /><polyline points="2 15 7 10 10 13 13 10 18 15" /></svg>;
    case "Text":
      return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" y1="6" x2="16" y2="6" /><line x1="4" y1="10" x2="14" y2="10" /><line x1="4" y1="14" x2="11" y2="14" /></svg>;
    case "Converter":
      return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="4 7 4 4 16 4 16 7" /><line x1="10" y1="4" x2="10" y2="16" /><polyline points="7 13 10 16 13 13" /></svg>;
    default: return null;
  }
}

export default function HomePage() {
  const [query,     setQuery]     = useState("");
  const [activeTab, setActiveTab] = useState<Category>("All");

  const filtered = useMemo(
    () => filterTools(TOOLS, activeTab, query),
    [activeTab, query]
  );

  return (
    <div className="w-full">

      {/* ══ Hero ══════════════════════════════════════════════ */}
      <section className="w-full border-b border-[#E5E5E5]" aria-labelledby="hero-heading">
        <div className="mx-auto max-w-3xl px-5 pt-20 pb-16 flex flex-col items-center text-center gap-5">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5E5E5] bg-[#F5F5F5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
            <span className="text-[12px] font-[500] text-[#0A0A0A] leading-none">
              {TOOLS.length}+ free tools, no sign-up
            </span>
          </div>

          {/* ── Primary H1 with keyword ── */}
          <h1
            id="hero-heading"
            className="text-[clamp(2rem,5vw,3.25rem)] font-[500] text-[#0A0A0A] leading-[1.1] tracking-[-0.03em] text-balance m-0"
          >
            Free Online Developer &amp; Productivity Tools
          </h1>

          <p className="text-[16px] font-[400] text-[#6B6B6B] leading-relaxed max-w-md m-0">
            {TOOLS.length}+ free developer and productivity tools.
            No sign-up required.
          </p>

          {/* Search */}
          <div className="relative w-full max-w-xl mt-2">
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
              <SearchIcon />
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveTab("All"); }}
              placeholder="Search tools — try 'JSON', 'PDF', 'compress'..."
              aria-label="Search all tools"
              className={cn(
                "w-full h-11 pl-10 pr-4 rounded-[10px]",
                "border border-[#E5E5E5] bg-white",
                "text-[14px] font-[400] text-[#0A0A0A]",
                "placeholder:text-[#6B6B6B]",
                "outline-none focus:border-[#0A0A0A] transition-colors duration-100"
              )}
            />
          </div>
        </div>
      </section>

      {/* ══ Category pills + Grid ══════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-5 py-10" aria-label="Tools directory">

        <div
          className="flex gap-2 overflow-x-auto pb-1 mb-8 no-scrollbar"
          role="tablist"
          aria-label="Filter by category"
        >
          {CATEGORIES.map((cat) => {
            const active = activeTab === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                onClick={() => { setActiveTab(cat); setQuery(""); }}
                className={cn(
                  "shrink-0 h-8 px-3.5 rounded-full border",
                  "text-[13px] font-[500] leading-none transition-colors duration-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1",
                  active
                    ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                    : "bg-[#F5F5F5] text-[#6B6B6B] border-[#E5E5E5] hover:text-[#0A0A0A] hover:border-[#D0D0D0]"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <p className="text-[13px] font-[400] text-[#6B6B6B] mb-5 m-0">
          {filtered.length === TOOLS.length
            ? `${TOOLS.length} tools`
            : `${filtered.length} of ${TOOLS.length} tools`}
          {activeTab !== "All" && ` in ${activeTab}`}
          {query && ` matching "${query}"`}
        </p>

        {filtered.length > 0 ? (
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 list-none p-0 m-0"
            aria-label="Available tools"
          >
            {filtered.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  aria-label={`Open ${tool.name} — free online ${tool.desc.toLowerCase()}`}
                  className={cn(
                    "group flex flex-col gap-3",
                    "bg-white border border-[#E5E5E5] rounded-[12px] p-4",
                    "transition-colors duration-100 hover:border-[#0A0A0A]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]",
                    "focus-visible:ring-offset-2 focus-visible:rounded-[12px]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[8px] bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center shrink-0">
                      <ToolIcon category={tool.category} />
                    </div>
                    <span className="text-[14px] font-[500] text-[#0A0A0A] leading-snug tracking-[-0.01em] flex-1 min-w-0 truncate">
                      {tool.name}
                    </span>
                    <Badge variant={tool.free ? "free" : "pro"} />
                  </div>
                  <p className="text-[13px] font-[400] text-[#6B6B6B] leading-snug m-0 max-w-none">
                    {tool.desc}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-1">
                    <span className="text-[11px] font-[500] text-[#6B6B6B] uppercase tracking-[0.05em] leading-none">
                      {tool.category}
                    </span>
                    <span className="text-[12px] text-[#6B6B6B] group-hover:text-[#0A0A0A] transition-colors duration-100 leading-none">
                      Open →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <div className="w-10 h-10 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center">
              <SearchIcon />
            </div>
            <p className="text-[14px] font-[500] text-[#0A0A0A] m-0">No tools found</p>
            <p className="text-[13px] font-[400] text-[#6B6B6B] m-0">
              Try a different keyword or{" "}
              <button
                onClick={() => { setQuery(""); setActiveTab("All"); }}
                className="underline underline-offset-2 text-[#0A0A0A] hover:no-underline transition-all duration-100"
              >
                clear filters
              </button>
            </p>
          </div>
        )}
      </section>

      {/* ══ CTA strip ═════════════════════════════════════════ */}
      <section className="border-t border-[#E5E5E5]" aria-label="Call to action">
        <div className="mx-auto max-w-6xl px-5 py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p className="text-[15px] font-[500] text-[#0A0A0A] m-0 tracking-[-0.01em]">
              Have a tool suggestion?
            </p>
            <p className="text-[13px] font-[400] text-[#6B6B6B] m-0">
              Always looking to add tools people actually need.
            </p>
          </div>
          <Link
            href="/about"
            className={cn(
              "inline-flex items-center justify-center shrink-0",
              "h-9 px-5 rounded-full",
              "bg-[#0A0A0A] text-white",
              "text-[13px] font-[500] leading-none",
              "transition-colors duration-100 hover:bg-[#1a1a1a]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
            )}
          >
            Learn more →
          </Link>
        </div>
      </section>

    </div>
  );
}