import Header from '@/components/BlogHeader';
import Text from '@/components/Text';
import TierList from '@/components/tierlist/Tierlist';
import type { Metadata } from 'next';
import { candidates } from './candidates';

export const metadata: Metadata = {
  title: 'Eurovaalit LIB tulosveikkaus',
  description: 'Veikkaa Liberaalin listan järjestystä ja voita mainetta ja kunniaa.',
  alternates: { canonical: '/blogi/eurovaalit' },
  openGraph: {
    title: 'Eurovaalit LIB tulosveikkaus',
    description: 'Veikkaa Liberaalin listan järjestystä ja voita mainetta ja kunniaa.',
    images: [
      {
        url: 'https://visapollari.fi/blogi/eurovaalit/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Eurovaalit LIB tulosveikkaus esikatselukuva',
      },
    ],
    type: 'website',
    url: 'https://visapollari.fi/blogi/eurovaalit',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visapollari',
    creator: '@visapollari',
    images: 'https://visapollari.fi/blogi/eurovaalit/opengraph-image',
    description: 'Veikkaa Liberaalin listan järjestystä ja voita mainetta ja kunniaa.',
  },
};

const Page = () => {
  return (
    <div className="max-w-8xl mx-auto bg-gray-950 p-4">
      <Header>Eurovaalit LIB tulosveikkaus</Header>
      <Text>
        Tänään on eurovaalit ja Liberaalipuolueeella on täysi lista ehdokkaita. Veikkaa listan sisäistä järjestystä alla
        olevalla lomakkeella.
      </Text>
      <Text>Järjestyksen oikein arvanneille luvassa mainetta ja kunniaa</Text>

      <TierList candidates={candidates} />
    </div>
  );
};

export default Page;
