import type { Metadata } from "next";
import { TOOLS }         from "@/lib/tools";
import { BASE_URL } from "@/lib/constants";


export function generateToolMetadata(slug: string): Metadata {
  const tool = TOOLS.find((t) => t.slug === slug);

  // Fallback for unknown slugs
  if (!tool) {
    return {
      title:       "Tool Not Found | 25tools",
      description: "This tool could not be found.",
    };
  }

  const canonicalUrl = `${BASE_URL}/tools/${tool.slug}`;
  const ogImageUrl   = `${BASE_URL}/api/og?tool=${tool.slug}`;

  return {
    title:       tool.metaTitle,
    description: tool.metaDescription,
    keywords:    tool.keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type:        "website",
      url:         canonicalUrl,
      siteName:    "25tools",
      title:       tool.metaTitle,
      description: tool.metaDescription,
      images: [
        {
          url:    ogImageUrl,
          width:  1200,
          height: 630,
          alt:    `${tool.name} — 25tools`,
        },
      ],
    },

    twitter: {
      card:        "summary_large_image",
      title:       tool.metaTitle,
      description: tool.metaDescription,
      images:      [ogImageUrl],
    },

    robots: {
      index:  true,
      follow: true,
      googleBot: {
        index:               true,
        follow:              true,
        "max-image-preview": "large",
        "max-snippet":       -1,
      },
    },
  };
}