import Link from "next/link";
import Script from "next/script";
import { Badge } from "@/components/ui/Badge";
import { type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { BASE_URL } from "@/lib/constants";

interface CategoryPageShellProps {
  heading:       string;
  intro:         string;
  tools:         Tool[];
  breadcrumbLabel: string;
  breadcrumbSlug:  string;
  schemaId:      string;
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

export function CategoryPageShell({
  heading, intro, tools, breadcrumbLabel, breadcrumbSlug, schemaId,
}: CategoryPageShellProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",  item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: breadcrumbLabel, item: `${BASE_URL}/tools/${breadcrumbSlug}` },
    ],
  };

  return (
    <>
      <Script
        id={`json-ld-breadcrumb-${schemaId}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-4xl px-5 py-12 flex flex-col gap-10">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 list-none p-0 m-0 flex-wrap">
            <li>
              <Link href="/tools" className="text-[13px] font-[400] text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-100 leading-none">
                Tools
              </Link>
            </li>
            <li aria-hidden="true"><span className="text-[13px] text-[#D0D0D0] select-none">›</span></li>
            <li aria-current="page">
              <span className="text-[13px] font-[400] text-[#0A0A0A] leading-none">{breadcrumbLabel}</span>
            </li>
          </ol>
        </nav>

        {/* ── Header ── */}
        <div className="flex flex-col gap-4">
          <h1 className="text-[36px] font-[500] text-[#0A0A0A] leading-[1.1] tracking-[-0.03em] m-0 text-balance">
            {heading}
          </h1>
          <p className="text-[16px] font-[400] text-[#6B6B6B] leading-relaxed m-0 max-w-2xl max-w-none">
            {intro}
          </p>
        </div>

        {/* ── Tool grid ── */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 list-none p-0 m-0" aria-label={`${breadcrumbLabel} tools`}>
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tools/${tool.slug}`}
                aria-label={`Open ${tool.name} — free online tool to ${tool.desc.toLowerCase()}`}
                className={cn(
                  "group flex flex-col gap-3 bg-white border border-[#E5E5E5] rounded-[12px] p-4",
                  "transition-colors duration-100 hover:border-[#0A0A0A]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 focus-visible:rounded-[12px]"
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
                <p className="text-[13px] font-[400] text-[#6B6B6B] leading-snug m-0 max-w-none">{tool.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-1">
                  <span className="text-[11px] font-[500] text-[#6B6B6B] uppercase tracking-[0.05em] leading-none">{tool.category}</span>
                  <span className="text-[12px] text-[#6B6B6B] group-hover:text-[#0A0A0A] transition-colors duration-100 leading-none">Open →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Bottom link ── */}
        <div className="flex items-center justify-center pt-4 border-t border-[#E5E5E5]">
          <Link href="/tools" className="text-[13px] font-[400] text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-100 leading-none">
            View all {`${tools.length}`} free tools →
          </Link>
        </div>

      </div>
    </>
  );
}