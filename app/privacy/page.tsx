import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:       "Privacy Policy | 25tools",
  description: "Privacy policy for 25tools.dpdns.org — we collect no personal data and require no accounts.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14">

      {/* ── Header ── */}
      <div className="mb-10 pb-8 border-b border-[#E5E5E5]">
        <p className="text-[12px] font-[500] text-[#6B6B6B] uppercase tracking-[0.07em] leading-none m-0 mb-3">
          Legal
        </p>
        <h1 className="text-[32px] font-[500] text-[#0A0A0A] leading-none tracking-[-0.02em] m-0 mb-4">
          Privacy Policy
        </h1>
        <p className="text-[14px] font-[400] text-[#6B6B6B] leading-none m-0">
          Last updated: April 19, 2025
        </p>
      </div>

      {/* ── Intro ── */}
      <div className="prose-section mb-8">
        <p className="text-[15px] font-[400] text-[#0A0A0A] leading-relaxed m-0">
          This Privacy Policy explains how <strong className="font-[500]">25tools</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;),
          operated at{" "}
          <a
            href="https://25tools.dpdns.org"
            className="text-[#0A0A0A] underline underline-offset-3 hover:no-underline transition-all duration-100"
          >
            25tools.dpdns.org
          </a>
          , handles information when you use our free online tools. The short version:{" "}
          <strong className="font-[500]">we collect no personal data.</strong>
        </p>
      </div>

      {/* ── Sections ── */}
      <div className="flex flex-col gap-8">

        <Section title="1. No personal data collected">
          <p>
            We do not collect, store, or process any personal information. There are
            no user accounts, no registration forms, no login screens, and no
            payment processing of any kind on this site.
          </p>
          <p>
            Files you upload to tools such as the Image Compressor or PDF Merger are
            processed entirely within your browser session or transiently on our
            servers and are <strong className="font-[500]">never stored, logged, or retained</strong> after
            the request completes.
          </p>
        </Section>

        <Section title="2. Server logs">
          <p>
            Our hosting infrastructure may temporarily record standard server log
            data — including IP addresses, request timestamps, and HTTP status codes —
            for security monitoring and rate limiting purposes only. This data is not
            linked to any individual identity, is not sold or shared with third
            parties, and is automatically purged on a rolling basis.
          </p>
        </Section>

        <Section title="3. Cookies and tracking">
          <p>
            We currently use <strong className="font-[500]">no cookies</strong> and no
            client-side tracking scripts. We do not use Google Analytics, Meta Pixel,
            or any other advertising or behavioural tracking technology.
          </p>
          <p>
            We may in future add{" "}
            <a
              href="https://plausible.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A0A0A] underline underline-offset-3 hover:no-underline"
            >
              Plausible Analytics
            </a>
            {" "}— a privacy-respecting, cookie-free analytics tool that collects only
            aggregate page view counts with no personal identifiers. If we do, this
            policy will be updated before it is enabled.
          </p>
        </Section>

        <Section title="4. Third-party services">
          <p>
            25tools is hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A0A0A] underline underline-offset-3 hover:no-underline"
            >
              Vercel
            </a>
            . By using this site your requests are routed through Vercel&apos;s
            infrastructure. Please review{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A0A0A] underline underline-offset-3 hover:no-underline"
            >
              Vercel&apos;s Privacy Policy
            </a>
            {" "}for details on how they handle infrastructure-level data.
          </p>
        </Section>

        <Section title="5. Children's privacy">
          <p>
            25tools does not knowingly collect any information from children under
            the age of 13. The site contains no advertising and no account system,
            and is designed to be safe for general use.
          </p>
        </Section>

        <Section title="6. Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time. Any changes will be
            reflected on this page with an updated &ldquo;Last updated&rdquo; date at the top.
            We encourage you to review this page periodically.
          </p>
        </Section>

        <Section title="7. Contact">
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a
              href="mailto:hello@25tools.dpdns.org"
              className="text-[#0A0A0A] underline underline-offset-3 hover:no-underline"
            >
              hello@25tools.dpdns.org
            </a>
            .
          </p>
        </Section>

      </div>

      {/* ── Footer nav ── */}
      <div className="mt-12 pt-8 border-t border-[#E5E5E5] flex items-center gap-4">
        <Link
          href="/terms"
          className="text-[13px] font-[400] text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-100 underline underline-offset-3 hover:no-underline"
        >
          Terms of Use →
        </Link>
        <Link
          href="/tools"
          className="text-[13px] font-[400] text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-100 underline underline-offset-3 hover:no-underline"
        >
          Browse tools →
        </Link>
      </div>

    </div>
  );
}

// ─── Section component ────────────────────────────────────────
function Section({
  title,
  children,
}: {
  title:    string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[16px] font-[500] text-[#0A0A0A] leading-snug tracking-[-0.01em] m-0">
        {title}
      </h2>
      <div className="flex flex-col gap-3 [&>p]:text-[14px] [&>p]:font-[400] [&>p]:text-[#6B6B6B] [&>p]:leading-relaxed [&>p]:m-0 [&>p]:max-w-none">
        {children}
      </div>
    </section>
  );
}
