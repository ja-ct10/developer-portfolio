import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project to silence the
  // "multiple lockfiles detected" warning during build.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};

export default nextConfig;
