import type { Metadata } from "next";
import { TOOLS} from "@/lib/tools";
import { CategoryPageShell } from "@/components/tools/CategoryPageShell";
import { BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title:       "Free Online Text Tools — 25tools | No Sign-up",
  description: "Free text tools online. Count words and characters, convert text case, generate passwords and more. No sign-up, instant results in your browser.",
  keywords:    ["free online text tools","text tools online free","word counter online free","text converter online","25tools text tools"],
  alternates:  { canonical: `${BASE_URL}/tools/text` },
  openGraph: {
    title:       "Free Online Text Tools — 25tools",
    description: "Free text tools online. No sign-up, instant results in your browser.",
    url:         `${BASE_URL}/tools/text`,
    siteName:    "25tools",
  },
};

const textTools = TOOLS.filter(
  (t) => t.category === "Text" || t.slug === "password-generator" || t.slug === "markdown-to-html"
);

export default function TextToolsPage() {
  return (
    <CategoryPageShell
      heading="Free Online Text Tools — 25tools"
      intro="25tools text tools work instantly in your browser with no sign-up needed. Count words and characters, convert between text cases, generate strong passwords, and convert Markdown to HTML — simple tools that just work."
      tools={textTools}
      breadcrumbLabel="Text Tools"
      breadcrumbSlug="text"
      schemaId="text"
    />
  );
}