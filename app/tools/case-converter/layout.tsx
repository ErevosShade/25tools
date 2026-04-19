import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/generateToolMetadata";

export const metadata: Metadata = generateToolMetadata("base64-encoder");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}