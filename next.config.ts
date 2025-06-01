import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    devIndicators: {
        appIsrStatus: false,
        buildActivity: false,
        buildActivityPosition: "top-right"
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    }
};

export default nextConfig;
