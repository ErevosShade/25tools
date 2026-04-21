"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  TOOLS, TOOL_CATEGORIES, CATEGORY_COUNTS,
  filterTools, type ToolCategory,
} from "@/lib/tools";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

// ─── Sidebar category filter ───────────────────────────────────
type SidebarCategory = ToolCategory | "All";

const SIDEBAR_ITEMS: { label: SidebarCategory; count: number }[] = [
  { label: "All", count: TOOLS.length },
  ...TOOL_CATEGORIES.map((cat) => ({ label: cat as SidebarCategory, count: CATEGORY_COUNTS[cat] ?? 0 })),
];

// ─── Icons ────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg className="w-4 h-4 text-[#6B6B6B] shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="9" r="6" /><line x1="13.5" y1="13.5" x2="17" y2="17" />
    </svg>
  );
}

function ToolIcon({ category }: { category: string }) {
  const cls = "w-4 h-4 text-[#6B6B6B] shrink-0";
  switch (category) {
    case "Developer": return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="5 7 2 10 5 13" /><polyline points="15 7 18 10 15 13" /><line x1="11" y1="4" x2="9" y2="16" /></svg>;
    case "PDF":       return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 2h8l4 4v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" /><polyline points="12 2 12 6 16 6" /><line x1="7" y1="11" x2="13" y2="11" /><line x1="7" y1="14" x2="11" y2="14" /></svg>;
    case "Image":     return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="16" height="12" rx="2" /><circle cx="7" cy="9" r="1.5" /><polyline points="2 15 7 10 10 13 13 10 18 15" /></svg>;
    case "Text":      return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" y1="6" x2="16" y2="6" /><line x1="4" y1="10" x2="14" y2="10" /><line x1="4" y1="14" x2="11" y2="14" /></svg>;
    case "Converter": return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="4 7 4 4 16 4 16 7" /><line x1="10" y1="4" x2="10" y2="16" /><polyline points="7 13 10 16 13 13" /></svg>;
    default: return null;
  }
}

export function ToolsClient() {
  const [activeCategory, setActiveCategory] = useState<SidebarCategory>("All");
  const [query,          setQuery]          = useState("");

  const filtered = useMemo(
    () => filterTools(TOOLS, activeCategory, query),
    [activeCategory, query]
  );

  const headingLabel = activeCategory === "All"
    ? "All Free Online Tools — DevKit25"
    : `Free ${activeCategory} Tools Online — DevKit25`;

  function handleCategoryClick(cat: SidebarCategory) {
    setActiveCategory(cat);
    setQuery("");
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-col md:flex-row gap-10">

        {/* ══ Sidebar ══════════════════════════════════════════ */}
        <aside className="w-full md:w-[240px] md:shrink-0" aria-label="Browse by category">
            {/* Sticky wrapper to prevent layout shift when filters are applied | only sticks on desktop*/}
          <div className="md:sticky md:top-[72px]">
            <p className="text-[11px] font-[500] text-[#6B6B6B] uppercase tracking-[0.07em] leading-none mb-3">
              Browse by category
            </p>
            <nav aria-label="Tool categories">
              <ul className="flex flex-row md:flex-col gap-0.5 overflow-x-auto md:overflow-x-visible list-none p-0 m-0 pb-1 md:pb-0">
                {SIDEBAR_ITEMS.map(({ label, count }) => {
                  const active = activeCategory === label;
                  return (
                    <li key={label} className="shrink-0 md:shrink">
                      <button
                        onClick={() => handleCategoryClick(label)}
                        aria-current={active ? "true" : undefined}
                        className={cn(
                            // Base
                          "w-full flex items-center justify-between gap-3",
                          "px-3 py-2 rounded-[6px] md:rounded-none",
                          "text-[13px] leading-none transition-colors duration-100",
                          "md:border-l-2 md:rounded-none", // Left border only on desktop, to avoid clutter on mobile
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1",
                           active
                            ? [
                                "text-[#0A0A0A] font-[500]",
                                // Mobile: surface bg pill
                                "bg-[#F5F5F5] md:bg-transparent",
                                // Desktop: black left border
                                "md:border-l-[#0A0A0A]",
                              ]
                            : [
                                "text-[#6B6B6B] font-[400]",
                                "hover:text-[#0A0A0A]",
                                "bg-transparent hover:bg-[#F5F5F5] md:hover:bg-transparent",
                                "md:border-l-transparent",
                              ]
                        )}
                      >
                        <span>{label}</span>
                        <span className={cn("text-[11px] tabular-nums", active ? "text-[#6B6B6B]" : "text-[#9B9B9B]")}>
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* ══ Main area ════════════════════════════════════════ */}
        <div className="flex-1 min-w-0">

          {/* ── H1 with keyword ── */}
          <div className="flex items-baseline gap-2.5 mb-4">
            <h1 className="text-[28px] font-[500] text-[#0A0A0A] leading-none tracking-[-0.02em] m-0">
              {headingLabel}
            </h1>
            <span className="text-[14px] font-[400] text-[#6B6B6B] leading-none">
              ({filtered.length} {filtered.length === 1 ? "tool" : "tools"})
            </span>
          </div>

          {/* ── Search ── */}
          <div className="relative w-full mb-7">
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
              <SearchIcon />
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={activeCategory === "All" ? "Search all tools..." : `Search ${activeCategory} tools...`}
              aria-label={`Search ${activeCategory === "All" ? "all" : activeCategory} tools`}
              className={cn(
                "w-full h-9 pl-9 pr-4 rounded-[8px]",
                "border border-[#E5E5E5] bg-white",
                "text-[14px] font-[400] text-[#0A0A0A]",
                "placeholder:text-[#6B6B6B]",
                "outline-none focus:border-[#0A0A0A] transition-colors duration-100"
              )}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-3 flex items-center text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-100 focus-visible:outline-none"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="2" y1="2" x2="12" y2="12" /><line x1="12" y1="2" x2="2" y2="12" />
                </svg>
              </button>
            )}
          </div>

          {/* ── Grid ── */}
          {filtered.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 list-none p-0 m-0" aria-label="Tools list">
              {filtered.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    aria-label={`Open ${tool.name} — free online tool to ${tool.desc.toLowerCase()}`}
                    className={cn(
                      "group flex flex-col gap-3",
                      "bg-white border border-[#E5E5E5] rounded-[12px] p-4",
                      "transition-colors duration-100 hover:border-[#0A0A0A]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]",
                      "focus-visible:ring-offset-2 focus-visible:rounded-[12px]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-[6px] bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center shrink-0">
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
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-center border border-[#E5E5E5] rounded-[12px]">
              <div className="w-9 h-9 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center">
                <SearchIcon />
              </div>
              <p className="text-[14px] font-[500] text-[#0A0A0A] m-0">No tools found</p>
              <p className="text-[13px] font-[400] text-[#6B6B6B] m-0">
                Try a different search
                {activeCategory !== "All" && (
                  <> or <button onClick={() => handleCategoryClick("All")} className="underline underline-offset-2 text-[#0A0A0A] hover:no-underline">browse all categories</button></>
                )}
              </p>
              {(query || activeCategory !== "All") && (
                <button
                  onClick={() => { setQuery(""); setActiveCategory("All"); }}
                  className={cn("mt-1 h-8 px-4 rounded-full border border-[#E5E5E5] bg-white", "text-[13px] font-[500] text-[#0A0A0A] transition-colors duration-100 hover:border-[#0A0A0A]")}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}