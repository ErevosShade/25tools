"use client";

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:  "404 — Page Not Found | DevKit25",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-24 text-center">

      {/* 404 number */}
      <p className="text-[80px] font-[500] text-[#E5E5E5] leading-none m-0 select-none tabular-nums">
        404
      </p>

      {/* Heading */}
      <h1 className="text-[24px] font-[500] text-[#0A0A0A] leading-snug tracking-[-0.02em] m-0 mt-4">
        Page not found
      </h1>

      {/* Subtext */}
      <p className="text-[15px] font-[400] text-[#6B6B6B] leading-relaxed m-0 mt-3 max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>

      {/* CTA */}
      <Link
        href="/tools"
        className="inline-flex items-center justify-center mt-8 h-9 px-5 rounded-full bg-[#0A0A0A] text-white text-[13px] font-[500] leading-none transition-colors duration-100 hover:bg-[#1a1a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
      >
        Browse all tools
      </Link>

      {/* Back link */}
      <button
        onClick={() => window.history.back()}
        className="mt-4 text-[13px] font-[400] text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-100 underline underline-offset-2 hover:no-underline"
      >
        ← Go back
      </button>

    </div>
  );
}