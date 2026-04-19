import { ImageResponse } from "@vercel/og";
import { NextRequest }   from "next/server";
import { TOOLS }         from "@/lib/tools";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("tool") ?? "";
  const tool = TOOLS.find((t) => t.slug === slug);

  const toolName    = tool?.name        ?? "25tools";
  const description = tool?.desc        ?? "Free online utility tools for developers and creators.";
  const isFree      = tool?.free        ?? true;
  const category    = tool?.category    ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width:           "1200px",
          height:          "630px",
          backgroundColor: "#0A0A0A",
          display:         "flex",
          flexDirection:   "column",
          justifyContent:  "space-between",
          padding:         "60px 72px",
          fontFamily:      "system-ui, -apple-system, sans-serif",
          position:        "relative",
        }}
      >
        {/* Subtle grid texture */}
        <div
          style={{
            position:        "absolute",
            inset:           0,
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
            backgroundSize:  "32px 32px",
          }}
        />

        {/* Top row — logo + category */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            position:       "relative",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width:           "36px",
                height:          "36px",
                backgroundColor: "#FFFFFF",
                borderRadius:    "8px",
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
              }}
            >
              <div
                style={{
                  width:           "18px",
                  height:          "18px",
                  backgroundColor: "#0A0A0A",
                  borderRadius:    "3px",
                }}
              />
            </div>
            <span
              style={{
                color:      "#FFFFFF",
                fontSize:   "22px",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              25tools
            </span>
          </div>

          {/* Category pill */}
          {category && (
            <div
              style={{
                display:         "flex",
                alignItems:      "center",
                padding:         "6px 16px",
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius:    "100px",
                border:          "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span
                style={{
                  color:       "rgba(255,255,255,0.6)",
                  fontSize:    "16px",
                  fontWeight:  400,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {category}
              </span>
            </div>
          )}
        </div>

        {/* Center — tool name + description */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "20px",
            position:      "relative",
          }}
        >
          <div
            style={{
              color:         "#FFFFFF",
              fontSize:      toolName.length > 20 ? "68px" : "80px",
              fontWeight:    600,
              lineHeight:    1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {toolName}
          </div>
          <div
            style={{
              color:      "rgba(255,255,255,0.5)",
              fontSize:   "26px",
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth:   "800px",
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom row — URL + free pill */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            position:       "relative",
          }}
        >
          {/* URL */}
          <span
            style={{
              color:      "rgba(255,255,255,0.3)",
              fontSize:   "18px",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            25tools.dev/tools/{slug}
          </span>

          {/* Free pill */}
          {isFree && (
            <div
              style={{
                display:         "flex",
                alignItems:      "center",
                gap:             "8px",
                padding:         "10px 20px",
                backgroundColor: "#FFFFFF",
                borderRadius:    "100px",
              }}
            >
              <div
                style={{
                  width:           "8px",
                  height:          "8px",
                  backgroundColor: "#0A0A0A",
                  borderRadius:    "100px",
                }}
              />
              <span
                style={{
                  color:      "#0A0A0A",
                  fontSize:   "16px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Free
              </span>
            </div>
          )}
        </div>

      </div>
    ),
    {
      width:  1200,
      height: 630,
    }
  );
}