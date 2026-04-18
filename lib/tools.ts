// ─── Types ────────────────────────────────────────────────────
export type ToolCategory =
  | "Developer"
  | "PDF"
  | "Image"
  | "Text"
  | "Converter";

export interface Tool {
  name:     string;
  slug:     string;
  category: ToolCategory;
  desc:     string;
  free:     boolean;
}

// ─── Registry ─────────────────────────────────────────────────
export const TOOLS: Tool[] = [
  { name: "JSON Formatter",   slug: "json-formatter",   category: "Developer", desc: "Format and validate JSON instantly",          free: true  },
  { name: "Regex Tester",     slug: "regex-tester",     category: "Developer", desc: "Test regex patterns with live highlighting",  free: true  },
  { name: "Base64 Encoder",   slug: "base64-encoder",   category: "Developer", desc: "Encode and decode Base64 strings",           free: true  },
  { name: "Image Compressor", slug: "image-compressor", category: "Image",     desc: "Compress JPG, PNG and WebP files",           free: true  },
  { name: "PDF Merger",       slug: "pdf-merger",       category: "PDF",       desc: "Merge multiple PDFs into one file",          free: true  },
  { name: "QR Generator",     slug: "qr-generator",     category: "Converter", desc: "Generate QR codes for any URL or text",      free: true  },
  { name: "Word Counter",     slug: "word-counter",     category: "Text",      desc: "Count words, characters and reading time",   free: true  },
  { name: "Case Converter",   slug: "case-converter",   category: "Text",      desc: "Convert text between cases instantly",       free: true  },
  { name: "Color Picker",     slug: "color-picker",     category: "Developer", desc: "Pick colors and convert between formats",    free: true  },
  { name: "URL Encoder",      slug: "url-encoder",      category: "Developer", desc: "Encode and decode URLs safely",              free: true  },
];

// ─── Derived helpers ───────────────────────────────────────────

/** All distinct categories present in the registry, in display order. */
export const TOOL_CATEGORIES: ToolCategory[] = [
  "Developer",
  "PDF",
  "Image",
  "Text",
  "Converter",
];

/** Count of tools per category. */
export const CATEGORY_COUNTS: Record<ToolCategory, number> = TOOLS.reduce(
  (acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + 1;
    return acc;
  },
  {} as Record<ToolCategory, number>
);

/** Filter tools by optional category and/or query string. */
export function filterTools(
  tools: Tool[],
  category: ToolCategory | "All",
  query: string
): Tool[] {
  const q = query.trim().toLowerCase();
  return tools.filter((t) => {
    const matchesCategory = category === "All" || t.category === category;
    const matchesQuery =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}