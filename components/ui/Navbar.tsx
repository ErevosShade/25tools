"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
] as const;

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E5E5E5]">
        <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="text-[16px] font-[500] text-[#0A0A0A] leading-none tracking-[-0.02em] shrink-0"
          >
            25tools
          </Link>

          {/* ── Center nav (desktop) ── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3 py-1.5 rounded-md",
                  "text-[14px] font-[400] leading-none",
                  "transition-colors duration-100",
                  pathname === href
                    ? "text-[#0A0A0A]"
                    : "text-[#6B6B6B] hover:text-[#0A0A0A]"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Right slot ── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Placeholder for future right-aligned items (e.g. theme toggle) */}
            {/* Hamburger (mobile only) */}
            <button
              type="button"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => setDrawerOpen((v) => !v)}
              className={cn(
                "md:hidden flex flex-col justify-center items-center",
                "w-8 h-8 gap-[5px] rounded-md",
                "text-[#0A0A0A]",
                "transition-colors duration-100 hover:bg-[#F5F5F5]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1"
              )}
            >
              <span className={cn(
                "block w-[18px] h-[1.5px] bg-current rounded-full transition-transform duration-200 origin-center",
                drawerOpen && "translate-y-[6.5px] rotate-45"
              )} />
              <span className={cn(
                "block w-[18px] h-[1.5px] bg-current rounded-full transition-opacity duration-200",
                drawerOpen && "opacity-0"
              )} />
              <span className={cn(
                "block w-[18px] h-[1.5px] bg-current rounded-full transition-transform duration-200 origin-center",
                drawerOpen && "-translate-y-[6.5px] -rotate-45"
              )} />
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        aria-hidden={!drawerOpen}
        onClick={() => setDrawerOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/20 transition-opacity duration-200",
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* ── Mobile drawer ── */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        className={cn(
          "fixed top-14 left-0 right-0 z-40",
          "bg-white border-b border-[#E5E5E5]",
          "transition-all duration-200 ease-in-out md:hidden",
          drawerOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <nav className="flex flex-col px-5 py-3" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "py-3 border-b border-[#E5E5E5] last:border-none",
                "text-[14px] font-[400] leading-none",
                "transition-colors duration-100",
                pathname === href
                  ? "text-[#0A0A0A]"
                  : "text-[#6B6B6B] hover:text-[#0A0A0A]"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}