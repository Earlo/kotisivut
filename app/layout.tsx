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
  alternates: { canonical: '/' },
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
          <header className="flex h-24 w-full items-center justify-between bg-black">
            <div className="flex grow flex-col items-start pl-2">
              <h1 className="text-3xl font-bold">Visa Pollari</h1>
              <p className="sr-only">Henkilökohtainen sivusto</p>
              <h3 className="font-bold">Tärkeintä on osallistuminen</h3>
            </div>

            <nav aria-label="Päävalikko" className="pr-6">
              <Link href="/blogi" className="text-2xl font-bold hover:opacity-80">
                Blogitekstejä
              </Link>
            </nav>
          </header>
          <main className="w-full flex-1">{children}</main>
          <Footer />
        </ToasterProvider>
      </body>
    </html>
  );
}
