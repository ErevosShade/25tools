import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.100.168'],
};
// only for development, in production we use a custom server to set CORS headers on API routes

export default nextConfig;