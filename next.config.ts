import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbo: {
    allowedDevOrigins: ["192.168.1.26:3000", "localhost:3000"],
  },
} as any;

export default nextConfig;
