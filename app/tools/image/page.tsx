import type { Metadata } from "next";
import { TOOLS} from "@/lib/tools";
import { BASE_URL } from "@/lib/constants";
import { CategoryPageShell } from "@/components/tools/CategoryPageShell";

export const metadata: Metadata = {
  title:       "Free Online Image Tools — 25tools | No Sign-up",
  description: "Free image tools online. Compress images, convert to Base64, generate QR codes and more. No sign-up, no file size limit, runs directly in your browser.",
  keywords:    ["free online image tools","image tools online free","image compressor online free","online image editor free","25tools image tools"],
  alternates:  { canonical: `${BASE_URL}/tools/image` },
  openGraph: {
    title:       "Free Online Image Tools — 25tools",
    description: "Free image tools online. No sign-up, no file size limit, runs in your browser.",
    url:         `${BASE_URL}/tools/image`,
    siteName:    "25tools",
  },
};

// Image tools + QR generator (Converter category but image-adjacent)
const imageTools = TOOLS.filter(
  (t) => t.category === "Image" || t.slug === "qr-generator"
);

export default function ImageToolsPage() {
  return (
    <CategoryPageShell
      heading="Free Online Image Tools — 25tools"
      intro="25tools image tools run entirely in your browser — no uploads to servers, no file size limits, completely free. Compress JPG and PNG files, convert images to Base64 for embedding in code, or generate QR codes in seconds."
      tools={imageTools}
      breadcrumbLabel="Image Tools"
      breadcrumbSlug="image"
      schemaId="image"
    />
  );
}