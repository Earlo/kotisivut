import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const host = 'https://visapollari.fi';
  return {
    rules: {
      userAgent: '*',
    },
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
