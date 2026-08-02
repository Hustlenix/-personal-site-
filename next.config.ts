import type { NextConfig } from "next";

const isStatic = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: isStatic ? "export" : undefined,
  basePath: isStatic ? "/-personal-site-" : undefined,
  assetPrefix: isStatic ? "/-personal-site-/" : undefined,
  trailingSlash: isStatic ? true : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
