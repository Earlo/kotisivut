import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  typedRoutes: true,
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
