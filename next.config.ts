import "./src/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bentleymotors.com',
      },
    ],
  },
};

export default nextConfig;
