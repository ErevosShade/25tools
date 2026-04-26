"use client";

import { useState }  from "react";
import Link          from "next/link";
import Script        from "next/script";
import { Badge }     from "@/components/ui/Badge";
import { cn }        from "@/lib/utils";
import { jsonLd }    from "@/lib/jsonLd";
import { TOOLS} from "@/lib/tools";
import { BASE_URL } from "@/lib/constants";

// ─── Category → landing page map ─────────────────────────────
const CATEGORY_ROUTES: Record<string, string> = {
  Developer: "/tools/developer",
  PDF:       "/tools/pdf",
  Image:     "/tools/image",
  Text:      "/tools/text",
  Converter: "/tools/text", // fallback
};

interface RelatedTool {
  name: string;
  slug: string;
  desc: string;
}

interface ToolPageWrapperProps {
  toolName:     string;
  description:  string;
  category:     string;
  isFree:       boolean;
  children:     React.ReactNode;
  relatedTools?: RelatedTool[];
  howItWorks?:  string[];
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cn("w-4 h-4 text-[#6B6B6B] shrink-0 transition-transform duration-200", open && "rotate-180")}
      viewBox="0 0 16 16" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      <polyline points="4 6 8 10 12 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="2" y1="7" x2="12" y2="7" /><polyline points="8 3 12 7 8 11" />
    </svg>
  );
}

export function ToolPageWrapper({
  toolName, description, category, isFree,
  children, relatedTools, howItWorks,
}: ToolPageWrapperProps) {
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [openFaqIndex,   setOpenFaqIndex]   = useState<number | null>(null);

  const toolData = TOOLS.find((t) => t.name.toLowerCase() === toolName.toLowerCase());

  const softwareSchema  = toolData ? jsonLd(toolData) : null;

  const breadcrumbSchema = toolData ? {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",  item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: toolData.name, item: `${BASE_URL}/tools/${toolData.slug}` },
    ],
  } : null;

  const faqSchema = toolData?.faqs?.length ? {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: toolData.faqs.map((faq) => ({
      "@type":        "Question",
      name:           faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;

  const categoryHref = CATEGORY_ROUTES[category] ?? "/tools";
  const categoryLabel = `${category} Tools`;

  return (
    <>
      {softwareSchema && (
        <Script id={`json-ld-tool-${toolData?.slug}`} type="application/ld+json" strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      )}
      {breadcrumbSchema && (
        <Script id={`json-ld-breadcrumb-${toolData?.slug}`} type="application/ld+json" strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      )}
      {faqSchema && (
        <Script id={`json-ld-faq-${toolData?.slug}`} type="application/ld+json" strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="mx-auto max-w-3xl px-5 py-10 flex flex-col gap-8">

        {/* ══ 1. Breadcrumb ════════════════════════════════════ */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 list-none p-0 m-0 flex-wrap">
            <li>
              <Link href="/tools" className="text-[13px] font-[400] text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-100 leading-none">
                Tools
              </Link>
            </li>
            <li aria-hidden="true"><span className="text-[13px] text-[#D0D0D0] leading-none select-none">›</span></li>
            <li>
              {/* Category now links to category landing page */}
              <Link
                href={categoryHref}
                className="text-[13px] font-[400] text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-100 leading-none"
              >
                {categoryLabel}
              </Link>
            </li>
            <li aria-hidden="true"><span className="text-[13px] text-[#D0D0D0] leading-none select-none">›</span></li>
            <li aria-current="page">
              <span className="text-[13px] font-[400] text-[#0A0A0A] leading-none">{toolName}</span>
            </li>
          </ol>
        </nav>

        {/* ══ 2. Header ════════════════════════════════════════ */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h1 className="text-[32px] font-[500] text-[#0A0A0A] leading-none tracking-[-0.02em] m-0">
              {toolName}
            </h1>
            <Badge variant={isFree ? "free" : "pro"} />
          </div>
          <p className="text-[16px] font-[400] text-[#6B6B6B] leading-relaxed m-0 max-w-none">
            {description}
          </p>
        </div>

        {/* ══ 3. Main content ══════════════════════════════════ */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
          {children}
        </div>

        {/* ══ 4. How it works ══════════════════════════════════ */}
        {howItWorks && howItWorks.length > 0 && (
          <div className="border border-[#E5E5E5] rounded-[12px] overflow-hidden">
            <button
              type="button"
              onClick={() => setHowItWorksOpen((v) => !v)}
              aria-expanded={howItWorksOpen}
              aria-controls="how-it-works-body"
              className={cn(
                "w-full flex items-center justify-between gap-3 px-5 py-4 text-left",
                "transition-colors duration-100 hover:bg-[#F5F5F5]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0A0A0A]",
                howItWorksOpen && "border-b border-[#E5E5E5]"
              )}
            >
              <h2 className="text-[14px] font-[500] text-[#0A0A0A] leading-none m-0">How it works</h2>
              <ChevronIcon open={howItWorksOpen} />
            </button>
            <div
              id="how-it-works-body"
              role="region"
              aria-label="How it works steps"
              className={cn("grid transition-all duration-200 ease-in-out", howItWorksOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
            >
              <div className="overflow-hidden">
                <ol className="list-none p-0 m-0 px-5 py-5 flex flex-col gap-0">
                  {howItWorks.map((step, index) => {
                    const isLast = index === howItWorks.length - 1;
                    return (
                      <li key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 rounded-full bg-[#0A0A0A] flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[11px] font-[500] text-white leading-none tabular-nums">{index + 1}</span>
                          </div>
                          {!isLast && <div className="w-px flex-1 bg-[#E5E5E5] my-2" />}
                        </div>
                        <div className={cn("flex-1 min-w-0", !isLast && "pb-5")}>
                          <p className="text-[14px] font-[400] text-[#0A0A0A] leading-relaxed m-0 max-w-none">{step}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* ══ 5. FAQ accordion ═════════════════════════════════ */}
        {toolData?.faqs && toolData.faqs.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-[500] text-[#6B6B6B] uppercase tracking-[0.07em] leading-none m-0">
              Frequently asked questions
            </p>
            <div className="border border-[#E5E5E5] rounded-[12px] overflow-hidden divide-y divide-[#E5E5E5]">
              {toolData.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index}>
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className={cn(
                        "w-full flex items-center justify-between gap-4 px-5 py-4 text-left",
                        "transition-colors duration-100 hover:bg-[#F5F5F5]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0A0A0A]"
                      )}
                    >
                      <h3 className="text-[14px] font-[500] text-[#0A0A0A] leading-snug m-0 flex-1">{faq.question}</h3>
                      <ChevronIcon open={isOpen} />
                    </button>
                    <div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-label={faq.question}
                      className={cn("grid transition-all duration-200 ease-in-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[14px] font-[400] text-[#6B6B6B] leading-relaxed m-0 max-w-none px-5 pb-4">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ 6. Related tools ══════════════════════════════════ */}
        {relatedTools && relatedTools.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-[500] text-[#6B6B6B] uppercase tracking-[0.07em] leading-none m-0">
              Related tools
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedTools.slice(0, 3).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  // Descriptive keyword-rich anchor text for SEO
                  aria-label={`${tool.name} — free online tool to ${tool.desc.toLowerCase()}`}
                  className={cn(
                    "group flex flex-col gap-2 bg-white border border-[#E5E5E5] rounded-[10px] p-4",
                    "transition-colors duration-100 hover:border-[#0A0A0A]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 focus-visible:rounded-[10px]"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    {/* Keyword-rich visible anchor text */}
                    <span className="text-[13px] font-[500] text-[#0A0A0A] leading-snug tracking-[-0.01em] truncate">
                      {tool.name} — free online
                    </span>
                    <span className="text-[#6B6B6B] group-hover:text-[#0A0A0A] transition-colors duration-100 shrink-0">
                      <ArrowIcon />
                    </span>
                  </div>
                  <p className="text-[12px] font-[400] text-[#6B6B6B] leading-snug m-0 max-w-none line-clamp-2">
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ══ 7. Bottom "More tools" link ═══════════════════════ */}
        <div className="flex items-center justify-center pt-2 border-t border-[#E5E5E5]">
          <Link
            href="/tools"
            className="text-[13px] font-[400] text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-100 leading-none"
          >
            More free tools →
          </Link>
        </div>

      </div>
    </>
  );
}