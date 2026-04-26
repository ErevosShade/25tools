import type { Metadata } from "next";
import { ToolsClient } from "./ToolsClient";

export const metadata: Metadata = {
  title:       "All Free Online Tools — DevKit25",
  description: "Browse 25+ free online developer and productivity tools. JSON formatter, image compressor, PDF merger, regex tester and more. No sign-up required.",
  alternates: {
    canonical: "https://25tools.vercel.app/tools",
  },
};

export default function ToolsPage() {
  return <ToolsClient />;
}