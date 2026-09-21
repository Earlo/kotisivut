'use client';

import { usePathname } from 'next/navigation';
import Comments from './Comments';

export default function BlogComments() {
  const pathname = usePathname();

  if (pathname === '/blogi' || !pathname.startsWith('/blogi/')) return null;

  return <Comments pagePath={pathname.replace(/\/$/, '')} />;
}
