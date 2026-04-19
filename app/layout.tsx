import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "25tools — Free Online Utility Tools",
    template: "%s | 25tools",
  },
  description:
    "A collection of fast, free, and privacy-friendly utility tools for developers and creators. No login required.",
  keywords: [
    "online tools",
    "developer tools",
    "utility tools",
    "text tools",
    "converter",
    "formatter",
  ],
  authors: [{ name: "25tools" }],
  creator: "25tools",
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: "25tools",
    title: "25tools — Free Online Utility Tools",
    description:
      "Fast, free, and privacy-friendly utility tools. No login required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "25tools — Free Online Utility Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "25tools — Free Online Utility Tools",
    description:
      "Fast, free, and privacy-friendly utility tools. No login required.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="min-h-dvh flex flex-col bg-white text-[#0A0A0A] antialiased">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}