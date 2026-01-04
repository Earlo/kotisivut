import type { MetadataRoute } from 'next';

const baseUrl = 'https://visapollari.fi';

type RouteEntry = {
  path: string;
  lastModified: string;
  priority?: number;
};

const routes: RouteEntry[] = [
  { path: '', lastModified: '2023-11-15T15:02:27Z', priority: 1 },
  { path: '/blogi', lastModified: '2024-05-30T13:57:04Z', priority: 0.7 },
  { path: '/blogi/eurovaalit', lastModified: '2024-06-09T10:09:35Z', priority: 0.6 },
  { path: '/blogi/eurovaalit/results', lastModified: '2024-06-09T14:32:01Z', priority: 0.1 },
  { path: '/blogi/puolueet', lastModified: '2024-05-30T10:21:39Z', priority: 0.6 },
  { path: '/blogi/stv', lastModified: '2024-01-16T21:04:14Z', priority: 0.6 },
  { path: '/budjettipeli', lastModified: '2024-04-12T12:56:39Z', priority: 0.8 },
  { path: '/ekvaalit2023', lastModified: '2023-11-15T15:02:27Z', priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, lastModified, priority }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: 'weekly',
    priority,
    lastModified,
  }));
}
