import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/generateToolMetadata";

export const metadata: Metadata = generateToolMetadata("jwt-reader");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
