import type { MetadataRoute } from 'next';

const baseUrl = 'https://visapollari.fi';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/blogi',
    '/blogi/eurovaalit',
    '/blogi/lakot',
    '/blogi/puolueet',
    '/blogi/stv',
    '/blogi/tuotantofutuuri',
    '/budjettipeli',
    '/ekvaalit2023',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.6,
  }));
}
