import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  generateEtags: false,
  poweredByHeader: false,
  onDemandEntries: {
    maxInactiveAge: 30 * 1000,
    pagesBufferLength: 10,
  },
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_APP_ENV === "live" && {
      exclude: ["error"],
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
