import '@/styles/globals.css';
import Script from 'next/script';
import Head from 'next/head';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head key={'head'}>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          key="twitter"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        ></meta>
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9W2F6V6N7L"
        strategy="afterInteractive"
        key="googletagmanager"
      />
      <GoogleAnalytics gaId="G-9W2F6V6N7L" />
      <body>{children}</body>
    </html>
  );
}
