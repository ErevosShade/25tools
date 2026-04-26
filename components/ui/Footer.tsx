import Link from "next/link";
import { cn } from "@/lib/utils";

type FooterLink =
  | { label: string; href: string; external?: false }
  | { label: string; href: string; external: true };

type FooterColumn = { heading: string; links: FooterLink[] };

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Tools",     href: "/tools"     },
      { label: "About",     href: "/about"     },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use",   href: "/terms"   },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Twitter / X", href: "https://twitter.com", external: true },
      { label: "GitHub",      href: "https://github.com",  external: true },
    ],
  },
];

const linkClass = cn(
  "text-[13px] font-[400] text-[#6B6B6B]",
  "transition-colors duration-100 hover:text-[#0A0A0A]",
  "leading-none w-fit"
);

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#E5E5E5]">

      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading} className="flex flex-col gap-4">
              <p className="text-[12px] font-[500] text-[#0A0A0A] uppercase tracking-[0.06em] leading-none m-0">
                {column.heading}
              </p>
              <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external === true ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {link.label}
                        <span className="sr-only">(opens in new tab)</span>
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E5E5E5]">
        <div className="mx-auto max-w-6xl px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Link href="/" className="flex items-center gap-1.5 group">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] group-hover:scale-125 transition-transform duration-150" />
              <span className="text-[13px] font-[500] text-[#0A0A0A] leading-none tracking-[-0.01em]">25tools</span>
            </Link>
            <p className="text-[12px] font-[400] text-[#9B9B9B] leading-none m-0">
              20 free tools. No sign-up. No limits.
            </p>
          </div>
          <p className="text-[12px] font-[400] text-[#9B9B9B] m-0 text-center sm:text-right">
            &copy; 2025 25tools. Built for the web, free for everyone.
          </p>
        </div>
      </div>

    </footer>
  );
}