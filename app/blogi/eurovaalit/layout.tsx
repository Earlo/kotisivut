import type { Metadata } from 'next';

export const metadata = {
  robots: { index: false, follow: true },
} satisfies Metadata;

export default function EurovaalitArchiveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
