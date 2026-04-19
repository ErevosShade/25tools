import { NextRequest, NextResponse } from "next/server";
import { PDFDocument }               from "pdf-lib";

const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const entries  = formData.getAll("files[]") as File[];

    // ── Validation ──
    if (!entries || entries.length < 2) {
      return NextResponse.json(
        { error: "Upload at least 2 PDF files." },
        { status: 400 }
      );
    }

    for (const file of entries) {
      if (file.type !== "application/pdf") {
        return NextResponse.json(
          { error: `"${file.name}" is not a PDF file.` },
          { status: 400 }
        );
      }
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { error: `"${file.name}" exceeds the 5MB limit.` },
          { status: 413 }
        );
      }
    }

    // ── Merge ──
    const merged = await PDFDocument.create();

    for (const file of entries) {
      const buffer  = await file.arrayBuffer();
      const doc     = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const indices = doc.getPageIndices();                      // [0, 1, 2 ...]
      const pages   = await merged.copyPages(doc, indices);      // ✅ correct API
      pages.forEach((page) => merged.addPage(page));
    }

    const mergedBytes = await merged.save();

    return new NextResponse(new Uint8Array(mergedBytes), {
      status: 200,
      headers: {
        "Content-Type":        "application/pdf",
        "Content-Disposition": 'attachment; filename="merged.pdf"',
        "Content-Length":      mergedBytes.byteLength.toString(),
      },
    });

  } catch (err) {
    console.error("[merge-pdf]", err);
    return NextResponse.json(
      { error: "Merge failed. One or more PDFs may be corrupted or password-protected." },
      { status: 500 }
    );
  }
}