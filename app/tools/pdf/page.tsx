import type { Metadata } from "next";
import { TOOLS } from "@/lib/tools";
import { CategoryPageShell } from "@/components/tools/CategoryPageShell";
import { BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title:       "Free Online PDF Tools — 25tools | No Sign-up",
  description: "4 free PDF tools online. Merge PDFs, remove pages with PageTrim, convert images to PDF and Word to PDF. No sign-up, no file size limit, runs in browser.",
  keywords:    ["free online pdf tools","pdf tools online free","pdf editor online free","online pdf tools no sign up","25tools pdf tools"],
  alternates:  { canonical: `${BASE_URL}/tools/pdf` },
  openGraph: {
    title:       "Free Online PDF Tools — 25tools",
    description: "4 free PDF tools online. No sign-up, no file size limit, runs in browser.",
    url:         `${BASE_URL}/tools/pdf`,
    siteName:    "25tools",
  },
};

const pdfTools = TOOLS.filter((t) => t.category === "PDF");

export default function PdfToolsPage() {
  return (
    <CategoryPageShell
      heading="Free Online PDF Tools — 25tools"
      intro="Work with PDFs entirely in your browser — free, instant and with no file size limits. 25tools gives you 4 essential PDF tools: merge files, remove pages with PageTrim, convert images to PDF and turn Word documents into PDFs, all without uploading anything to a server."
      tools={pdfTools}
      breadcrumbLabel="PDF Tools"
      breadcrumbSlug="pdf"
      schemaId="pdf"
    />
  );
}