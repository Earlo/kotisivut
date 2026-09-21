import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  typedRoutes: true,
  async headers() {
    return ['/', '/blogi/:path+'].map((source) => ({
      source,
      headers: [
        {
          key: 'Link',
          value: '</agent-comments.md>; rel="describedby"; type="text/markdown"',
        },
      ],
    }));
  },
  experimental: {
    typedEnv: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'puoluerekisteri.fi',
        port: '',
        pathname: '/publicapi/attachment/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'liberaalipuolue.fi',
        port: '',
        pathname: '/wp-content/uploads/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
