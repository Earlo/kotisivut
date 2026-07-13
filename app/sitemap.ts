import { contentDates } from '@/lib/contentDates';
import type { MetadataRoute } from 'next';

const baseUrl = 'https://visapollari.fi';

type RouteEntry = {
  path: string;
  lastModified: string;
};

const routes: RouteEntry[] = [
  { path: '', lastModified: contentDates.home.modified },
  { path: '/blogi', lastModified: contentDates.blog.modified },
  { path: '/blogi/eurovaalit', lastModified: contentDates.eurovaalit.modified },
  { path: '/blogi/eurovaalit/results', lastModified: contentDates.eurovaalitResults.modified },
  { path: '/blogi/puolueet', lastModified: contentDates.puolueet.modified },
  { path: '/blogi/stv', lastModified: contentDates.stv.modified },
  { path: '/budjettipeli', lastModified: contentDates.budjettipeli.modified },
  { path: '/ekvaalit2023', lastModified: contentDates.ekvaalit2023.modified },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, lastModified }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
  }));
}
