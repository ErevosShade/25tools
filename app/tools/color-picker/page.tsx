"use client";

import { useState, useCallback } from "react";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

// ─── Color math ───────────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function mixWithWhite(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `#${[mix(r), mix(g), mix(b)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function mixWithBlack(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const mix = (c: number) => Math.round(c * (1 - amount));
  return `#${[mix(r), mix(g), mix(b)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

// ─── Copy button ──────────────────────────────────────────────
function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "h-7 px-2.5 rounded-[6px] border text-[11px] font-[500] leading-none shrink-0 transition-colors duration-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1",
        copied
          ? "bg-green-50 border-green-200 text-green-700"
          : "bg-white border-[#E5E5E5] text-[#6B6B6B] hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
      )}
    >
      {copied ? "✓" : "Copy"}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function ColorPickerPage() {
  const [hex, setHex] = useState("#6B6B6B");

  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);

  const rgbString = `rgb(${r}, ${g}, ${b})`;
  const hslString = `hsl(${h}, ${s}%, ${l}%)`;

  const tints  = [0.9, 0.7, 0.5, 0.3, 0.1].map((a) => mixWithWhite(hex, a));
  const shades = [0.1, 0.2, 0.35, 0.5, 0.7].map((a) => mixWithBlack(hex, a));

  const formats = [
    { label: "HEX", value: hex.toUpperCase() },
    { label: "RGB", value: rgbString          },
    { label: "HSL", value: hslString          },
  ];

  return (
    <ToolPageWrapper
      toolName="Color Picker"
      description="Pick any color and instantly get HEX, RGB, and HSL values. Explore tints and shades."
      category="Developer"
      isFree={true}
      howItWorks={[
        "Click the color swatch to open the browser color picker.",
        "HEX, RGB, and HSL values update instantly — click Copy beside any format.",
        "Explore auto-generated tints (mixed with white) and shades (mixed with black) below.",
      ]}
      relatedTools={[
        { name: "Image Compressor", slug: "image-compressor", desc: "Compress JPG, PNG and WebP files"    },
        { name: "JSON Formatter",   slug: "json-formatter",   desc: "Format and validate JSON instantly"  },
        { name: "Base64 Encoder",   slug: "base64-encoder",   desc: "Encode and decode Base64 strings"   },
      ]}
    >
      <div className="flex flex-col gap-6">

        {/* Picker + swatch */}
        <div className="flex items-center gap-4">
          <label className="relative cursor-pointer" aria-label="Pick a color">
            <div
              className="w-16 h-16 rounded-[10px] border-2 border-[#E5E5E5] shadow-sm transition-transform hover:scale-105"
              style={{ backgroundColor: hex }}
            />
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="sr-only"
            />
          </label>
          <div className="flex flex-col gap-1">
            <p className="text-[20px] font-[500] text-[#0A0A0A] leading-none tracking-[-0.01em] m-0">
              {hex.toUpperCase()}
            </p>
            <p className="text-[13px] text-[#6B6B6B] leading-none m-0">
              Click the swatch to change color
            </p>
          </div>
        </div>

        {/* Format rows */}
        <div className="flex flex-col gap-2">
          {formats.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5]"
            >
              <span className="text-[11px] font-[500] text-[#6B6B6B] uppercase tracking-[0.06em] w-8 shrink-0">
                {label}
              </span>
              <span className="flex-1 font-mono text-[13px] text-[#0A0A0A] leading-none">
                {value}
              </span>
              <CopyButton value={value} />
            </div>
          ))}
        </div>

        <div className="h-px bg-[#E5E5E5]" />

        {/* Tints */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-[500] text-[#6B6B6B] uppercase tracking-[0.07em] leading-none m-0">
            Tints
          </p>
          <div className="grid grid-cols-5 gap-2">
            {tints.map((color, i) => (
              <div key={i} className="flex flex-col gap-1.5 items-center">
                <div
                  className="w-full aspect-square rounded-[8px] border border-[#E5E5E5] cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => setHex(color)}
                  title={color.toUpperCase()}
                />
                <span className="text-[10px] font-mono text-[#6B6B6B] leading-none">
                  {color.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shades */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-[500] text-[#6B6B6B] uppercase tracking-[0.07em] leading-none m-0">
            Shades
          </p>
          <div className="grid grid-cols-5 gap-2">
            {shades.map((color, i) => (
              <div key={i} className="flex flex-col gap-1.5 items-center">
                <div
                  className="w-full aspect-square rounded-[8px] border border-[#E5E5E5] cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => setHex(color)}
                  title={color.toUpperCase()}
                />
                <span className="text-[10px] font-mono text-[#6B6B6B] leading-none">
                  {color.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ToolPageWrapper>
  );
}