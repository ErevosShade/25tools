import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/generateToolMetadata";

export const metadata: Metadata = generateToolMetadata("images-to-pdf");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
