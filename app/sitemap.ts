import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { BASE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url:              `${BASE_URL}/tools/${tool.slug}`,
    lastModified:     new Date(),
    changeFrequency:  "weekly",
    priority:         0.8,
  }));

  return [
    {
      url:             `${BASE_URL}`,
      lastModified:    new Date(),
      changeFrequency: "daily",
      priority:        1.0,
    },
    {
      url:             `${BASE_URL}/tools`,
      lastModified:    new Date(),
      changeFrequency: "daily",
      priority:        0.9,
    },
    ...toolPages,
  ];
}