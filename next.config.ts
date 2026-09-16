import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // For standard App Router API routes:
  serverExternalPackages: [],
};

export default nextConfig;