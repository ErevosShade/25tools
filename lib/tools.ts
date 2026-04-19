export type ToolCategory =
  | "Developer"
  | "PDF"
  | "Image"
  | "Text"
  | "Converter";

export interface Tool {
  name:            string;
  slug:            string;
  category:        ToolCategory;
  desc:            string;
  free:            boolean;
  metaTitle:       string;
  metaDescription: string;
  keywords:        string[];
}

export const TOOLS: Tool[] = [
  {
    name:     "JSON Formatter",
    slug:     "json-formatter",
    category: "Developer",
    desc:     "Format and validate JSON instantly",
    free:     true,
    metaTitle:       "JSON Formatter Online — Free JSON Validator | 25tools",
    metaDescription: "Format, validate and minify JSON instantly in your browser. Paste raw JSON and get a clean, readable output in one click. Free, no sign-up required.",
    keywords: [
      "json formatter", "json validator", "json beautifier", "format json online",
      "json pretty print", "json lint", "validate json", "json minifier", "free json tool","25tools",
    ],
  },
  {
    name:     "Regex Tester",
    slug:     "regex-tester",
    category: "Developer",
    desc:     "Test regex patterns with live highlighting",
    free:     true,
    metaTitle:       "Regex Tester Online — Live Regular Expression Tester | 25tools",
    metaDescription: "Test and debug regular expressions with live match highlighting. Supports flags g, i, m. See all matches instantly. Free regex tester, no sign-up.",
    keywords: [
      "regex tester", "regular expression tester", "regex online", "test regex",
      "regex debugger", "regex validator", "regex match", "javascript regex tester","25tools",
    ],
  },
  {
    name:     "Base64 Encoder",
    slug:     "base64-encoder",
    category: "Developer",
    desc:     "Encode and decode Base64 strings",
    free:     true,
    metaTitle:       "Base64 Encoder & Decoder Online — Free Tool | 25tools",
    metaDescription: "Encode text to Base64 or decode Base64 strings back to plain text instantly. No data leaves your browser. Free Base64 encoder and decoder online.",
    keywords: [
      "base64 encoder", "base64 decoder", "base64 online", "encode base64",
      "decode base64", "base64 converter", "base64 to text", "text to base64","free base64 tool","25tools",
    ],
  },
  {
    name:     "Image Compressor",
    slug:     "image-compressor",
    category: "Image",
    desc:     "Compress JPG, PNG and WebP files",
    free:     true,
    metaTitle:       "Image Compressor Online — Compress JPG, PNG, WebP Free | 25tools",
    metaDescription: "Compress JPG, PNG and WebP images online with quality control. Reduce file size without losing quality. Free image compressor — no upload limits, no sign-up.",
    keywords: [
      "image compressor", "compress image online", "reduce image size", "jpg compressor",
      "png compressor", "webp compressor", "image optimizer", "compress photo online", "free image compressor","25tools",
    ],
  },
  {
    name:     "PDF Merger",
    slug:     "pdf-merger",
    category: "PDF",
    desc:     "Merge multiple PDFs into one file",
    free:     true,
    metaTitle:       "PDF Merger Online — Combine PDFs Free | 25tools",
    metaDescription: "Merge multiple PDF files into one document online. Drag to reorder pages, then download your combined PDF instantly. Free PDF merger, no sign-up required.",
    keywords: [
      "pdf merger", "merge pdf online", "combine pdf", "join pdf files",
      "pdf combiner", "merge pdf free", "combine pdf online", "pdf joiner","25tools",
    ],
  },
  {
    name:     "QR Generator",
    slug:     "qr-generator",
    category: "Converter",
    desc:     "Generate QR codes for any URL or text",
    free:     true,
    metaTitle:       "QR Code Generator Online — Free QR Code Maker | 25tools",
    metaDescription: "Generate QR codes for any URL or text instantly. Choose from 128, 256 or 512px sizes and download as PNG. Free QR code generator, no sign-up required.",
    keywords: [
      "qr code generator", "qr code maker", "create qr code", "free qr code",
      "qr code online", "generate qr code", "qr code for url", "qr code download","25tools",
    ],
  },
  {
    name:     "Word Counter",
    slug:     "word-counter",
    category: "Text",
    desc:     "Count words, characters and reading time",
    free:     true,
    metaTitle:       "Word Counter Online — Free Character & Reading Time Counter | 25tools",
    metaDescription: "Count words, characters, sentences, paragraphs and reading time instantly. Paste your text and get live stats. Free online word counter, no sign-up needed.",
    keywords: [
      "word counter", "character counter", "word count online", "count words",
      "reading time calculator", "word counter online", "character count", "sentence counter","25tools",
    ],
  },
  {
    name:     "Case Converter",
    slug:     "case-converter",
    category: "Text",
    desc:     "Convert text between cases instantly",
    free:     true,
    metaTitle:       "Case Converter Online — UPPER, lower, Title, camelCase | 25tools",
    metaDescription: "Convert text between uppercase, lowercase, title case, sentence case, camelCase and snake_case instantly. Free online case converter, no sign-up required.",
    keywords: [
      "case converter", "text case converter", "uppercase converter", "lowercase converter",
      "title case converter", "camelcase converter", "snake case converter", "change text case online","25tools",
    ],
  },
  {
    name:     "Color Picker",
    slug:     "color-picker",
    category: "Developer",
    desc:     "Pick colors and convert between formats",
    free:     true,
    metaTitle:       "Color Picker Online — HEX, RGB, HSL Converter | 25tools",
    metaDescription: "Pick any color and instantly convert between HEX, RGB and HSL formats. Explore auto-generated tints and shades. Free online color picker, no sign-up needed.",
    keywords: [
      "color picker", "color picker online", "hex to rgb", "rgb to hex", "hex to hsl",
      "color converter", "color code picker", "color palette generator", "hsl converter","25tools",
    ],
  },
  {
    name:     "URL Encoder",
    slug:     "url-encoder",
    category: "Developer",
    desc:     "Encode and decode URLs safely",
    free:     true,
    metaTitle:       "URL Encoder & Decoder Online — Free URL Encode Tool | 25tools",
    metaDescription: "Encode special characters in URLs or decode percent-encoded strings back to plain text instantly. Free URL encoder and decoder online, no sign-up required.",
    keywords: [
      "url encoder", "url decoder", "url encode online", "percent encoding",
      "encode url online", "decode url", "urlencode", "url encoding tool", "percent decode","25tools",
    ],
  },
];

export const TOOL_CATEGORIES: ToolCategory[] = [
  "Developer", "PDF", "Image", "Text", "Converter",
];

export const CATEGORY_COUNTS: Record<ToolCategory, number> = TOOLS.reduce(
  (acc, t) => { acc[t.category] = (acc[t.category] ?? 0) + 1; return acc; },
  {} as Record<ToolCategory, number>
);

export function filterTools(
  tools: Tool[],
  category: ToolCategory | "All",
  query: string
): Tool[] {
  const q = query.trim().toLowerCase();
  return tools.filter((t) => {
    const matchesCategory = category === "All" || t.category === category;
    const matchesQuery    = !q ||
      t.name.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}