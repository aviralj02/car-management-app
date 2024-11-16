import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/swagger-jsdoc\/src\/utils\.js/ },
      { file: /node_modules\/swagger-jsdoc\/src\/index\.js/ },
    ];

    return config;
  },
};

export default nextConfig;
