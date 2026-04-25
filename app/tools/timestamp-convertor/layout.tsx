import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/generateToolMetadata";

export const metadata: Metadata = generateToolMetadata("timestamp-converter");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
