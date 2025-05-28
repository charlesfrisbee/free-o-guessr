import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: "tsconfig.app.json",
  },
  eslint: {
    // you probably also want to skip linting tests
    ignoreDuringBuilds: true,
  },
  /* config options here */
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
