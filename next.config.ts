import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress:        true,
  poweredByHeader: false,

  images: {
    formats:         ["image/avif", "image/webp"],
    deviceSizes:     [640, 750, 828, 1080, 1200, 1920],
    imageSizes:      [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  serverExternalPackages: [],

  experimental: {
    optimizeCss: true,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",         value: "DENY" },
          { key: "X-XSS-Protection",        value: "1; mode=block" },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/(.*)\\.(ico|png|jpg|jpeg|svg|webp|avif|woff2|woff|ttf)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, no-cache, must-revalidate" }],
      },
    ];
  },

  async redirects() {
    return [
      // Slug rename redirect
      {
        source:      "/tools/pdf-cutter",
        destination: "/tools/page-trim",
        permanent:   true,
      },
      // Trailing slash canonicalization
      {
        source:      "/tools/",
        destination: "/tools",
        permanent:   true,
      },
    ];
  },
};

export default nextConfig;