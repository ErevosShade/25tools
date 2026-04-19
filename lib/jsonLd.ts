import type { Tool } from "@/lib/tools";

const BASE_URL = "https://25tools.dpdns.org";

export interface SoftwareApplicationSchema {
  "@context":           string;
  "@type":              string;
  name:                 string;
  description:          string;
  applicationCategory:  string;
  operatingSystem:      string;
  url:                  string;
  isAccessibleForFree:  boolean;
  offers: {
    "@type":        string;
    price:          string;
    priceCurrency:  string;
  };
  provider: {
    "@type": string;
    name:    string;
    url:     string;
  };
}

export function jsonLd(tool: Tool): SoftwareApplicationSchema {
  return {
    "@context":           "https://schema.org",
    "@type":              "SoftwareApplication",
    name:                 tool.name,
    description:          tool.metaDescription,
    applicationCategory:  "WebApplication",
    operatingSystem:      "Any",
    url:                  `${BASE_URL}/tools/${tool.slug}`,
    isAccessibleForFree:  tool.free,
    offers: {
      "@type":       "Offer",
      price:         "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name:    "25tools",
      url:     BASE_URL,
    },
  };
}