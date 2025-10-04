//app/layout.tsx
import Footer from '@/components/generic/footer/Footer';
import { ToasterProvider } from '@/components/generic/Toaster';
import '@/styles/globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi" className="">
      <Head key={'head'}>
        <script async src="https://platform.twitter.com/widgets.js" key="twitter" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9W2F6V6N7L"
        strategy="afterInteractive"
        key="googletagmanager"
      />
      <GoogleAnalytics gaId="G-9W2F6V6N7L" />
      <body className="flex min-h-screen flex-col items-center justify-between bg-gray-900 font-sans text-white">
        <ToasterProvider>
          <header className="flex h-24 w-full items-center justify-between bg-black">
            <div className="flex grow flex-col items-start pl-2">
              <h1 className="text-3xl font-bold">Visa Pollari</h1>
              <h3 className="font-bold">Tärkeintä on osallistuminen</h3>
            </div>

            <Link href="/blogi" className="pr-6 text-2xl font-bold hover:opacity-80">
              Blogitekstejä
            </Link>
          </header>
          <main className="w-full flex-1">{children}</main>
          <Footer />
        </ToasterProvider>
      </body>
    </html>
  );
}
