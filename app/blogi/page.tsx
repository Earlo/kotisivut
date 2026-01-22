import Text from '@/components/Text';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: { absolute: 'Blogi | Visa Pollari' },
  description: 'Visa Pollarin blogi: kirjoituksia ja kokeiluja politiikasta ja teknologiasta.',
  alternates: { canonical: '/blogi' },
  openGraph: {
    title: 'Blogi | Visa Pollari',
    description: 'Visa Pollarin blogi: kirjoituksia ja kokeiluja politiikasta ja teknologiasta.',
    url: 'https://visapollari.fi/blogi',
    images: [{ url: 'https://visapollari.fi/blogi/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visapollari',
    creator: '@visapollari',
    images: ['https://visapollari.fi/blogi/opengraph-image'],
    description: 'Visa Pollarin blogi: kirjoituksia ja kokeiluja politiikasta ja teknologiasta.',
  },
};

const BlogListing = () => {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Etusivu', item: 'https://visapollari.fi/' },
      { '@type': 'ListItem', position: 2, name: 'Blogi', item: 'https://visapollari.fi/blogi' },
    ],
  };

  return (
    <div className="flex w-full flex-1 flex-col bg-black text-white">
      <Script
        id="blog-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article
        aria-labelledby="blog-heading"
        className="mx-auto flex w-full max-w-5xl flex-col px-4 py-8"
      >
        <h1 id="blog-heading" className="mb-4 text-3xl font-bold">
          Blogi
        </h1>
        <Text>Tässä muutamia kirjoittamiani tekstejä tai muita virtuaalisyhteiskunnallisia kokemuksia:</Text>
        <div className="flex flex-col space-y-2">
          <Link href="/blogi/puolueet" className="text-blue-400 hover:text-blue-300">
            Puolueet
          </Link>
          <Link href="/blogi/stv" className="text-blue-400 hover:text-blue-300">
            STV
          </Link>
          <Link href="/budjettipeli" className="text-blue-400 hover:text-blue-300">
            Budjettipeli
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogListing;
