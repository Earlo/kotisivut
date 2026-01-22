import Footer from '@/components/generic/footer/Footer';
import { ToasterProvider } from '@/components/generic/Toaster';
import '@/styles/globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://visapollari.fi'),
  title: {
    default: 'Visa Pollari',
    template: '%s | Visa Pollari',
  },
  description: 'Visa Pollari – ohjelmistokonsultti ja kunnallispoliitikko Espoosta. Varaa aika kahville tai soita.',
  openGraph: {
    title: 'Visa Pollari',
    description: 'Ohjelmistokonsultti ja kunnallispoliitikko Espoosta. Varaa aika tai soita.',
    url: 'https://visapollari.fi/',
    siteName: 'Visa Pollari',
    images: [{ url: '/vaalikuva_rect.jpg', width: 1200, height: 630, alt: 'Visa Pollari' }],
    locale: 'fi_FI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visa Pollari',
    description: 'Ohjelmistokonsultti ja kunnallispoliitikko Espoosta. Varaa aika tai soita.',
    images: ['/vaalikuva_rect.jpg'],
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi" className="h-full">
      <body className="flex min-h-screen flex-col items-center justify-between bg-gray-900 font-sans text-white">
        <GoogleAnalytics gaId="G-9W2F6V6N7L" />
        <ToasterProvider>
          <header className="flex h-24 w-full items-center justify-between border-b border-white/10 bg-black">
            <nav className="flex w-full items-center justify-between" aria-label="Päävalikko">
              <Link
                href="/"
                className="flex flex-col pl-2 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                aria-label="Etusivu"
              >
                <span className="text-2xl leading-tight font-bold">Visa Pollari</span>
                <p className="font-bold text-white/70">Tärkeintä on osallistuminen</p>
              </Link>
              <Link
                href="/blogi"
                className="pr-6 text-2xl font-bold hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Blogitekstejä
              </Link>
            </nav>
          </header>
          <main className="w-full flex-1 flex-col items-center bg-white text-black">{children}</main>
          <Footer />
        </ToasterProvider>
      </body>
    </html>
  );
}
