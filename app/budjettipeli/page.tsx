import ArticleDates from '@/components/ArticleDates';
import Header from '@/components/BlogHeader';
import Budjettipeli from '@/components/budjettipeli/budjettipeli';
import Text from '@/components/Text';
import { contentDates } from '@/lib/contentDates';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import type { BreadcrumbList, SoftwareApplication, WithContext } from 'schema-dts';

export const metadata = {
  title: 'Budjettipeli - Säädä budjettiasi',
  description:
    'Tee päätökset ja suunnittele valtion budjetti käyttäen tarkempaa ja kattavampaa työkalua kuin koskaan ennen.',
  alternates: { canonical: '/budjettipeli' },
  openGraph: {
    title: 'Budjettipeli - Interaktiivinen Budjetin Suunnittelutyökalu',
    description: 'Kokeile kuinka hallitset Suomen valtion budjettia ja tee päätöksiä.',
    images: [
      {
        url: 'https://visapollari.fi/budjettipeli/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Budjettipeli esikatselukuva',
      },
    ],
    type: 'website',
    url: 'https://visapollari.fi/budjettipeli',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visapollari',
    creator: '@visapollari',
    images: 'https://visapollari.fi/budjettipeli/opengraph-image',
    description: 'Tutustu Suomen valtion budjetin suunnitteluun uudella interaktiivisella työkalulla.',
  },
} satisfies Metadata;

const Page = () => {
  const toolJsonLd: WithContext<SoftwareApplication> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Budjettipeli',
    operatingSystem: 'Web',
    applicationCategory: 'ProductivityApplication',
    description: metadata.description,
    url: 'https://visapollari.fi/budjettipeli',
    datePublished: contentDates.budjettipeli.published,
    dateModified: contentDates.budjettipeli.modified,
  };
  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Etusivu', item: 'https://visapollari.fi/' },
      { '@type': 'ListItem', position: 2, name: 'Budjettipeli', item: 'https://visapollari.fi/budjettipeli' },
    ],
  };

  return (
    <div className="flex w-full flex-1 bg-gray-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <script
        id="budjettipeli-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        id="budjettipeli-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="mx-auto flex w-full max-w-7xl flex-col" aria-labelledby="budjettipeli-heading">
        <Header>
          <span id="budjettipeli-heading">Budjettipeli</span>
        </Header>
        <ArticleDates {...contentDates.budjettipeli} />
        <section aria-label="Budjettipelin ohjeet" className="mb-6 max-w-3xl">
          <Text className="text-base text-slate-200">
            Tervetuloa budjettipeliin. Jaa valtion budjetti eri osa-alueille ja seuraa samalla, miten päätökset
            vaikuttavat kokonaisuuteen.
          </Text>
          <Text className="text-base text-slate-200">
            Budjettivuosi: <strong>2024</strong>. Pelin lähtöluvut perustuvat{' '}
            <a
              href="https://budjetti.vm.fi/sisalto.jsp?lang=fi&maindoc=%2F2024%2Ftae%2FhallituksenEsitys%2FhallituksenEsitys.xml&opennode=0%3A1%3A143%3A&year=2024"
              className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              hallituksen vuoden 2024 talousarvioesitykseen
            </a>
            . Nettolainanottoa ei lasketa tuloihin, jotta saldo näyttää tulojen ja menojen erotuksen.
          </Text>
          <Text className="mb-0 text-base text-slate-200">
            Säädä tuloja ja menoja liukusäätimellä ja siirry budjettikohtien välillä Edellinen- ja
            Seuraava-painikkeilla. Seuraa budjetin saldoa ja muutostesi yhteenvetoa. Voit jakaa oman budjettisi
            painikkeella Kopioi linkki budjettiisi.
          </Text>
        </section>
        <Suspense>
          <Budjettipeli />
        </Suspense>
      </article>
    </div>
  );
};

export default Page;
