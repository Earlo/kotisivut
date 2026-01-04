import Text from '@/components/Text';
import PartyTable from '@/components/puolueet/PartyTable';

import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Rekisteröityneet puolueet - Yhteystiedot',
  description: 'Löydä kaikkien rekisteröityneiden puolueiden yhteystiedot helposti yhdestä paikasta.',
  alternates: { canonical: '/blogi/puolueet' },
  openGraph: {
    title: 'Rekisteröityneet puolueet - Yhteystiedot',
    description: 'Löydä kaikkien rekisteröityneiden puolueiden yhteystiedot helposti yhdestä paikasta.',
    images: [
      {
        url: 'https://visapollari.fi/blogi/puolueet/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Rekisteröityneet puolueet esikatselukuva',
      },
    ],
    type: 'website',
    url: 'https://visapollari.fi/blogi/puolueet',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visapollari',
    creator: '@visapollari',
    images: 'https://visapollari.fi/blogi/puolueet/opengraph-image',
    description: 'Löydä kaikkien rekisteröityneiden puolueiden yhteystiedot helposti yhdestä paikasta.',
  },
};

const PartiesPage = () => {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title,
    description: metadata.description,
    author: {
      '@type': 'Person',
      name: 'Visa Pollari',
    },
    mainEntityOfPage: 'https://visapollari.fi/blogi/puolueet',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Etusivu', item: 'https://visapollari.fi/' },
      { '@type': 'ListItem', position: 2, name: 'Blogi', item: 'https://visapollari.fi/blogi' },
      { '@type': 'ListItem', position: 3, name: 'Puolueet', item: 'https://visapollari.fi/blogi/puolueet' },
    ],
  };

  return (
    <div className="container mx-auto bg-black px-4 py-8">
      <Script
        id="puolueet-article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id="puolueet-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article aria-labelledby="puolueet-heading">
        <h1 id="puolueet-heading" className="mb-4 text-3xl font-bold">
          Rekisteröityneet puolueet
        </h1>
        <Text>
          Eurovaalien alla olen huomannut erään selkeästi suomalaista kansalaisyhteiskuntaa piinaavan vaivan:
          poliittisten puolueiden tavoittaminen tuntuu olevan suunnattoman vaikeaa. On täysin ymmärrettävää, että
          yhdistysten ja säätiöiden resurssit ovat rajalliset, ja kuten tiedämme, mikäli kommunikaatio voi epäonnistua,
          se myös epäonnistuu.
        </Text>
        <Text>
          Mietin, mistä asia johtuu, ja tässä muutama päivä sitten, samalla kun kävin napsauttamassa 25.5.
          kannatusilmoitukseni juuri alkaneelle keräykselle, tajusin sen:
        </Text>

        <Text className="text-center font-bold text-yellow-300">
          Puoluerekisteri.fi ei tarjoa yksinkertaista tapaa napata kaikkien puolueiden yhteystietoja yhdellä kertaa.
        </Text>
        <Text>
          Eli siis vuosien ajan yhteiskunta on kärsinyt tästä ylitsepääsemättömän vaivalloisesta tiedonsaantiesteestä!
        </Text>
        <Text>
          Mielestäni julkisten palveluiden, kuten puoluerekisteri.fi:n, tulisi olla avointa lähdekoodia. Tällöin kuka
          tahansa voisi kehittää palvelua eteenpäin ja esimerkiksi lisätä sivustolle listan kaikkien puolueiden
          yhteystiedoista. Mikäli näin olisi, kuka tahansa, kuten minä, tai sinä voisimme yksinkertaisesti mennä
          katsomaan sivuston lähdekoodia, ja paikata tämän yhteiskunnallisen tiekuopan.
        </Text>
        <Text>
          Pahimpaan hätään olen kuitenkin tehnyt tämän sivun, josta löydät kaikkien rekisteröityneiden puolueiden
          yhteystiedot. Voit joko kopioida koko taulukon omaan käyttöösi tai klikata kätevää namiskaa, joka kopioi
          kaikkien puolueiden sähköpostit leikepöydällesi.
        </Text>
        <Text>T. Visa Pollari</Text>
        <PartyTable />
      </article>
    </div>
  );
};

export default PartiesPage;
