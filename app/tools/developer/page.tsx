import type { Metadata } from "next";
import { TOOLS} from "@/lib/tools";
import { CategoryPageShell } from "@/components/tools/CategoryPageShell";
import { BASE_URL } from "@/lib/constants";
export const metadata: Metadata = {
  title:       "Free Online Developer Tools — 25tools | No Sign-up",
  description: "10 free online developer tools. JSON formatter, JWT decoder, UUID generator, regex tester, Base64 encoder and more. No sign-up, instant, in your browser.",
  keywords:    ["free online developer tools","developer tools online free","web developer tools online","coding tools online free","25tools developer tools"],
  alternates:  { canonical: `${BASE_URL}/tools/developer` },
  openGraph: {
    title:       "Free Online Developer Tools — 25tools",
    description: "10 free online developer tools. No sign-up, instant, in your browser.",
    url:         `${BASE_URL}/tools/developer`,
    siteName:    "25tools",
  },
};

const devTools = TOOLS.filter((t) => t.category === "Developer");

export default function DeveloperToolsPage() {
  return (
    <CategoryPageShell
      heading="Free Online Developer Tools — 25tools"
      intro="25tools gives developers instant access to 10 free online tools — no sign-up, no install, no limits. From JSON formatting and JWT decoding to UUID generation and regex testing, every tool runs directly in your browser so your data never leaves your device."
      tools={devTools}
      breadcrumbLabel="Developer Tools"
      breadcrumbSlug="developer"
      schemaId="developer"
    />
  );
}