"use client";

import { useState, useCallback } from "react";
import { ToolPageWrapper } from "@/components/tools/ToolPageWrapper";
import { cn } from "@/lib/utils";

interface JwtParts {
  header:    Record<string, unknown>;
  payload:   Record<string, unknown>;
  signature: string;
}

function base64UrlDecode(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded  = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
  return decodeURIComponent(
    atob(padded)
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("")
  );
}

function formatTimestamp(unix: number): string {
  return new Date(unix * 1000).toLocaleString(undefined, {
    dateStyle: "medium", timeStyle: "medium",
  });
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "h-6 px-2 rounded-[5px] border text-[11px] font-[500] leading-none transition-colors duration-100",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0A0A0A]",
        copied
          ? "bg-green-50 border-green-200 text-green-700"
          : "bg-white border-[#E5E5E5] text-[#6B6B6B] hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
      )}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function JwtCard({
  title,
  content,
  children,
}: {
  title:    string;
  content:  string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 border border-[#E5E5E5] rounded-[10px] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E5E5] bg-[#F5F5F5]">
        <span className="text-[12px] font-[500] text-[#0A0A0A] uppercase tracking-[0.05em] leading-none">
          {title}
        </span>
        <CopyButton text={content} />
      </div>
      {children && (
        <div className="px-4 pb-3 flex flex-col gap-2">
          {children}
        </div>
      )}
      <pre className="px-4 pb-4 text-[12px] font-mono text-[#0A0A0A] leading-relaxed overflow-x-auto whitespace-pre-wrap break-all m-0">
        {content}
      </pre>
    </div>
  );
}

export default function JwtReaderPage() {
  const [input,   setInput]   = useState("");
  const [decoded, setDecoded] = useState<JwtParts | null>(null);
  const [error,   setError]   = useState("");

  const decode = useCallback((raw: string) => {
    const token = raw.trim();
    if (!token) { setDecoded(null); setError(""); return; }
    const parts = token.split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT format — expected 3 parts separated by dots.");
      setDecoded(null);
      return;
    }
    try {
      const header  = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      setDecoded({ header, payload, signature: parts[2] });
      setError("");
    } catch {
      setError("Invalid JWT format — could not decode token.");
      setDecoded(null);
    }
  }, []);

  const handleChange = (val: string) => {
    setInput(val);
    decode(val);
  };

  const now = Math.floor(Date.now() / 1000);

  return (
    <ToolPageWrapper
      toolName="JWT Reader"
      description="Decode and inspect JWT tokens instantly in your browser. Your token never leaves your device."
      category="Developer"
      isFree={true}
      howItWorks={[
        "Paste your JWT token into the input field.",
        "The header and payload are decoded and displayed instantly.",
        "Check the expiry status — green means valid, red means expired.",
      ]}
      relatedTools={[
        { name: "Base64 Encoder", slug: "base64-encoder", desc: "Encode and decode Base64 strings" },
        { name: "JSON Formatter", slug: "json-formatter", desc: "Format and validate JSON instantly" },
        { name: "URL Encoder",    slug: "url-encoder",    desc: "Encode and decode URLs safely" },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-[500] text-[#0A0A0A] leading-none">
            JWT Token
          </label>
          <textarea
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Paste your JWT token here — eyJhbGciOiJIUzI1NiJ9..."
            spellCheck={false}
            rows={4}
            className={cn(
              "w-full px-3.5 py-3 rounded-[8px] border font-mono",
              "bg-[#F5F5F5] text-[12px] text-[#0A0A0A] leading-relaxed",
              "placeholder:text-[#9B9B9B] resize-y outline-none",
              "focus:bg-white transition-colors duration-100",
              error ? "border-red-300 focus:border-red-400" : "border-[#E5E5E5] focus:border-[#0A0A0A]"
            )}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => decode(input)}
            disabled={!input.trim()}
            className={cn(
              "h-8 px-4 rounded-[8px] bg-[#0A0A0A] text-white text-[13px] font-[500] leading-none",
              "transition-colors duration-100 hover:bg-[#1a1a1a]",
              "disabled:bg-[#E5E5E5] disabled:text-[#9B9B9B] disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
            )}
          >
            Decode
          </button>
          <button
            type="button"
            onClick={() => { setInput(""); setDecoded(null); setError(""); }}
            disabled={!input}
            className={cn(
              "h-8 px-4 rounded-[8px] border border-[#E5E5E5] bg-white text-[13px] font-[400] text-[#6B6B6B] leading-none",
              "transition-colors duration-100 hover:border-[#0A0A0A] hover:text-[#0A0A0A]",
              "disabled:text-[#9B9B9B] disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
            )}
          >
            Clear
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="px-4 py-3 rounded-[8px] border border-red-200 bg-red-50">
            <p className="text-[13px] text-red-600 font-[500] m-0">{error}</p>
          </div>
        )}

        {/* Decoded output */}
        {decoded && (
          <div className="flex flex-col gap-4">
            <div className="h-px bg-[#E5E5E5]" />

            {/* Header */}
            <JwtCard
              title="Header"
              content={JSON.stringify(decoded.header, null, 2)}
            />

            {/* Payload */}
            <JwtCard
              title="Payload"
              content={JSON.stringify(decoded.payload, null, 2)}
            >
              {/* Highlighted fields */}
              <div className="flex flex-col gap-1.5 pt-1">
                {typeof decoded.payload.exp === "number" && (
                  <div className="flex items-center justify-between text-[12px] py-1.5 border-b border-[#F5F5F5]">
                    <span className="text-[#6B6B6B] font-mono">exp</span>
                    <span className="flex items-center gap-2">
                      <span className="text-[#0A0A0A]">{formatTimestamp(decoded.payload.exp as number)}</span>
                      <span className={cn(
                        "px-1.5 py-0.5 rounded-full text-[10px] font-[500] border",
                        (decoded.payload.exp as number) > now
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-600 border-red-200"
                      )}>
                        {(decoded.payload.exp as number) > now ? "Valid" : "Expired"}
                      </span>
                    </span>
                  </div>
                )}
                {typeof decoded.payload.iat === "number" && (
                  <div className="flex items-center justify-between text-[12px] py-1.5 border-b border-[#F5F5F5]">
                    <span className="text-[#6B6B6B] font-mono">iat</span>
                    <span className="text-[#0A0A0A]">{formatTimestamp(decoded.payload.iat as number)}</span>
                  </div>
                )}
                {["sub","iss","aud"].map((key) =>
                  decoded.payload[key] !== undefined ? (
                    <div key={key} className="flex items-center justify-between text-[12px] py-1.5 border-b border-[#F5F5F5] last:border-0">
                      <span className="text-[#6B6B6B] font-mono">{key}</span>
                      <span className="text-[#0A0A0A] truncate max-w-[60%] text-right">
                        {String(decoded.payload[key])}
                      </span>
                    </div>
                  ) : null
                )}
              </div>
            </JwtCard>

            {/* Signature */}
            <JwtCard title="Signature" content={decoded.signature}>
              <p className="text-[12px] text-[#6B6B6B] m-0 leading-snug">
                Signature verification requires the secret key and is not performed client-side.
              </p>
            </JwtCard>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}