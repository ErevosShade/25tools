"use client";

import { useState, useCallback, useEffect } from "react";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

const UPPER   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER   = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generateOne(length: number, opts: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean }): string {
  let chars = "";
  if (opts.upper)   chars += UPPER;
  if (opts.lower)   chars += LOWER;
  if (opts.numbers) chars += NUMBERS;
  if (opts.symbols) chars += SYMBOLS;
  if (!chars) chars = LOWER;
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((n) => chars[n % chars.length]).join("");
}

function getStrength(pwd: string): { label: string; score: number } {
  let score = 0;
  if (pwd.length >= 12) score++;
  if (pwd.length >= 16) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 2) return { label: "Weak",      score: 1 };
  if (score <= 3) return { label: "Fair",      score: 2 };
  if (score <= 4) return { label: "Strong",    score: 3 };
  return               { label: "Very Strong", score: 4 };
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button type="button" onClick={async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className={cn("h-6 px-2 rounded-[5px] border text-[11px] font-[500] leading-none transition-colors duration-100 shrink-0",
        copied ? "bg-green-50 border-green-200 text-green-700" : "bg-white border-[#E5E5E5] text-[#6B6B6B] hover:border-[#0A0A0A]")}>
      {copied ? "✓" : "Copy"}
    </button>
  );
}

export default function PasswordGeneratorPage() {
  const [length,  setLength]  = useState(16);
  const [upper,   setUpper]   = useState(true);
  const [lower,   setLower]   = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [bulk,     setBulk]     = useState<string[]>([]);

  const opts = { upper, lower, numbers, symbols };

  const generate = useCallback(() => {
    setPassword(generateOne(length, opts));
    setBulk([]);
  }, [length, upper, lower, numbers, symbols]);

  const generateBulk = useCallback(() => {
    setBulk(Array.from({ length: 10 }, () => generateOne(length, opts)));
  }, [length, upper, lower, numbers, symbols]);

  useEffect(() => { generate(); }, []);

  const strength = password ? getStrength(password) : null;
  const strengthColors = ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"];
  const strengthLabels = ["", "text-red-600", "text-yellow-600", "text-blue-600", "text-green-600"];

  return (
    <ToolPageWrapper
      toolName="Password Generator"
      description="Generate strong, cryptographically random passwords instantly. Customize length and character types."
      category="Developer"
      isFree={true}
      howItWorks={[
        "Set your desired password length and toggle character types.",
        "Click the regenerate button to create a new password with the current settings.",
        "Use 'Generate 10 passwords' for bulk generation.",
      ]}
      relatedTools={[
        { name: "UUID Generator",      slug: "uuid-generator",      desc: "Generate random UUID v4 strings in bulk" },
        { name: "Base64 Encoder",      slug: "base64-encoder",      desc: "Encode and decode Base64 strings"        },
        { name: "Timestamp Converter", slug: "timestamp-converter", desc: "Convert Unix timestamps to human dates"   },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* Password display */}
        <div className="flex items-center gap-3 p-4 rounded-[10px] border border-[#E5E5E5] bg-[#F5F5F5]">
          <p className="flex-1 font-mono text-[18px] font-[500] text-[#0A0A0A] break-all m-0 leading-snug min-w-0">
            {password || "—"}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            {password && <CopyBtn text={password} />}
            <button type="button" onClick={generate} aria-label="Regenerate password"
              className="w-8 h-8 rounded-[6px] border border-[#E5E5E5] bg-white flex items-center justify-center text-[#6B6B6B] hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 8A6 6 0 102 8" /><polyline points="14 4 14 8 10 8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Strength */}
        {strength && (
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-1">
              {[1,2,3,4].map((s) => (
                <div key={s} className={cn("flex-1 h-1.5 rounded-full transition-colors duration-300",
                  s <= strength.score ? strengthColors[strength.score] : "bg-[#E5E5E5]")} />
              ))}
            </div>
            <p className={cn("text-[12px] font-[500] leading-none m-0", strengthLabels[strength.score])}>
              {strength.label}
            </p>
          </div>
        )}

        {/* Length */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between leading-none">
            <label className="text-[13px] font-[500] text-[#0A0A0A]">Length</label>
            <span className="text-[13px] font-[500] text-[#0A0A0A] tabular-nums">{length}</span>
          </div>
          <input type="range" min={8} max={64} step={1} value={length}
            onChange={(e) => { setLength(Number(e.target.value)); generate(); }}
            className="w-full h-1.5 appearance-none rounded-full bg-[#E5E5E5] cursor-pointer accent-[#0A0A0A]" />
          <div className="flex justify-between text-[11px] text-[#9B9B9B]">
            <span>8</span><span>64</span>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Uppercase (A-Z)",         value: upper,   set: setUpper   },
            { label: "Lowercase (a-z)",          value: lower,   set: setLower   },
            { label: "Numbers (0-9)",            value: numbers, set: setNumbers },
            { label: "Symbols (!@#$%...)",       value: symbols, set: setSymbols },
          ].map(({ label, value, set }) => (
            <label key={label} className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={value}
                onChange={(e) => { set(e.target.checked); generate(); }}
                className="w-4 h-4 accent-[#0A0A0A] cursor-pointer" />
              <span className="text-[13px] font-[400] text-[#0A0A0A] leading-none">{label}</span>
            </label>
          ))}
        </div>

        <div className="h-px bg-[#E5E5E5]" />

        {/* Bulk */}
        <div className="flex flex-col gap-3">
          <button type="button" onClick={generateBulk}
            className={cn("w-full h-9 rounded-[8px] border border-[#E5E5E5] bg-white",
              "text-[13px] font-[500] text-[#0A0A0A] leading-none",
              "transition-colors duration-100 hover:border-[#0A0A0A]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2")}>
            Generate 10 passwords
          </button>
          {bulk.length > 0 && (
            <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
              {bulk.map((pwd, i) => (
                <li key={i} className="flex items-center gap-3 px-3 py-2 rounded-[6px] border border-[#E5E5E5] bg-[#F5F5F5]">
                  <span className="flex-1 font-mono text-[12px] text-[#0A0A0A] break-all min-w-0">{pwd}</span>
                  <CopyBtn text={pwd} />
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </ToolPageWrapper>
  );
}