import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title:       "About | DevKit25",
  description: "DevKit25 is a free collection of developer and productivity tools. No sign-up, no paywalls, no ads. Just tools that work.",
  alternates: {
    canonical: "https://25tools.vercel.app/about",
  },
};

// ─── Feature grid data ────────────────────────────────────────
const FEATURES = [
  {
    title: "25+ free tools",
    desc:  "Developer and productivity tools all in one place.",
  },
  {
    title: "No sign-up ever",
    desc:  "Just open a tool and use it immediately.",
  },
  {
    title: "Runs in your browser",
    desc:  "Most tools process your data client-side only.",
  },
  {
    title: "No file size limits",
    desc:  "Image and PDF tools run locally with no restrictions.",
  },
  {
    title: "Always free",
    desc:  "No freemium, no paywalls, no tricks. Ever.",
  },
  {
    title: "More tools coming",
    desc:  "New tools added regularly based on what people need.",
  },
] as const;

// ─── Tool icon (reused from homepage) ────────────────────────
function ToolIcon({ category }: { category: string }) {
  const cls = "w-4 h-4 text-[#6B6B6B] shrink-0";
  switch (category) {
    case "Developer":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="5 7 2 10 5 13" />
          <polyline points="15 7 18 10 15 13" />
          <line x1="11" y1="4" x2="9" y2="16" />
        </svg>
      );
    case "PDF":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 2h8l4 4v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" />
          <polyline points="12 2 12 6 16 6" />
          <line x1="7" y1="11" x2="13" y2="11" />
          <line x1="7" y1="14" x2="11" y2="14" />
        </svg>
      );
    case "Image":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="16" height="12" rx="2" />
          <circle cx="7" cy="9" r="1.5" />
          <polyline points="2 15 7 10 10 13 13 10 18 15" />
        </svg>
      );
    case "Text":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="4" y1="6"  x2="16" y2="6"  />
          <line x1="4" y1="10" x2="14" y2="10" />
          <line x1="4" y1="14" x2="11" y2="14" />
        </svg>
      );
    case "Converter":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="4 7 4 4 16 4 16 7" />
          <line x1="10" y1="4" x2="10" y2="16" />
          <polyline points="7 13 10 16 13 13" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Page ─────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 flex flex-col gap-16">

      {/* ══ 1. Header ═════════════════════════════════════════ */}
      <section className="flex flex-col gap-5">
        <p className="text-[11px] font-[500] text-[#6B6B6B] uppercase tracking-[0.08em] leading-none m-0">
          About DevKit25
        </p>
        <h1 className="text-[40px] font-[500] text-[#0A0A0A] leading-[1.05] tracking-[-0.03em] m-0 text-balance">
          Free tools, no strings attached.
        </h1>
        <p className="text-[18px] font-[400] text-[#6B6B6B] leading-relaxed m-0 max-w-none">
          Built for developers, designers and anyone who just needs to get
          things done.
        </p>
      </section>

      {/* ══ 2. Mission ════════════════════════════════════════ */}
      <section className="flex flex-col gap-5 pb-16 border-b border-[#E5E5E5]">
        <h2 className="text-[22px] font-[500] text-[#0A0A0A] leading-snug tracking-[-0.02em] m-0">
          Why DevKit25 exists
        </h2>
        <div className="flex flex-col gap-4">
          <p className="text-[15px] font-[400] text-[#6B6B6B] leading-relaxed m-0 max-w-none">
            Most tool sites lock basic utilities behind sign-up walls, subscription
            paywalls, or bury them under so many ads they become unusable. A JSON
            formatter shouldn&apos;t require an account. An image compressor shouldn&apos;t
            ask for your email address. These are simple utilities — they should
            just work.
          </p>
          <p className="text-[15px] font-[400] text-[#6B6B6B] leading-relaxed m-0 max-w-none">
            DevKit25 is different. Every tool is completely free, loads instantly,
            and requires no account of any kind. Most tools — including the image
            compressor, PDF merger, and all text tools — run entirely in your
            browser using client-side code. Your files and data{" "}
            <span className="text-[#0A0A0A] font-[500]">never leave your device.</span>
          </p>
          <p className="text-[15px] font-[400] text-[#6B6B6B] leading-relaxed m-0 max-w-none">
            This started as a personal project — a collection of tools I kept
            reaching for and couldn&apos;t find in one clean, fast, no-nonsense place.
            If it helps even a few people get things done faster, it&apos;s done its job.
          </p>
        </div>
      </section>

      {/* ══ 3. What you get ═══════════════════════════════════ */}
      <section className="flex flex-col gap-6">
        <h2 className="text-[22px] font-[500] text-[#0A0A0A] leading-snug tracking-[-0.02em] m-0">
          What&apos;s inside
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FEATURES.map(({ title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-1.5 p-4 rounded-[10px] border border-[#E5E5E5] bg-white"
            >
              <p className="text-[14px] font-[500] text-[#0A0A0A] leading-none m-0 tracking-[-0.01em]">
                {title}
              </p>
              <p className="text-[13px] font-[400] text-[#6B6B6B] leading-snug m-0 max-w-none">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 4. Tools grid ═════════════════════════════════════ */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-[22px] font-[500] text-[#0A0A0A] leading-snug tracking-[-0.02em] m-0">
            All tools, free forever
          </h2>
          <p className="text-[14px] font-[400] text-[#6B6B6B] leading-none m-0">
            Click any tool to use it instantly.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 list-none p-0 m-0">
          {TOOLS.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tools/${tool.slug}`}
                className={cn(
                  "group flex flex-col gap-3",
                  "bg-white border border-[#E5E5E5]",
                  "rounded-[12px] p-4",
                  "transition-colors duration-100 hover:border-[#0A0A0A]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]",
                  "focus-visible:ring-offset-2 focus-visible:rounded-[12px]"
                )}
              >
                {/* Top row */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-[6px] bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center shrink-0">
                    <ToolIcon category={tool.category} />
                  </div>
                  <span className="text-[14px] font-[500] text-[#0A0A0A] leading-snug tracking-[-0.01em] flex-1 min-w-0 truncate">
                    {tool.name}
                  </span>
                  <Badge variant={tool.free ? "free" : "pro"} />
                </div>

                {/* Description */}
                <p className="text-[13px] font-[400] text-[#6B6B6B] leading-snug m-0 max-w-none">
                  {tool.desc}
                </p>

                {/* Footer row */}
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
      </section>

      {/* ══ 5. Footer CTA ═════════════════════════════════════ */}
      <section className="flex flex-col items-center gap-4 text-center pt-4 pb-2">
        <div className="w-px h-12 bg-[#E5E5E5]" />
        <h2 className="text-[22px] font-[500] text-[#0A0A0A] leading-snug tracking-[-0.02em] m-0">
          Have a tool suggestion?
        </h2>
        <p className="text-[15px] font-[400] text-[#6B6B6B] leading-relaxed m-0 max-w-sm">
          I&apos;m always looking to add tools people actually need. Reach out
          anytime.
        </p>
        <a
          href="mailto:hello@25tools.dpdns.org"
          className={cn(
            "inline-flex items-center justify-center",
            "h-9 px-5 rounded-full mt-1",
            "bg-[#0A0A0A] text-white",
            "text-[13px] font-[500] leading-none",
            "transition-colors duration-100 hover:bg-[#1a1a1a]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
          )}
        >
          Suggest a Tool
        </a>
      </section>

    </div>
  );
}