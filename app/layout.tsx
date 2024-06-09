import '@/styles/globals.css';
import Icon from '@/components/generic/Icon';
import { ToasterProvider } from '@/components/generic/Toaster';
import Script from 'next/script';
import Head from 'next/head';
import { GoogleAnalytics } from '@next/third-parties/google';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <Head key={'head'}>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          key="twitter"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
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
            <div className="w-3/4 items-start">
              <h1 className="ml-4 text-3xl font-bold md:ml-10">Visa Pollari</h1>
              <h3 className="ml-4 text-xl font-bold md:ml-10">
                Tärkeintä on osallistuminen.
              </h3>
            </div>

            <Link
              href="/blogi"
              className="mr-4 text-2xl font-bold hover:text-blue-500 md:mr-10"
            >
              Blogi
            </Link>
          </header>

          {children}
          <footer className="mt-4 flex w-full flex-row items-center justify-around bg-black py-10">
            <a href="https://twitter.com/VisaPollari">
              <Icon name="Twitter" />
            </a>
            <a href="https://www.linkedin.com/in/visapollari">
              <Icon name="LinkedIn" />
            </a>
            <a href="https://github.com/Earlo">
              <Icon name="GitHub" />
            </a>
            <a href="https://bsky.app/profile/visapollari.bsky.social">
              <Icon name="Bluesky" />
            </a>
            <a href="https://www.threads.net/@visapollari">
              <Icon name="Threads" />
            </a>
            <a href="https://suomi.social/@visapollari">
              <Icon name="Mastodon" />
            </a>
            <a href="https://t.me/visapollari">
              <Icon name="Telegram" />
            </a>
          </footer>
        </ToasterProvider>
      </body>
    </html>
  );
}
