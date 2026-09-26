/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'assets.nflxext.com', 'image.tmdb.org'],
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
