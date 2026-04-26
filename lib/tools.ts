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

export const BASE_URL = "https://25tools.vercel.app";

export const TOOLS: Tool[] = [

  // ── Developer (10) ───────────────────────────────────────
  {
    name:     "JSON Formatter",
    slug:     "json-formatter",
    category: "Developer",
    desc:     "Format and validate JSON instantly",
    free:     true,
    metaTitle:       "JSON Formatter — Free Online JSON Validator | 25tools",
    metaDescription: "Format, validate and minify JSON instantly in your browser. Paste raw JSON and get clean, readable output in one click. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["json formatter","json validator","json beautifier","format json online","json pretty print","json lint","validate json","json minifier","25tools","25tools json formatter"],
    faqs: [
      { question: "Is the JSON formatter free to use?",        answer: "Yes, completely free with no sign-up or account required. It will always be free." },
      { question: "Does my JSON data get sent to a server?",   answer: "No. Everything runs entirely in your browser using JavaScript. Your data never leaves your device." },
      { question: "Is there a file size limit for JSON input?",answer: "There is no enforced file size limit. The tool runs locally in your browser." },
    ],
  },
  {
    name:     "Regex Tester",
    slug:     "regex-tester",
    category: "Developer",
    desc:     "Test regex patterns with live highlighting",
    free:     true,
    metaTitle:       "Regex Tester — Free Online Regular Expression Tester | 25tools",
    metaDescription: "Test and debug regular expressions with live match highlighting. Supports flags g, i, m. See all matches instantly. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["regex tester","regular expression tester","regex online","test regex","regex debugger","regex validator","regex match","javascript regex","25tools","25tools regex tester"],
    faqs: [
      { question: "Which regex flags are supported?",             answer: "The tester supports g (global), i (case-insensitive), and m (multiline) flags." },
      { question: "Does the regex tester support lookaheads?",    answer: "Yes. It uses the native JavaScript RegExp engine which supports all modern regex features." },
      { question: "Is my test data private?",                     answer: "Completely. The regex tester runs entirely in your browser. Nothing is sent to any server." },
    ],
  },
  {
    name:     "Base64 Encoder",
    slug:     "base64-encoder",
    category: "Developer",
    desc:     "Encode and decode Base64 strings",
    free:     true,
    metaTitle:       "Base64 Encoder — Free Online Base64 Encoder & Decoder | 25tools",
    metaDescription: "Encode text to Base64 or decode Base64 strings back to plain text instantly. No data leaves your browser. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["base64 encoder","base64 decoder","base64 online","encode base64","decode base64","base64 converter","base64 to text","text to base64","25tools","25tools base64"],
    faqs: [
      { question: "What is Base64 encoding used for?",    answer: "Base64 is used to encode binary data for text-based protocols, embed images in CSS/HTML, and encode JWTs." },
      { question: "Can I decode any Base64 string?",      answer: "Yes, as long as the string is valid Base64. Invalid input shows an error message." },
      { question: "Does this handle Unicode characters?", answer: "Yes. The encoder uses encodeURIComponent before btoa to handle Unicode correctly." },
    ],
  },
  {
    name:     "URL Encoder",
    slug:     "url-encoder",
    category: "Developer",
    desc:     "Encode and decode URLs safely",
    free:     true,
    metaTitle:       "URL Encoder — Free Online URL Encode & Decode Tool | 25tools",
    metaDescription: "Encode special characters in URLs or decode percent-encoded strings back to plain text instantly. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["url encoder","url decoder","url encode online","percent encoding","encode url","decode url","urlencode","url encoding tool","25tools","25tools url encoder"],
    faqs: [
      { question: "What is URL encoding used for?",                         answer: "URL encoding converts special characters so they can be safely used in URLs and query strings." },
      { question: "What is the difference between encode and decode?",      answer: "Encoding converts text to URL-safe format; decoding reverses it using decodeURIComponent." },
      { question: "Is my data sent to a server?",                          answer: "No. URL encoding happens entirely in your browser using built-in JavaScript functions." },
    ],
  },
  {
    name:     "JWT Reader",
    slug:     "jwt-reader",
    category: "Developer",
    desc:     "Decode and inspect JWT tokens instantly",
    free:     true,
    metaTitle:       "JWT Reader — Free Online JWT Token Decoder & Inspector | 25tools",
    metaDescription: "Decode and inspect JWT tokens instantly in your browser. View header, payload and expiry status. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["jwt decoder","jwt token reader","decode jwt online","jwt inspector","json web token decoder","jwt payload decoder","25tools","25tools jwt reader"],
    faqs: [
      { question: "Is it safe to paste my JWT here?",   answer: "Yes. The token is decoded entirely in your browser using JavaScript. Nothing is sent to any server." },
      { question: "Can you verify the JWT signature?",  answer: "No. Signature verification requires the secret key which you should never share. This tool only decodes the payload." },
      { question: "What is a JWT token?",               answer: "A JSON Web Token is a compact, URL-safe way to represent claims between two parties, commonly used for authentication." },
    ],
  },
  {
    name:     "Color Picker",
    slug:     "color-picker",
    category: "Developer",
    desc:     "Pick colors and convert between formats",
    free:     true,
    metaTitle:       "Color Picker — Free Online HEX, RGB & HSL Converter | 25tools",
    metaDescription: "Pick any color and instantly convert between HEX, RGB and HSL formats. Explore auto-generated tints and shades. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["color picker","color picker online","hex to rgb","rgb to hex","hex to hsl","color converter","color code picker","color palette generator","25tools","25tools color picker"],
    faqs: [
      { question: "Can I enter a HEX code directly?",         answer: "Yes. Click the color swatch to open the browser color picker and input a HEX code directly." },
      { question: "How are tints and shades generated?",      answer: "Tints mix the color with white; shades mix with black at varying proportions." },
      { question: "Can I copy the color values?",             answer: "Yes. Each format has its own Copy button that copies the value to your clipboard instantly." },
    ],
  },
  {
    name:     "UUID Generator",
    slug:     "uuid-generator",
    category: "Developer",
    desc:     "Generate random UUID v4 strings in bulk",
    free:     true,
    metaTitle:       "UUID Generator — Free Online Random UUID v4 Creator | 25tools",
    metaDescription: "Generate random UUID v4 strings instantly. Bulk generate up to 100 UUIDs, copy individually or all at once. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["uuid generator","random uuid generator","uuid v4 online","generate uuid free","unique id generator","guid generator","25tools","25tools uuid generator"],
    faqs: [
      { question: "What is a UUID?",                              answer: "A UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information in computer systems." },
      { question: "Are the generated UUIDs truly unique?",        answer: "UUID v4 uses cryptographically random values making collisions virtually impossible." },
      { question: "What is the difference between UUID and GUID?",answer: "They are the same thing. GUID is Microsoft's term for UUID." },
    ],
  },
  {
    name:     "Timestamp Converter",
    slug:     "timestamp-converter",
    category: "Developer",
    desc:     "Convert Unix timestamps to human readable dates",
    free:     true,
    metaTitle:       "Timestamp Converter — Free Online Unix Epoch Time Tool | 25tools",
    metaDescription: "Convert Unix timestamps to human readable dates and back. Supports seconds and milliseconds, shows local and UTC time. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["unix timestamp converter","epoch time converter","timestamp to date","unix time online","epoch converter","convert timestamp","25tools","25tools timestamp converter"],
    faqs: [
      { question: "What is a Unix timestamp?",         answer: "A Unix timestamp is the number of seconds elapsed since January 1, 1970 (UTC), used widely in programming and databases." },
      { question: "Does this support milliseconds?",   answer: "Yes, the tool automatically detects whether your input is in seconds or milliseconds." },
      { question: "What timezone does it use?",        answer: "Results are shown in both your local timezone and UTC." },
    ],
  },
  {
    name:     "CSS Minifier",
    slug:     "css-minifier",
    category: "Developer",
    desc:     "Minify and beautify CSS instantly",
    free:     true,
    metaTitle:       "CSS Minifier — Free Online CSS Compressor & Beautifier | 25tools",
    metaDescription: "Minify and compress CSS instantly in your browser. Remove whitespace and comments to reduce file size. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["css minifier","css compressor online","minify css free","css beautifier","compress css","css optimizer online","25tools","25tools css minifier"],
    faqs: [
      { question: "How much can CSS be reduced by minifying?",   answer: "Typically 20–40% depending on how much whitespace and comments your CSS has." },
      { question: "Does minification affect how my CSS works?",  answer: "No. Minification only removes unnecessary characters — the CSS behaves identically." },
      { question: "Can I also beautify minified CSS?",           answer: "Yes, use the Beautify button to format minified CSS back into readable code." },
    ],
  },
  {
    name:     "Markdown to HTML",
    slug:     "markdown-to-html",
    category: "Developer",
    desc:     "Convert Markdown to HTML with live preview",
    free:     true,
    metaTitle:       "Markdown to HTML — Free Online Markdown Converter | 25tools",
    metaDescription: "Convert Markdown to HTML instantly with a live preview. Switch between rendered output and raw HTML source. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["markdown to html","markdown converter online","md to html free","markdown preview online","markdown editor","convert markdown","25tools","25tools markdown converter"],
    faqs: [
      { question: "Which Markdown flavour is supported?",answer: "The tool uses the marked library which supports CommonMark and GitHub Flavored Markdown (GFM)." },
      { question: "Can I preview the rendered output?",   answer: "Yes, switch between rendered preview and raw HTML source with one click." },
      { question: "Is my Markdown saved?",                answer: "No, content is not saved anywhere. Copy or download your HTML before leaving the page." },
    ],
  },

  // ── PDF (4) ───────────────────────────────────────────────
  {
    name:     "PDF Merger",
    slug:     "pdf-merger",
    category: "PDF",
    desc:     "Merge multiple PDFs into one file",
    free:     true,
    metaTitle:       "PDF Merger — Free Online PDF Combiner | 25tools",
    metaDescription: "Merge multiple PDF files into one document instantly. Drag to reorder, then download your combined PDF. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["pdf merger","merge pdf online","combine pdf","join pdf files","pdf combiner","merge pdf free","25tools","25tools pdf merger"],
    faqs: [
      { question: "Are my PDF files uploaded to a server?", answer: "No. The PDF merger uses pdf-lib running entirely in your browser. Your files never leave your device." },
      { question: "How many PDFs can I merge at once?",     answer: "As many as you like — there is no enforced limit since all processing happens locally." },
      { question: "Will password-protected PDFs work?",     answer: "The tool attempts to load encrypted PDFs but heavily protected files may not merge correctly." },
    ],
  },
  {
    name:     "PageTrim - PDF Cutter Tool ",
    slug:     "page-trim",
    category: "PDF",
    desc:     "Remove specific pages from a PDF visually",
    free:     true,
    metaTitle:       "PageTrim — Free PDF Page Remover Online | 25tools",
    metaDescription: "Upload a PDF and visually remove pages you don't need. Preview all pages, delete and download instantly. Free, no sign-up, no file size limit — 25tools.vercel.app",
    keywords: ["pagetrim","pdf page remover","delete pages from pdf online","remove pdf pages free","pdf page cutter online","trim pdf pages","25tools pagetrim","25tools pdf page remover"],
    faqs: [
      { question: "Does my PDF get uploaded to a server?",answer: "No. Everything runs in your browser using pdf-lib. Your PDF never leaves your device." },
      { question: "Is there a page limit?",               answer: "No page limit. Large PDFs may take a moment to preview but will process fully." },
      { question: "Can I reorder pages?",                 answer: "Not yet — page reordering is coming soon. Currently you can only remove pages." },
    ],
  },
  {
    name:     "Images to PDF",
    slug:     "images-to-pdf",
    category: "PDF",
    desc:     "Convert multiple images into a single PDF",
    free:     true,
    metaTitle:       "Images to PDF — Free Online JPG to PDF Converter | 25tools",
    metaDescription: "Convert multiple images to a PDF instantly. Upload JPG, PNG or WebP files, arrange the order and download. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["images to pdf","jpg to pdf online","png to pdf free","convert images to pdf","photos to pdf","image to pdf converter","25tools","25tools images to pdf"],
    faqs: [
      { question: "What image formats are supported?",          answer: "JPG, PNG and WebP are all supported." },
      { question: "Is there a limit on how many images I can add?",answer: "No limit. Add as many images as you need." },
      { question: "Does image quality get reduced?",            answer: "No. Images are embedded at full quality in the PDF." },
    ],
  },
  {
    name:     "Word to PDF",
    slug:     "word-to-pdf",
    category: "PDF",
    desc:     "Convert DOCX Word documents to PDF in browser",
    free:     true,
    metaTitle:       "Word to PDF — Free Online DOCX to PDF Converter | 25tools",
    metaDescription: "Convert Word documents to PDF instantly in your browser. Upload your DOCX file and download a PDF in seconds. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["word to pdf","docx to pdf online free","convert word to pdf","word document to pdf","docx to pdf converter","free word to pdf","25tools","25tools word to pdf"],
    faqs: [
      { question: "Is there a file size limit?",             answer: "No, conversion runs entirely in your browser with no size restrictions." },
      { question: "Will my formatting be preserved?",        answer: "Basic formatting like headings, bold and paragraphs are preserved. Complex layouts may vary." },
      { question: "Is my document sent to a server?",        answer: "No. Everything runs locally in your browser. Your document never leaves your device." },
    ],
  },

  // ── Image (3) ─────────────────────────────────────────────
  {
    name:     "Image Compressor",
    slug:     "image-compressor",
    category: "Image",
    desc:     "Compress JPG, PNG and WebP files",
    free:     true,
    metaTitle:       "Image Compressor — Free Online JPG, PNG & WebP Compressor | 25tools",
    metaDescription: "Compress JPG, PNG and WebP images in your browser with no upload limits. Reduce file size without losing quality. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["image compressor","compress image online","reduce image size","jpg compressor","png compressor","webp compressor","image optimizer","25tools","25tools image compressor"],
    faqs: [
      { question: "Does image compression happen on a server?",answer: "No. All compression runs in your browser using browser-image-compression. Your images are never uploaded." },
      { question: "What image formats are supported?",         answer: "JPG, PNG, and WebP are supported." },
      { question: "Is there a file size limit?",               answer: "No. Compression happens locally so there is no server-side restriction." },
    ],
  },
  {
    name:     "Image to Base64",
    slug:     "image-to-base64",
    category: "Image",
    desc:     "Convert images to Base64 strings and data URIs",
    free:     true,
    metaTitle:       "Image to Base64 — Free Online Image Base64 Encoder | 25tools",
    metaDescription: "Convert images to Base64 strings instantly. Get raw Base64, data URI, CSS or HTML img tag format. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["image to base64","image base64 encoder","convert image to base64","base64 image encoder","jpg to base64","png to base64","25tools","25tools image to base64"],
    faqs: [
      { question: "What is Base64 image encoding used for?",answer: "Base64 encoded images can be embedded directly in HTML, CSS or JSON without needing a separate image file." },
      { question: "Does the image get uploaded anywhere?",   answer: "No. Conversion uses the browser's FileReader API entirely locally." },
      { question: "Will Base64 increase my image file size?",answer: "Yes, Base64 encoding increases size by approximately 33% compared to the original binary file." },
    ],
  },
  {
    name:     "QR Generator",
    slug:     "qr-generator",
    category: "Converter",
    desc:     "Generate QR codes for any URL or text",
    free:     true,
    metaTitle:       "QR Generator — Free Online QR Code Maker | 25tools",
    metaDescription: "Generate QR codes for any URL or text instantly. Choose size and download as PNG. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["qr code generator","qr code maker","create qr code","free qr code","qr code online","generate qr code","25tools","25tools qr generator"],
    faqs: [
      { question: "What can I encode in a QR code?",answer: "Any plain text or URL including website links, contact details, and Wi-Fi credentials." },
      { question: "What size should I choose?",      answer: "128px for digital, 256px for standard print, 512px for large-format printing." },
      { question: "Is the QR code generated on a server?",answer: "No. QR codes are generated entirely in your browser." },
    ],
  },

  // ── Text (2) ──────────────────────────────────────────────
  {
    name:     "Word Counter",
    slug:     "word-counter",
    category: "Text",
    desc:     "Count words, characters and reading time",
    free:     true,
    metaTitle:       "Word Counter — Free Online Word & Character Count Tool | 25tools",
    metaDescription: "Count words, characters, sentences, paragraphs and reading time instantly. Paste your text and get live stats. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["word counter","character counter","word count online","count words","reading time calculator","word counter online","character count","25tools","25tools word counter"],
    faqs: [
      { question: "How is reading time calculated?",   answer: "Reading time is estimated at 200 words per minute, rounded up to the nearest minute." },
      { question: "Does the word counter work in real time?",answer: "Yes. All statistics update live as you type or paste text." },
      { question: "Is there a character or word limit?",answer: "No. The tool runs entirely in your browser so there is no limit." },
    ],
  },
  {
    name:     "Case Converter",
    slug:     "case-converter",
    category: "Text",
    desc:     "Convert text between cases instantly",
    free:     true,
    metaTitle:       "Case Converter — Free Online Text Case Converter | 25tools",
    metaDescription: "Convert text between uppercase, lowercase, title case, sentence case, camelCase and snake_case instantly. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["case converter","text case converter","uppercase converter","lowercase converter","title case converter","camelcase converter","snake case converter","25tools","25tools case converter"],
    faqs: [
      { question: "Which case formats are supported?",          answer: "UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and snake_case." },
      { question: "Does case conversion work with special characters?",answer: "Yes for standard conversions. camelCase and snake_case strip special characters." },
      { question: "Can I convert large amounts of text?",       answer: "Yes. The tool runs in your browser with no size restrictions." },
    ],
  },

  // ── Utility (1) ───────────────────────────────────────────
  {
    name:     "Password Generator",
    slug:     "password-generator",
    category: "Developer",
    desc:     "Generate strong random passwords instantly",
    free:     true,
    metaTitle:       "Password Generator — Free Online Strong Password Creator | 25tools",
    metaDescription: "Generate strong, cryptographically random passwords instantly. Customize length and character types. Free, no sign-up, no limits — 25tools.vercel.app",
    keywords: ["password generator","strong password generator","random password generator","secure password creator","free password generator","25tools","25tools password generator"],
    faqs: [
      { question: "Are generated passwords stored anywhere?",answer: "No. Passwords are generated locally in your browser and never sent to any server." },
      { question: "How strong are the generated passwords?", answer: "Using all character types with 16+ characters creates extremely strong passwords that would take centuries to brute-force." },
      { question: "Can I use symbols in passwords?",         answer: "Yes, you can toggle symbols on or off depending on what the site you are registering for allows." },
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