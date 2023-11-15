import '@/styles/globals.css';
import Script from 'next/script';
import Head from 'next/head';

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
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9W2F6V6N7L"
        strategy="afterInteractive"
        key="googletagmanager"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        key="google-analytics"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9W2F6V6N7L');
          `}
      </Script>
      <body>{children}</body>
    </html>
  );
}
