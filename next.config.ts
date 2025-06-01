import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    devIndicators: {
        appIsrStatus: false,
        buildActivity: false,
        buildActivityPosition: "top-right"
    }
};

export default nextConfig;
