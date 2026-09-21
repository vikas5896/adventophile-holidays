import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local placeholder images are SVG; safe to allow since they are self-hosted,
    // not user-uploaded or remote. Revisit once real photography (JPEG/WebP) replaces them.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
