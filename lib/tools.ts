export type ToolCategory =
  | "Developer"
  | "PDF"
  | "Image"
  | "Text"
  | "Converter";

export interface ToolFaq {
  question: string;
  answer:   string;
}

export interface Tool {
  name:            string;
  slug:            string;
  category:        ToolCategory;
  desc:            string;
  free:            boolean;
  metaTitle:       string;
  metaDescription: string;
  keywords:        string[];
  faqs:            ToolFaq[];
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
    keywords: ["json formatter","json validator","json beautifier","format json online","json pretty print","json lint","validate json","json minifier","free json tool","25tools"],
    faqs: [
      {
        question: "Is the JSON formatter free to use?",
        answer:   "Yes, completely free with no sign-up or account required. It will always be free.",
      },
      {
        question: "Does my JSON data get sent to a server?",
        answer:   "No. Everything runs entirely in your browser using JavaScript. Your data never leaves your device.",
      },
      {
        question: "Is there a file size limit for JSON input?",
        answer:   "There is no enforced file size limit. The tool runs locally in your browser, so performance depends on your device.",
      },
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
    keywords: ["regex tester","regular expression tester","regex online","test regex","regex debugger","regex validator","regex match","javascript regex tester","25tools"],
    faqs: [
      {
        question: "Which regex flags are supported?",
        answer:   "The tester supports the g (global), i (case-insensitive), and m (multiline) flags. Toggle them using the flag buttons next to the pattern field.",
      },
      {
        question: "Does the regex tester support lookaheads and lookbehinds?",
        answer:   "Yes. It uses the native JavaScript RegExp engine, which supports lookaheads, lookbehinds, and most modern regex features.",
      },
      {
        question: "Is my test data private?",
        answer:   "Completely. The regex tester runs entirely in your browser. Nothing is sent to any server.",
      },
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
    keywords: ["base64 encoder","base64 decoder","base64 online","encode base64","decode base64","base64 converter","base64 to text","text to base64","25tools"],
    faqs: [
      {
        question: "What is Base64 encoding used for?",
        answer:   "Base64 is commonly used to encode binary data for transmission over text-based protocols, embed images in CSS or HTML, and encode data in JWTs and API tokens.",
      },
      {
        question: "Can I decode any Base64 string?",
        answer:   "Yes, as long as the string is valid Base64. If the input is invalid, the tool will show an error message explaining the issue.",
      },
      {
        question: "Does this tool handle Unicode characters?",
        answer:   "Yes. The encoder uses encodeURIComponent before btoa to handle Unicode characters correctly, avoiding common encoding errors.",
      },
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
    keywords: ["image compressor","compress image online","reduce image size","jpg compressor","png compressor","webp compressor","image optimizer","compress photo online","free image compressor","25tools"],
    faqs: [
      {
        question: "Does image compression happen on a server?",
        answer:   "No. All compression runs directly in your browser using the browser-image-compression library. Your images are never uploaded to any server.",
      },
      {
        question: "What image formats are supported?",
        answer:   "JPG, PNG, and WebP are supported. The tool preserves the original file format after compression.",
      },
      {
        question: "Is there a file size limit?",
        answer:   "No. Because compression happens locally in your browser, there is no server-side file size restriction.",
      },
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
    keywords: ["pdf merger","merge pdf online","combine pdf","join pdf files","pdf combiner","merge pdf free","combine pdf online","pdf joiner","25tools"],
    faqs: [
      {
        question: "Are my PDF files uploaded to a server?",
        answer:   "No. The PDF merger uses pdf-lib running entirely in your browser. Your files never leave your device.",
      },
      {
        question: "How many PDFs can I merge at once?",
        answer:   "You can merge as many PDFs as you like. There is no enforced limit since all processing happens locally.",
      },
      {
        question: "Will password-protected PDFs work?",
        answer:   "The tool attempts to load password-protected PDFs using the ignoreEncryption option, but heavily encrypted files may not merge correctly.",
      },
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
    keywords: ["qr code generator","qr code maker","create qr code","free qr code","qr code online","generate qr code","qr code for url","qr code download","25tools"],
    faqs: [
      {
        question: "What can I encode in a QR code?",
        answer:   "Any plain text or URL. Common uses include website links, contact details, Wi-Fi credentials, and short messages.",
      },
      {
        question: "What size should I choose for my QR code?",
        answer:   "128px is suitable for digital use. 256px works well for most print uses. 512px is best for large-format printing like posters or banners.",
      },
      {
        question: "Is the QR code generated on a server?",
        answer:   "No. QR codes are generated entirely in your browser using the qrcode library. Nothing is sent to a server.",
      },
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
    keywords: ["word counter","character counter","word count online","count words","reading time calculator","word counter online","character count","sentence counter","25tools"],
    faqs: [
      {
        question: "How is reading time calculated?",
        answer:   "Reading time is estimated at 200 words per minute, rounded up to the nearest minute. This is a conservative average suitable for most content types.",
      },
      {
        question: "Does the word counter work in real time?",
        answer:   "Yes. All statistics update live as you type or paste text — no need to click any button.",
      },
      {
        question: "Is there a character or word limit?",
        answer:   "No. The tool runs entirely in your browser so there is no server-side limit on the amount of text you can count.",
      },
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
    keywords: ["case converter","text case converter","uppercase converter","lowercase converter","title case converter","camelcase converter","snake case converter","change text case online","25tools"],
    faqs: [
      {
        question: "Which case formats are supported?",
        answer:   "UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and snake_case are all supported with instant one-click conversion.",
      },
      {
        question: "Does case conversion work with special characters?",
        answer:   "Yes for standard conversions. camelCase and snake_case conversions strip special characters and normalise spacing as part of the conversion.",
      },
      {
        question: "Can I convert large amounts of text?",
        answer:   "Yes. The tool runs in your browser with no size restrictions. Paste as much text as you need.",
      },
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
    keywords: ["color picker","color picker online","hex to rgb","rgb to hex","hex to hsl","color converter","color code picker","color palette generator","hsl converter","25tools"],
    faqs: [
      {
        question: "Can I enter a HEX code directly?",
        answer:   "Yes. Click the color swatch to open the browser color picker where you can input a HEX code directly, or pick a color visually.",
      },
      {
        question: "How are tints and shades generated?",
        answer:   "Tints are created by mixing the selected color with white at varying proportions. Shades are created by mixing with black. Click any swatch to use it as the new base color.",
      },
      {
        question: "Can I copy the color values?",
        answer:   "Yes. Each format — HEX, RGB, and HSL — has its own Copy button that copies the value to your clipboard instantly.",
      },
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
    keywords: ["url encoder","url decoder","url encode online","percent encoding","encode url online","decode url","urlencode","url encoding tool","percent decode","25tools"],
    faqs: [
      {
        question: "What is URL encoding used for?",
        answer:   "URL encoding converts special characters like spaces, ampersands, and slashes into percent-encoded equivalents so they can be safely used in URLs and query strings.",
      },
      {
        question: "What is the difference between encode and decode?",
        answer:   "Encoding converts plain text to a URL-safe format using encodeURIComponent. Decoding reverses this using decodeURIComponent to restore the original string.",
      },
      {
        question: "Is my data sent to a server?",
        answer:   "No. URL encoding and decoding happens entirely in your browser using built-in JavaScript functions. No data is transmitted anywhere.",
      },
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