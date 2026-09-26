import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/dramapvp',
        destination: '/dramapvp/index.html',
      },
    ];
  },
};

export default nextConfig;
