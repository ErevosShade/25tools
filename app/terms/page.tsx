import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:       "Terms of Use | 25tools",
  description: "Terms of use for 25tools.vercel.app — free tools provided as-is, no warranty.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14">

      {/* ── Header ── */}
      <div className="mb-10 pb-8 border-b border-[#E5E5E5]">
        <p className="text-[12px] font-[500] text-[#6B6B6B] uppercase tracking-[0.07em] leading-none m-0 mb-3">
          Legal
        </p>
        <h1 className="text-[32px] font-[500] text-[#0A0A0A] leading-none tracking-[-0.02em] m-0 mb-4">
          Terms of Use
        </h1>
        <p className="text-[14px] font-[400] text-[#6B6B6B] leading-none m-0">
          Last updated: April 19, 2025
        </p>
      </div>

      {/* ── Intro ── */}
      <div className="mb-8">
        <p className="text-[15px] font-[400] text-[#0A0A0A] leading-relaxed m-0">
          These Terms of Use govern your access to and use of{" "}
          <strong className="font-[500]">25tools</strong> at{" "}
          <a
            href="https://25tools.vercel.app/"
            className="text-[#0A0A0A] underline underline-offset-3 hover:no-underline transition-all duration-100"
          >
            25tools.vercel.app
          </a>
          {" "}(&ldquo;the Site&rdquo;), operated by DevKit25. By using the Site you agree to
          these terms. If you do not agree, please do not use the Site.
        </p>
      </div>

      {/* ── Sections ── */}
      <div className="flex flex-col gap-8">

        <Section title="1. Free service, provided as-is">
          <p>
            All tools on 25tools are provided <strong className="font-[500]">free of charge</strong>,
            with no subscription, no payment, and no account required.
          </p>
          <p>
            The Site and all tools are provided <strong className="font-[500]">&ldquo;as-is&rdquo;</strong> and
            &ldquo;as available&rdquo; without warranty of any kind, either express or implied,
            including but not limited to warranties of merchantability, fitness for a
            particular purpose, or non-infringement. We do not guarantee that the
            Site will be available, error-free, or produce accurate results at all times.
          </p>
        </Section>

        <Section title="2. Acceptable use">
          <p>
            You agree to use 25tools only for lawful purposes. You must not use the
            Site to upload, process, or transmit any content that:
          </p>
          <ul className="flex flex-col gap-2 m-0 pl-5 list-disc marker:text-[#D0D0D0]">
            {[
              "Is illegal under applicable law",
              "Infringes the intellectual property rights of any third party",
              "Contains malware, viruses, or other harmful code",
              "Violates the privacy of others",
              "Is used to harass, abuse, or harm any individual or group",
            ].map((item) => (
              <li key={item} className="text-[14px] font-[400] text-[#6B6B6B] leading-relaxed pl-1">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="3. File size and usage limits">
          <p>
            To ensure fair access for all users, the following limits apply:
          </p>
          <div className="flex flex-col gap-0 border border-[#E5E5E5] rounded-[8px] overflow-hidden">
            {[
              { label: "Max file size per upload", value: "5 MB" },
              { label: "Max files per batch",      value: "10 files" },
              { label: "Supported image formats",  value: "JPG, PNG, WebP" },
              { label: "Supported document formats", value: "PDF" },
            ].map(({ label, value }, i, arr) => (
              <div
                key={label}
                className={`flex items-center justify-between px-4 py-3 ${
                  i < arr.length - 1 ? "border-b border-[#E5E5E5]" : ""
                }`}
              >
                <span className="text-[13px] font-[400] text-[#6B6B6B]">{label}</span>
                <span className="text-[13px] font-[500] text-[#0A0A0A]">{value}</span>
              </div>
            ))}
          </div>
          <p>
            We reserve the right to rate limit or temporarily block access from IP
            addresses that make an unusually high number of requests in a short
            period, in order to protect service availability for all users.
          </p>
        </Section>

        <Section title="4. No responsibility for data loss">
          <p>
            Files processed by 25tools are handled transiently and are not stored
            on our servers after processing. However, we strongly recommend that you
            always <strong className="font-[500]">keep backups of any files</strong> before
            uploading them for processing.
          </p>
          <p>
            We are not responsible for any data loss, corruption, or damage to files
            that may occur during or after use of any tool on this Site. Use of all
            tools is entirely at your own risk.
          </p>
        </Section>

        <Section title="5. Intellectual property">
          <p>
            All content, code, and design on 25tools is the property of DevKit25
            unless otherwise noted. You may not reproduce, redistribute, or create
            derivative works from the Site without explicit written permission.
          </p>
          <p>
            You retain full ownership of any files you upload. We claim no rights
            over your content.
          </p>
        </Section>

        <Section title="6. Limitation of liability">
          <p>
            To the fullest extent permitted by law, DevKit25 shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages
            arising out of or relating to your use of the Site, even if we have been
            advised of the possibility of such damages.
          </p>
          <p>
            Our total liability to you for any claim arising out of or relating to
            these Terms or your use of the Site shall not exceed zero, reflecting the
            fact that the service is provided entirely free of charge.
          </p>
        </Section>

        <Section title="7. Changes to these terms">
          <p>
            We may update these Terms of Use at any time. Changes will be posted on
            this page with an updated &ldquo;Last updated&rdquo; date. Continued use of the
            Site after changes are posted constitutes your acceptance of the revised
            terms.
          </p>
        </Section>

        <Section title="8. Contact">
          <p>
            For any questions about these Terms of Use, please contact us at{" "}
            <a
              href="mailto:hello@25tools.vercel.app"
              className="text-[#0A0A0A] underline underline-offset-3 hover:no-underline"
            >
              hello@25tools.vercel.app
            </a>
            .
          </p>
        </Section>

      </div>

      {/* ── Footer nav ── */}
      <div className="mt-12 pt-8 border-t border-[#E5E5E5] flex items-center gap-4">
        <Link
          href="/privacy"
          className="text-[13px] font-[400] text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-100 underline underline-offset-3 hover:no-underline"
        >
          Privacy Policy →
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