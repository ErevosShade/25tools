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

  // ── Developer (10) ───────────────────────────────────────
  {
    name: "JSON Formatter", slug: "json-formatter", category: "Developer",
    desc: "Format and validate JSON instantly", free: true,
    metaTitle: "JSON Formatter Online Free — Validate & Beautify JSON | 25tools",
    metaDescription: "Format, validate and beautify JSON instantly in your browser. Free JSON formatter and validator — no sign-up, no limits. — 25tools",
    keywords: ["25tools json formatter","json formatter online free","json formatter online","format json online","json validator online","json beautifier free","json pretty print online","json minifier online"],
    faqs: [
      { question: "Is the JSON formatter free to use?",         answer: "Yes, completely free with no sign-up or account required. It will always be free." },
      { question: "Does my JSON data get sent to a server?",    answer: "No. Everything runs entirely in your browser using JavaScript. Your data never leaves your device." },
      { question: "Is there a file size limit for JSON input?", answer: "There is no enforced file size limit. The tool runs locally in your browser." },
    ],
  },
  {
    name: "Regex Tester", slug: "regex-tester", category: "Developer",
    desc: "Test regex patterns with live highlighting", free: true,
    metaTitle: "Regex Tester Online Free — Test Regular Expressions | 25tools",
    metaDescription: "Test regex patterns with live match highlighting. Free online regex tester — no sign-up, works instantly in your browser. — 25tools",
    keywords: ["25tools regex tester","regex tester online free","regex tester online","test regex online","regex pattern tester","regular expression tester","regex checker online","regex validator free"],
    faqs: [
      { question: "Which regex flags are supported?",          answer: "The tester supports g (global), i (case-insensitive), and m (multiline) flags." },
      { question: "Does the regex tester support lookaheads?", answer: "Yes. It uses the native JavaScript RegExp engine which supports all modern regex features." },
      { question: "Is my test data private?",                  answer: "Completely. The regex tester runs entirely in your browser. Nothing is sent to any server." },
    ],
  },
  {
    name: "Base64 Encoder", slug: "base64-encoder", category: "Developer",
    desc: "Encode and decode Base64 strings", free: true,
    metaTitle: "Base64 Encoder Online Free — Encode & Decode Base64 | 25tools",
    metaDescription: "Encode and decode Base64 strings instantly. Free online Base64 encoder and decoder — no sign-up, runs in your browser. — 25tools",
    keywords: ["25tools base64 encoder","base64 encoder online free","base64 encode decode online","base64 encoder decoder","encode base64 online","decode base64 online","base64 converter free","base64 string encoder"],
    faqs: [
      { question: "What is Base64 encoding used for?",   answer: "Base64 is used to encode binary data for text-based protocols, embed images in CSS/HTML, and encode JWTs." },
      { question: "Can I decode any Base64 string?",     answer: "Yes, as long as the string is valid Base64. Invalid input shows an error message." },
      { question: "Does this handle Unicode characters?",answer: "Yes. The encoder uses encodeURIComponent before btoa to handle Unicode correctly." },
    ],
  },
  {
    name: "URL Encoder", slug: "url-encoder", category: "Developer",
    desc: "Encode and decode URLs safely", free: true,
    metaTitle: "URL Encoder Online Free — Encode & Decode URLs | 25tools",
    metaDescription: "Encode and decode URLs instantly in your browser. Free online URL encoder and decoder — no sign-up, instant results. — 25tools",
    keywords: ["25tools url encoder","url encoder online free","url encode decode online","url encoder decoder","encode url online free","url encoding tool","percent encode url","url decoder online"],
    faqs: [
      { question: "What is URL encoding used for?",                    answer: "URL encoding converts special characters so they can be safely used in URLs and query strings." },
      { question: "What is the difference between encode and decode?", answer: "Encoding converts text to URL-safe format; decoding reverses it using decodeURIComponent." },
      { question: "Is my data sent to a server?",                     answer: "No. URL encoding happens entirely in your browser using built-in JavaScript functions." },
    ],
  },
  {
    name: "JWT Reader", slug: "jwt-reader", category: "Developer",
    desc: "Decode and inspect JWT tokens instantly", free: true,
    metaTitle: "JWT Decoder Online Free — Read & Inspect JWT Tokens | 25tools",
    metaDescription: "Decode and inspect JWT tokens instantly. View header, payload and expiry free — no sign-up, your token never leaves your browser. — 25tools",
    keywords: ["25tools jwt decoder","jwt decoder online free","jwt token decoder","decode jwt online","jwt inspector online","json web token decoder","jwt payload viewer","jwt token reader free"],
    faqs: [
      { question: "Is it safe to paste my JWT here?",  answer: "Yes. The token is decoded entirely in your browser using JavaScript. Nothing is sent to any server." },
      { question: "Can you verify the JWT signature?", answer: "No. Signature verification requires the secret key which you should never share. This tool only decodes the payload." },
      { question: "What is a JWT token?",              answer: "A JSON Web Token is a compact, URL-safe way to represent claims between two parties, commonly used for authentication." },
    ],
  },
  {
    name: "Color Picker", slug: "color-picker", category: "Developer",
    desc: "Pick colors and convert between formats", free: true,
    metaTitle: "Color Picker Online Free — HEX RGB HSL Converter | 25tools",
    metaDescription: "Pick colors and convert between HEX, RGB and HSL instantly. Free online color picker — no sign-up, runs in your browser. — 25tools",
    keywords: ["25tools color picker","color picker online free","hex color picker online","rgb to hex converter","hex to rgb converter","color code picker online","hsl color converter","css color picker tool"],
    faqs: [
      { question: "Can I enter a HEX code directly?",    answer: "Yes. Click the color swatch to open the browser color picker and input a HEX code directly." },
      { question: "How are tints and shades generated?", answer: "Tints mix the color with white; shades mix with black at varying proportions." },
      { question: "Can I copy the color values?",        answer: "Yes. Each format has its own Copy button that copies the value to your clipboard instantly." },
    ],
  },
  {
    name: "UUID Generator", slug: "uuid-generator", category: "Developer",
    desc: "Generate random UUID v4 strings in bulk", free: true,
    metaTitle: "UUID Generator Online Free — Random UUID v4 Creator | 25tools",
    metaDescription: "Generate random UUID v4 strings instantly. Bulk generate up to 100 UUIDs free — no sign-up, runs in your browser. — 25tools",
    keywords: ["25tools uuid generator","uuid generator online free","random uuid generator","uuid v4 generator online","generate uuid online","guid generator free","unique id generator online","uuid creator free"],
    faqs: [
      { question: "What is a UUID?",                               answer: "A UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information in computer systems." },
      { question: "Are the generated UUIDs truly unique?",         answer: "UUID v4 uses cryptographically random values making collisions virtually impossible." },
      { question: "What is the difference between UUID and GUID?", answer: "They are the same thing. GUID is Microsoft's term for UUID." },
    ],
  },
  {
    name: "Timestamp Converter", slug: "timestamp-converter", category: "Developer",
    desc: "Convert Unix timestamps to human readable dates", free: true,
    metaTitle: "Timestamp Converter Online Free — Unix to Date | 25tools",
    metaDescription: "Convert Unix timestamps to dates and back instantly. Free epoch time converter — no sign-up, runs in your browser. — 25tools",
    keywords: ["25tools timestamp converter","unix timestamp converter","epoch time converter online","timestamp to date online","unix time to date free","epoch converter online","convert unix timestamp free","timestamp decoder online"],
    faqs: [
      { question: "What is a Unix timestamp?",       answer: "A Unix timestamp is the number of seconds elapsed since January 1, 1970 (UTC), used widely in programming and databases." },
      { question: "Does this support milliseconds?", answer: "Yes, the tool automatically detects whether your input is in seconds or milliseconds." },
      { question: "What timezone does it use?",      answer: "Results are shown in both your local timezone and UTC." },
    ],
  },
  {
    name: "CSS Minifier", slug: "css-minifier", category: "Developer",
    desc: "Minify and beautify CSS instantly", free: true,
    metaTitle: "CSS Minifier Online Free — Compress & Beautify CSS | 25tools",
    metaDescription: "Minify and compress CSS instantly in your browser. Free CSS minifier and beautifier — no sign-up, no limits. — 25tools",
    keywords: ["25tools css minifier","css minifier online free","minify css online","css compressor online","compress css online free","css optimizer online","css beautifier online","css formatter free"],
    faqs: [
      { question: "How much can CSS be reduced by minifying?",  answer: "Typically 20–40% depending on how much whitespace and comments your CSS has." },
      { question: "Does minification affect how my CSS works?", answer: "No. Minification only removes unnecessary characters — the CSS behaves identically." },
      { question: "Can I also beautify minified CSS?",          answer: "Yes, use the Beautify button to format minified CSS back into readable code." },
    ],
  },
  {
    name: "Markdown to HTML", slug: "markdown-to-html", category: "Developer",
    desc: "Convert Markdown to HTML with live preview", free: true,
    metaTitle: "Markdown to HTML Online Free — Live Preview | 25tools",
    metaDescription: "Convert Markdown to HTML with live preview. Free online Markdown converter — no sign-up, instant results in browser. — 25tools",
    keywords: ["25tools markdown to html","markdown to html converter","markdown converter online free","md to html online","markdown preview online","markdown editor free","convert markdown online","markdown html generator"],
    faqs: [
      { question: "Which Markdown flavour is supported?",answer: "The tool uses the marked library which supports CommonMark and GitHub Flavored Markdown (GFM)." },
      { question: "Can I preview the rendered output?",  answer: "Yes, switch between rendered preview and raw HTML source with one click." },
      { question: "Is my Markdown saved?",               answer: "No, content is not saved anywhere. Copy or download your HTML before leaving the page." },
    ],
  },

  // ── PDF (4) ───────────────────────────────────────────────
  {
    name: "PDF Merger", slug: "pdf-merger", category: "PDF",
    desc: "Merge multiple PDFs into one file", free: true,
    metaTitle: "PDF Merger Online Free — Combine PDF Files | 25tools",
    metaDescription: "Merge multiple PDFs into one instantly. Free online PDF merger — no sign-up, no file size limit, runs in browser. — 25tools",
    keywords: ["25tools pdf merger","pdf merger online free","merge pdf online free","combine pdf files online","pdf combiner online","join pdf files free","merge pdf files free","online pdf merger tool"],
    faqs: [
      { question: "Are my PDF files uploaded to a server?",answer: "No. The PDF merger uses pdf-lib running entirely in your browser. Your files never leave your device." },
      { question: "How many PDFs can I merge at once?",    answer: "As many as you like — there is no enforced limit since all processing happens locally." },
      { question: "Will password-protected PDFs work?",    answer: "The tool attempts to load encrypted PDFs but heavily protected files may not merge correctly." },
    ],
  },
  {
    name: "PageTrim", slug: "page-trim", category: "PDF",
    desc: "Remove specific pages from a PDF visually", free: true,
    metaTitle: "PageTrim Online Free — Remove PDF Pages Instantly | 25tools",
    metaDescription: "Upload a PDF, preview all pages and remove what you don't need. Free PDF page remover — no sign-up, no limits. — 25tools",
    keywords: ["25tools pagetrim","25tools pdf page remover","pagetrim pdf tool","remove pages from pdf online free","delete pdf pages online","pdf page remover free","pdf page cutter online","trim pdf pages online"],
    faqs: [
      { question: "Does my PDF get uploaded to a server?",answer: "No. Everything runs in your browser using pdf-lib. Your PDF never leaves your device." },
      { question: "Is there a page limit?",              answer: "No page limit. Large PDFs may take a moment to preview but will process fully." },
      { question: "Can I reorder pages?",                answer: "Not yet — page reordering is coming soon. Currently you can only remove pages." },
    ],
  },
  {
    name: "Images to PDF", slug: "images-to-pdf", category: "PDF",
    desc: "Convert multiple images into a single PDF", free: true,
    metaTitle: "Images to PDF Online Free — JPG PNG to PDF | 25tools",
    metaDescription: "Convert multiple images to a PDF instantly. Free JPG and PNG to PDF converter — no sign-up, no limits, in browser. — 25tools",
    keywords: ["25tools images to pdf","images to pdf online free","jpg to pdf online free","png to pdf converter online","convert images to pdf free","photos to pdf online","multiple images to pdf","image to pdf creator free"],
    faqs: [
      { question: "What image formats are supported?",            answer: "JPG, PNG and WebP are all supported." },
      { question: "Is there a limit on how many images I can add?",answer: "No limit. Add as many images as you need." },
      { question: "Does image quality get reduced?",              answer: "No. Images are embedded at full quality in the PDF." },
    ],
  },
  {
    name: "Word to PDF", slug: "word-to-pdf", category: "PDF",
    desc: "Convert DOCX Word documents to PDF in browser", free: true,
    metaTitle: "Word to PDF Online Free — DOCX to PDF Converter | 25tools",
    metaDescription: "Convert Word documents to PDF instantly. Free DOCX to PDF converter — no sign-up, no file size limit, in browser. — 25tools",
    keywords: ["25tools word to pdf","word to pdf online free","docx to pdf converter online","convert word to pdf free","word document to pdf online","doc to pdf free","docx to pdf online","microsoft word to pdf free"],
    faqs: [
      { question: "Is there a file size limit?",      answer: "No, conversion runs entirely in your browser with no size restrictions." },
      { question: "Will my formatting be preserved?", answer: "Basic formatting like headings, bold and paragraphs are preserved. Complex layouts may vary." },
      { question: "Is my document sent to a server?", answer: "No. Everything runs locally in your browser. Your document never leaves your device." },
    ],
  },

  // ── Image (2) + Converter (1) ─────────────────────────────
  {
    name: "Image Compressor", slug: "image-compressor", category: "Image",
    desc: "Compress JPG, PNG and WebP files", free: true,
    metaTitle: "Image Compressor Online Free — Reduce Image Size | 25tools",
    metaDescription: "Compress images instantly in your browser. Free image compressor for JPG, PNG and WebP — no sign-up, no file size limit. — 25tools",
    keywords: ["25tools image compressor","image compressor online free","compress image online free","reduce image size online","jpg compressor online free","png compressor online","image size reducer free","compress photo online free"],
    faqs: [
      { question: "Does image compression happen on a server?",answer: "No. All compression runs in your browser using browser-image-compression. Your images are never uploaded." },
      { question: "What image formats are supported?",         answer: "JPG, PNG, and WebP are supported." },
      { question: "Is there a file size limit?",               answer: "No. Compression happens locally so there is no server-side restriction." },
    ],
  },
  {
    name: "Image to Base64", slug: "image-to-base64", category: "Image",
    desc: "Convert images to Base64 strings and data URIs", free: true,
    metaTitle: "Image to Base64 Online Free — Encode Images | 25tools",
    metaDescription: "Convert images to Base64 strings instantly. Get raw Base64, data URI or HTML format free — no sign-up, in browser. — 25tools",
    keywords: ["25tools image to base64","image to base64 online free","convert image to base64","base64 image encoder online","jpg to base64 online","png to base64 converter","image base64 converter free","encode image base64 online"],
    faqs: [
      { question: "What is Base64 image encoding used for?",answer: "Base64 encoded images can be embedded directly in HTML, CSS or JSON without needing a separate image file." },
      { question: "Does the image get uploaded anywhere?",   answer: "No. Conversion uses the browser's FileReader API entirely locally." },
      { question: "Will Base64 increase my image file size?",answer: "Yes, Base64 encoding increases size by approximately 33% compared to the original binary file." },
    ],
  },
  {
    name: "QR Generator", slug: "qr-generator", category: "Converter",
    desc: "Generate QR codes for any URL or text", free: true,
    metaTitle: "QR Code Generator Online Free — Create QR Codes | 25tools",
    metaDescription: "Generate QR codes for any URL or text instantly. Free online QR code generator — no sign-up, download as PNG. — 25tools",
    keywords: ["25tools qr generator","qr code generator online free","generate qr code online","free qr code maker online","qr code creator free","qr code generator free","make qr code online free","qr code generator tool"],
    faqs: [
      { question: "What can I encode in a QR code?",       answer: "Any plain text or URL including website links, contact details, and Wi-Fi credentials." },
      { question: "What size should I choose?",            answer: "128px for digital, 256px for standard print, 512px for large-format printing." },
      { question: "Is the QR code generated on a server?", answer: "No. QR codes are generated entirely in your browser." },
    ],
  },

  // ── Text (2) ──────────────────────────────────────────────
  {
    name: "Word Counter", slug: "word-counter", category: "Text",
    desc: "Count words, characters and reading time", free: true,
    metaTitle: "Word Counter Online Free — Character & Word Count | 25tools",
    metaDescription: "Count words, characters, sentences and reading time instantly. Free online word counter — no sign-up, in browser. — 25tools",
    keywords: ["25tools word counter","word counter online free","character counter online","word count tool online","online word counter free","text word counter","count words online free","word character counter"],
    faqs: [
      { question: "How is reading time calculated?",        answer: "Reading time is estimated at 200 words per minute, rounded up to the nearest minute." },
      { question: "Does the word counter work in real time?",answer: "Yes. All statistics update live as you type or paste text." },
      { question: "Is there a character or word limit?",    answer: "No. The tool runs entirely in your browser so there is no limit." },
    ],
  },
  {
    name: "Case Converter", slug: "case-converter", category: "Text",
    desc: "Convert text between cases instantly", free: true,
    metaTitle: "Case Converter Online Free — Text Case Changer | 25tools",
    metaDescription: "Convert text between uppercase, lowercase, title case and more. Free case converter — no sign-up, instant results. — 25tools",
    keywords: ["25tools case converter","case converter online free","text case converter online","uppercase lowercase converter","convert text case online","title case converter free","camelcase converter online","snake case converter free"],
    faqs: [
      { question: "Which case formats are supported?",           answer: "UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and snake_case." },
      { question: "Does case conversion work with special characters?",answer: "Yes for standard conversions. camelCase and snake_case strip special characters." },
      { question: "Can I convert large amounts of text?",        answer: "Yes. The tool runs in your browser with no size restrictions." },
    ],
  },

  // ── Developer/Utility ─────────────────────────────────────
  {
    name: "Password Generator", slug: "password-generator", category: "Developer",
    desc: "Generate strong random passwords instantly", free: true,
    metaTitle: "Password Generator Online Free — Strong Passwords | 25tools",
    metaDescription: "Generate strong random passwords instantly. Free password generator — customize length and characters, no sign-up. — 25tools",
    keywords: ["25tools password generator","password generator online free","strong password generator","random password generator","secure password generator online","free password maker","password creator online free","generate strong password"],
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