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
  // ── Original 10 ──────────────────────────────────────────
  {
    name: "JSON Formatter", slug: "json-formatter", category: "Developer",
    desc: "Format and validate JSON instantly", free: true,
    metaTitle: "JSON Formatter Online — Free JSON Validator | DevKit25",
    metaDescription: "Format, validate and minify JSON instantly in your browser. Free, no sign-up required.",
    keywords: ["json formatter","json validator","json beautifier","format json online","json pretty print","25tools"],
    faqs: [
      { question: "Is the JSON formatter free to use?", answer: "Yes, completely free with no sign-up or account required." },
      { question: "Does my JSON data get sent to a server?", answer: "No. Everything runs entirely in your browser. Your data never leaves your device." },
      { question: "Is there a file size limit?", answer: "There is no enforced file size limit. The tool runs locally in your browser." },
    ],
  },
  {
    name: "Regex Tester", slug: "regex-tester", category: "Developer",
    desc: "Test regex patterns with live highlighting", free: true,
    metaTitle: "Regex Tester Online — Live Regular Expression Tester | DevKit25",
    metaDescription: "Test and debug regular expressions with live match highlighting. Free regex tester, no sign-up.",
    keywords: ["regex tester","regular expression tester","regex online","test regex","regex debugger","25tools"],
    faqs: [
      { question: "Which regex flags are supported?", answer: "The tester supports g (global), i (case-insensitive), and m (multiline) flags." },
      { question: "Does the regex tester support lookaheads?", answer: "Yes. It uses the native JavaScript RegExp engine which supports all modern regex features." },
      { question: "Is my test data private?", answer: "Completely. The regex tester runs entirely in your browser. Nothing is sent to any server." },
    ],
  },
  {
    name: "Base64 Encoder", slug: "base64-encoder", category: "Developer",
    desc: "Encode and decode Base64 strings", free: true,
    metaTitle: "Base64 Encoder & Decoder Online — Free Tool | DevKit25",
    metaDescription: "Encode text to Base64 or decode Base64 strings back to plain text instantly. Free, no sign-up.",
    keywords: ["base64 encoder","base64 decoder","base64 online","encode base64","decode base64","25tools"],
    faqs: [
      { question: "What is Base64 encoding used for?", answer: "Base64 is used to encode binary data for text-based protocols, embed images in CSS/HTML, and encode JWTs." },
      { question: "Can I decode any Base64 string?", answer: "Yes, as long as the string is valid Base64. Invalid input shows an error message." },
      { question: "Does this tool handle Unicode characters?", answer: "Yes. The encoder uses encodeURIComponent before btoa to handle Unicode correctly." },
    ],
  },
  {
    name: "Image Compressor", slug: "image-compressor", category: "Image",
    desc: "Compress JPG, PNG and WebP files", free: true,
    metaTitle: "Image Compressor Online — Compress JPG, PNG, WebP Free | DevKit25",
    metaDescription: "Compress JPG, PNG and WebP images in your browser. No upload limits, no sign-up.",
    keywords: ["image compressor","compress image online","reduce image size","jpg compressor","png compressor","25tools"],
    faqs: [
      { question: "Does image compression happen on a server?", answer: "No. All compression runs directly in your browser. Your images are never uploaded." },
      { question: "What image formats are supported?", answer: "JPG, PNG, and WebP are supported." },
      { question: "Is there a file size limit?", answer: "No. Compression happens locally so there is no server-side restriction." },
    ],
  },
  {
    name: "PDF Merger", slug: "pdf-merger", category: "PDF",
    desc: "Merge multiple PDFs into one file", free: true,
    metaTitle: "PDF Merger Online — Combine PDFs Free | DevKit25",
    metaDescription: "Merge multiple PDF files into one document instantly. Free PDF merger, no sign-up required.",
    keywords: ["pdf merger","merge pdf online","combine pdf","join pdf files","pdf combiner","25tools"],
    faqs: [
      { question: "Are my PDF files uploaded to a server?", answer: "No. The PDF merger uses pdf-lib running entirely in your browser." },
      { question: "How many PDFs can I merge at once?", answer: "As many as you like — no enforced limit." },
      { question: "Will password-protected PDFs work?", answer: "The tool attempts to load encrypted PDFs but heavily protected files may not merge correctly." },
    ],
  },
  {
    name: "QR Generator", slug: "qr-generator", category: "Converter",
    desc: "Generate QR codes for any URL or text", free: true,
    metaTitle: "QR Code Generator Online — Free QR Code Maker | DevKit25",
    metaDescription: "Generate QR codes for any URL or text instantly. Download as PNG. Free, no sign-up.",
    keywords: ["qr code generator","qr code maker","create qr code","free qr code","qr code online","25tools"],
    faqs: [
      { question: "What can I encode in a QR code?", answer: "Any plain text or URL including website links, contact details, and Wi-Fi credentials." },
      { question: "What size should I choose?", answer: "128px for digital, 256px for standard print, 512px for large-format printing." },
      { question: "Is the QR code generated on a server?", answer: "No. QR codes are generated entirely in your browser." },
    ],
  },
  {
    name: "Word Counter", slug: "word-counter", category: "Text",
    desc: "Count words, characters and reading time", free: true,
    metaTitle: "Word Counter Online — Free Character & Reading Time Counter | DevKit25",
    metaDescription: "Count words, characters, sentences and reading time instantly. Free online word counter.",
    keywords: ["word counter","character counter","word count online","count words","reading time calculator","25tools"],
    faqs: [
      { question: "How is reading time calculated?", answer: "Reading time is estimated at 200 words per minute, rounded up to the nearest minute." },
      { question: "Does the word counter work in real time?", answer: "Yes. All statistics update live as you type or paste text." },
      { question: "Is there a character or word limit?", answer: "No. The tool runs entirely in your browser so there is no limit." },
    ],
  },
  {
    name: "Case Converter", slug: "case-converter", category: "Text",
    desc: "Convert text between cases instantly", free: true,
    metaTitle: "Case Converter Online — UPPER, lower, Title, camelCase | DevKit25",
    metaDescription: "Convert text between uppercase, lowercase, title case, camelCase and snake_case instantly. Free, no sign-up.",
    keywords: ["case converter","text case converter","uppercase converter","camelcase converter","snake case converter","25tools"],
    faqs: [
      { question: "Which case formats are supported?", answer: "UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and snake_case." },
      { question: "Does case conversion work with special characters?", answer: "Yes for standard conversions. camelCase and snake_case strip special characters." },
      { question: "Can I convert large amounts of text?", answer: "Yes. The tool runs in your browser with no size restrictions." },
    ],
  },
  {
    name: "Color Picker", slug: "color-picker", category: "Developer",
    desc: "Pick colors and convert between formats", free: true,
    metaTitle: "Color Picker Online — HEX, RGB, HSL Converter | DevKit25",
    metaDescription: "Pick any color and instantly convert between HEX, RGB and HSL. Free online color picker.",
    keywords: ["color picker","color picker online","hex to rgb","rgb to hex","color converter","25tools"],
    faqs: [
      { question: "Can I enter a HEX code directly?", answer: "Yes. Click the color swatch to open the browser color picker and input a HEX code." },
      { question: "How are tints and shades generated?", answer: "Tints mix the color with white; shades mix with black at varying proportions." },
      { question: "Can I copy the color values?", answer: "Yes. Each format has its own Copy button." },
    ],
  },
  {
    name: "URL Encoder", slug: "url-encoder", category: "Developer",
    desc: "Encode and decode URLs safely", free: true,
    metaTitle: "URL Encoder & Decoder Online — Free URL Encode Tool | DevKit25",
    metaDescription: "Encode special characters in URLs or decode percent-encoded strings. Free, no sign-up.",
    keywords: ["url encoder","url decoder","url encode online","percent encoding","encode url online","25tools"],
    faqs: [
      { question: "What is URL encoding used for?", answer: "URL encoding converts special characters so they can be safely used in URLs and query strings." },
      { question: "What is the difference between encode and decode?", answer: "Encoding converts text to URL-safe format; decoding reverses it." },
      { question: "Is my data sent to a server?", answer: "No. URL encoding happens entirely in your browser." },
    ],
  },

  // ── New 10 ────────────────────────────────────────────────
  {
    name: "JWT Reader", slug: "jwt-reader", category: "Developer",
    desc: "Decode and inspect JWT tokens instantly", free: true,
    metaTitle: "JWT Token Decoder Online — Free JWT Reader & Inspector | DevKit25",
    metaDescription: "Decode and inspect JWT tokens instantly in your browser. View header, payload and expiry. Free, no sign-up, your token never leaves your device.",
    keywords: ["jwt decoder","jwt token reader","decode jwt online","jwt inspector","json web token decoder","jwt payload decoder","25tools"],
    faqs: [
      { question: "Is it safe to paste my JWT here?", answer: "Yes. The token is decoded entirely in your browser using JavaScript. Nothing is sent to any server." },
      { question: "Can you verify the JWT signature?", answer: "No, signature verification requires the secret key which you should never share. This tool only decodes the payload." },
      { question: "What is a JWT token?", answer: "A JSON Web Token is a compact, URL-safe way to represent claims between two parties, commonly used for authentication." },
    ],
  },
  {
    name: "PageTrim - PDF Cutter Tool", slug: "pdf-cutter", category: "PDF",
    desc: "Remove specific pages from a PDF visually", free: true,
    metaTitle: "PDF Page Remover Online — Delete PDF Pages Free | DevKit25",
    metaDescription: "Upload a PDF and visually select pages to remove. Preview all pages, delete what you don't need and download instantly. Free, no sign-up required.",
    keywords: ["pdf page remover","delete pages from pdf","pdf cutter online","remove pdf pages free","pdf page deleter","split pdf online","25tools"],
    faqs: [
      { question: "Does my PDF get uploaded to a server?", answer: "No. Everything runs in your browser using pdf-lib. Your PDF never leaves your device." },
      { question: "Is there a page limit?", answer: "No page limit. Large PDFs may take a moment to preview but will process fully." },
      { question: "Can I reorder pages?", answer: "Not yet — page reordering is coming soon. Currently you can only remove pages." },
    ],
  },
  {
    name: "Images to PDF", slug: "images-to-pdf", category: "PDF",
    desc: "Convert multiple images into a single PDF", free: true,
    metaTitle: "Images to PDF Converter Online — Free JPG to PDF | DevKit25",
    metaDescription: "Convert multiple images to a PDF instantly. Upload JPG, PNG or WebP files, arrange the order and download your PDF. Free, no sign-up, runs in browser.",
    keywords: ["images to pdf","jpg to pdf online","png to pdf free","convert images to pdf","photos to pdf","image to pdf converter","25tools"],
    faqs: [
      { question: "What image formats are supported?", answer: "JPG, PNG and WebP are all supported." },
      { question: "Is there a limit on how many images I can add?", answer: "No limit. Add as many images as you need." },
      { question: "Does image quality get reduced?", answer: "No. Images are embedded at full quality in the PDF." },
    ],
  },
  {
    name: "Password Generator", slug: "password-generator", category: "Developer",
    desc: "Generate strong random passwords instantly", free: true,
    metaTitle: "Password Generator Online — Free Strong Password Creator | DevKit25",
    metaDescription: "Generate strong, random passwords instantly. Customize length and character types. Free online password generator — no sign-up, runs in your browser.",
    keywords: ["password generator","strong password generator","random password generator online","secure password creator","free password generator","25tools"],
    faqs: [
      { question: "Are generated passwords stored anywhere?", answer: "No. Passwords are generated locally in your browser and never sent to any server." },
      { question: "How strong are the generated passwords?", answer: "Using all character types with 16+ characters creates extremely strong passwords that would take centuries to brute-force." },
      { question: "Can I use symbols in passwords?", answer: "Yes, you can toggle symbols on or off depending on what the site you are registering for allows." },
    ],
  },
  {
    name: "Timestamp Converter", slug: "timestamp-converter", category: "Developer",
    desc: "Convert Unix timestamps to human readable dates", free: true,
    metaTitle: "Unix Timestamp Converter Online — Free Epoch Time Tool | DevKit25",
    metaDescription: "Convert Unix timestamps to human readable dates and back. Supports seconds and milliseconds. Free online epoch converter — instant, no sign-up.",
    keywords: ["unix timestamp converter","epoch time converter","timestamp to date","unix time online","epoch converter","convert timestamp","25tools"],
    faqs: [
      { question: "What is a Unix timestamp?", answer: "A Unix timestamp is the number of seconds elapsed since January 1, 1970 (UTC), used widely in programming and databases." },
      { question: "Does this support milliseconds?", answer: "Yes, the tool automatically detects whether your input is in seconds or milliseconds." },
      { question: "What timezone does it use?", answer: "Results are shown in both your local timezone and UTC." },
    ],
  },
  {
    name: "UUID Generator", slug: "uuid-generator", category: "Developer",
    desc: "Generate random UUID v4 strings in bulk", free: true,
    metaTitle: "UUID Generator Online — Free Random UUID v4 Creator | DevKit25",
    metaDescription: "Generate random UUID v4 strings instantly. Bulk generate up to 100 UUIDs, copy individually or all at once. Free, no sign-up, runs in browser.",
    keywords: ["uuid generator","random uuid generator","uuid v4 online","generate uuid free","unique id generator","guid generator","25tools"],
    faqs: [
      { question: "What is a UUID?", answer: "A UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information in computer systems." },
      { question: "Are the generated UUIDs truly unique?", answer: "UUID v4 uses cryptographically random values making collisions virtually impossible." },
      { question: "What is the difference between UUID and GUID?", answer: "They are the same thing. GUID is Microsoft's term for UUID." },
    ],
  },
  {
    name: "Markdown to HTML", slug: "markdown-to-html", category: "Developer",
    desc: "Convert Markdown to HTML with live preview", free: true,
    metaTitle: "Markdown to HTML Converter Online — Free Live Preview | DevKit25",
    metaDescription: "Convert Markdown to HTML instantly with a live preview. Free online Markdown converter — paste your text and see the rendered output in real time.",
    keywords: ["markdown to html","markdown converter online","md to html free","markdown preview online","markdown editor online","convert markdown","25tools"],
    faqs: [
      { question: "Which Markdown flavour is supported?", answer: "The tool uses the marked library which supports CommonMark and GitHub Flavored Markdown (GFM)." },
      { question: "Can I preview the rendered output?", answer: "Yes, switch between rendered preview and raw HTML source with one click." },
      { question: "Is my Markdown saved?", answer: "No, content is not saved anywhere. Copy or download your HTML before leaving the page." },
    ],
  },
  {
    name: "CSS Minifier", slug: "css-minifier", category: "Developer",
    desc: "Minify and beautify CSS instantly", free: true,
    metaTitle: "CSS Minifier Online — Free CSS Compressor & Beautifier | DevKit25",
    metaDescription: "Minify and compress CSS instantly in your browser. Remove whitespace and comments to reduce file size. Free CSS minifier — no sign-up required.",
    keywords: ["css minifier","css compressor online","minify css free","css beautifier","compress css","css optimizer online","25tools"],
    faqs: [
      { question: "How much can CSS be reduced by minifying?", answer: "Typically 20–40% depending on how much whitespace and comments your CSS has." },
      { question: "Does minification affect how my CSS works?", answer: "No. Minification only removes unnecessary characters — the CSS behaves identically." },
      { question: "Can I also beautify minified CSS?", answer: "Yes, use the Beautify button to format minified CSS back into readable code." },
    ],
  },
  {
    name: "Word to PDF", slug: "word-to-pdf", category: "PDF",
    desc: "Convert DOCX Word documents to PDF in browser", free: true,
    metaTitle: "Word to PDF Converter Online — Free DOCX to PDF | DevKit25",
    metaDescription: "Convert Word documents to PDF instantly in your browser. Upload your DOCX file and download a PDF in seconds. Free, no sign-up, no file size limit.",
    keywords: ["word to pdf","docx to pdf online free","convert word to pdf","word document to pdf","docx to pdf converter","free word to pdf","25tools"],
    faqs: [
      { question: "Is there a file size limit?", answer: "No, conversion runs entirely in your browser with no size restrictions." },
      { question: "Will my formatting be preserved?", answer: "Basic formatting like headings, bold and paragraphs are preserved. Complex layouts may vary." },
      { question: "Is my document sent to a server?", answer: "No. Everything runs locally in your browser. Your document never leaves your device." },
    ],
  },
  {
    name: "Image to Base64", slug: "image-to-base64", category: "Developer",
    desc: "Convert images to Base64 strings and data URIs", free: true,
    metaTitle: "Image to Base64 Converter Online — Free Encoder | DevKit25",
    metaDescription: "Convert images to Base64 strings instantly. Get raw Base64, data URI, CSS or HTML img tag format. Free online image encoder — no sign-up, runs in browser.",
    keywords: ["image to base64","image base64 encoder","convert image to base64 online","base64 image encoder","jpg to base64","png to base64 online","25tools"],
    faqs: [
      { question: "What is Base64 image encoding used for?", answer: "Base64 encoded images can be embedded directly in HTML, CSS or JSON without needing a separate image file." },
      { question: "Does the image get uploaded anywhere?", answer: "No. Conversion uses the browser's FileReader API entirely locally." },
      { question: "Will Base64 increase my image file size?", answer: "Yes, Base64 encoding increases size by approximately 33% compared to the original binary file." },
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