import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Links to routes that don't exist become type errors.
  typedRoutes: true,
  poweredByHeader: false,
};

export default nextConfig;
