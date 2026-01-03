import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web.telegram.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn4.telegram-cdn.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn4.cdn-telegram.org',
      },
      {
        protocol: 'https',
        hostname: 'puoluerekisteri.fi',
      },
      {
        protocol: 'https',
        hostname: 'liberaalipuolue.fi',
      },
      {
        protocol: 'https',
        hostname: 'cdn4.telesco.pe',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
