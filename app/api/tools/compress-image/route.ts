import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

const MAX_SIZE       = 5 * 1024 * 1024;
const MAX_FILES      = 10;
const ALLOWED_TYPES  = ["image/jpeg", "image/png", "image/webp"];

interface CompressedResult {
  name:           string;
  originalSize:   number;
  compressedSize: number;
  contentType:    string;
  data:           string; // base64
}

async function compressOne(
  buffer: Buffer,
  mimeType: string,
  quality: number
): Promise<{ data: Buffer; contentType: string }> {
  const clamped = Math.min(100, Math.max(1, quality));
  const img     = sharp(buffer);
  const meta    = await img.metadata();

  if (mimeType === "image/jpeg") {
    const data = await sharp(buffer)
      .jpeg({
        quality:              clamped,
        mozjpeg:              true,
        chromaSubsampling:    clamped < 50 ? "4:2:0" : "4:4:4",
        trellisQuantisation:  true,
        overshootDeringing:   true,
        optimizeScans:        true,
      })
      .toBuffer();
    return { data, contentType: "image/jpeg" };
  }

  if (mimeType === "image/png") {
    // For PNG: use palette quantisation below quality 70,
    // otherwise lossless deflate with maximum compression.
    if (clamped < 70) {
      // Palette (lossy) — dramatically smaller files
      const colors = Math.max(2, Math.round((clamped / 70) * 256));
      const data   = await sharp(buffer)
        .png({
          palette:           true,
          colors:            colors,
          dither:            clamped < 40 ? 0.5 : 1.0,
          compressionLevel:  9,
          adaptiveFiltering: true,
          effort:            10,
        })
        .toBuffer();
      return { data, contentType: "image/png" };
    } else {
      // Lossless but max deflate
      const data = await sharp(buffer)
        .png({
          compressionLevel:  9,
          adaptiveFiltering: true,
          effort:            10,
        })
        .toBuffer();
      return { data, contentType: "image/png" };
    }
  }

  if (mimeType === "image/webp") {
    const data = await sharp(buffer)
      .webp({
        quality:      clamped,
        effort:       6,
        smartSubsample: true,
        nearLossless: clamped > 85,
        lossless:     clamped === 100,
      })
      .toBuffer();
    return { data, contentType: "image/webp" };
  }

  throw new Error("Unsupported format");
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const quality  = parseInt(formData.get("quality") as string ?? "80", 10);

    // ── Support both single file ("file") and multiple ("files[]") ──
    const single    = formData.get("files[]") ?? formData.get("file");
    const multiRaw  = formData.getAll("files[]");
    const files     = (multiRaw.length > 0 ? multiRaw : [single]).filter(Boolean) as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided." }, { status: 400 });
    }
    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Too many files. Max ${MAX_FILES} at once.` },
        { status: 400 }
      );
    }

    // ── Validate all before processing ──
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `"${file.name}": unsupported type. Use JPG, PNG, or WebP.` },
          { status: 400 }
        );
      }
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { error: `"${file.name}" is over 5MB.` },
          { status: 413 }
        );
      }
    }

    // ── Process all files ──
    const results: CompressedResult[] = await Promise.all(
      files.map(async (file) => {
        const buffer             = Buffer.from(await file.arrayBuffer());
        const { data, contentType } = await compressOne(buffer, file.type, quality);
        return {
          name:           file.name,
          originalSize:   file.size,
          compressedSize: data.length,
          contentType,
          data:           data.toString("base64"),
        };
      })
    );

    // ── Single file: return binary directly (backward compat) ──
    if (results.length === 1) {
      const r = results[0];
      return new NextResponse(Buffer.from(r.data, "base64"), {
        status: 200,
        headers: {
          "Content-Type":      r.contentType,
          "Content-Length":    r.compressedSize.toString(),
          "X-Original-Size":   r.originalSize.toString(),
          "X-Compressed-Size": r.compressedSize.toString(),
          "X-File-Name":       encodeURIComponent(r.name),
        },
      });
    }

    // ── Multiple files: return JSON with base64 payloads ──
    return NextResponse.json({ results });

  } catch (err) {
    console.error("[compress-image]", err);
    return NextResponse.json(
      { error: "Compression failed. Please try again." },
      { status: 500 }
    );
  }
}