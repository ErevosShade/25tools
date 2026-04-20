import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
  weight:   ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://25tools.vercel.app"),

  title: {
    default:  "25tools — 25 Free Developer & Productivity Tools",
    template: "%s | 25tools",
  },

  description:
    "25+ free online tools for developers and creators. JSON formatter, image compressor, PDF merger, regex tester and more. No sign-up required.",

  keywords: [
    "free developer tools",
    "online tools",
    "json formatter",
    "image compressor",
    "pdf merger",
    "regex tester",
    "base64 encoder",
    "word counter",
    "25tools",
    "25tools",
  ],

  authors:  [{ name: "25tools", url: "https://25tools.vercel.app" }],
  creator:  "25tools",
  publisher:"25tools",

  // ── Google Search Console verification ──
  verification: {
    google: "PASTE_YOUR_CODE_HERE",
  },

  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://25tools.vercel.app",
    siteName:    "25tools",
    title:       "25tools — 25 Free Developer & Productivity Tools",
    description: "25+ free online tools for developers and creators. No sign-up required.",
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "25tools — Free Developer Tools",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "25tools — 25 Free Developer & Productivity Tools",
    description: "25+ free online tools for developers and creators. No sign-up required.",
    images:      ["/og-image.png"],
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: "https://25tools.vercel.app",
  },
};

export const viewport: Viewport = {
  themeColor:   "#FFFFFF",
  width:        "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={inter.variable}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-dvh flex flex-col bg-white text-[#0A0A0A] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}