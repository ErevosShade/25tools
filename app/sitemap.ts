import type { MetadataRoute } from "next";
import { TOOLS }    from "@/lib/tools";
import { BASE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url:             `${BASE_URL}/tools/${tool.slug}`,
    lastModified:    new Date(),
    changeFrequency: "weekly" as const,
    priority:        0.8,
  }));

  const categoryPages = [
    { url: `${BASE_URL}/tools/developer`, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${BASE_URL}/tools/pdf`,       changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${BASE_URL}/tools/image`,     changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${BASE_URL}/tools/text`,      changeFrequency: "weekly" as const, priority: 0.85 },
  ].map((p) => ({ ...p, lastModified: new Date() }));

  return [
    { url: BASE_URL,              lastModified: new Date(), changeFrequency: "daily"   as const, priority: 1.0 },
    { url: `${BASE_URL}/tools`,   lastModified: new Date(), changeFrequency: "daily"   as const, priority: 0.9 },
    { url: `${BASE_URL}/about`,   lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/terms`,   lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    ...categoryPages,
    ...toolPages,
  ];
}