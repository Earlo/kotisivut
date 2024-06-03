import Text from '@/components/Text';
import PartyTable from '@/components/puolueet/PartyTable';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rekisteröityneet puolueet - Yhteystiedot',
  description:
    'Löydä kaikkien rekisteröityneiden puolueiden yhteystiedot helposti yhdestä paikasta.',
  openGraph: {
    title: 'Rekisteröityneet puolueet - Yhteystiedot',
    description:
      'Löydä kaikkien rekisteröityneiden puolueiden yhteystiedot helposti yhdestä paikasta.',
    images: [
      {
        url: 'https://visapollari.fi/blogi/puolueet/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rekisteröityneet puolueet esikatselukuva',
      },
    ],
    type: 'website',
    url: 'https://visapollari.fi/blogi/puolueet',
  },
  twitter: {
    card: 'summary',
    site: '@visapollari',
    creator: '@visapollari',
    images: 'https://visapollari.fi/blogi/puolueet/og-image.jpg',
    description:
      'Löydä kaikkien rekisteröityneiden puolueiden yhteystiedot helposti yhdestä paikasta.',
  },
};

const PartiesPage = () => {
  return (
    <div className="container mx-auto bg-black px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Rekisteröityneet puolueet</h1>
      <Text>
        Eurovaalien alla olen huomannut erään selkeästi suomalaista
        kansalaisyhteiskuntaa piinaavan vaivan: poliittisten puolueiden
        tavoittaminen tuntuu olevan suunnattoman vaikeaa. On täysin
        ymmärrettävää, että yhdistysten ja säätiöiden resurssit ovat rajalliset,
        ja kuten tiedämme, mikäli kommunikaatio voi epäonnistua, se myös
        epäonnistuu.
      </Text>
      <Text>
        Mietin, mistä asia johtuu, ja tässä muutama päivä sitten, samalla kun
        kävin napsauttamassa 25.5. kannatusilmoitukseni juuri alkaneelle
        keräykselle, tajusin sen. Puoluerekisteri.fi ei tarjoa yksinkertaista
        tapaa napata kaikkien puolueiden yhteystietoja. Eli siis vuosien ajan
        yhteiskunta on kärsinyt tästä tiedonsaantiesteestä!
      </Text>
      <Text>
        Mielestäni julkisten palveluiden, kuten puoluerekisteri.fi:n, tulisi
        olla avointa lähdekoodia. Tällöin kuka tahansa voisi kehittää palvelua
        eteenpäin ja esimerkiksi lisätä sivustolle listan kaikkien puolueiden
        yhteystiedoista.
      </Text>
      <Text>
        Pahimpaan hätään olen kuitenkin tehnyt tämän sivun, josta löydät
        kaikkien rekisteröityneiden puolueiden yhteystiedot. Voit joko kopioida
        koko taulukon omaan käyttöösi tai klikata kätevää namiskaa, joka kopioi
        kaikkien puolueiden sähköpostit leikepöydällesi.
      </Text>
      <Text>T. Visa Pollari</Text>
      <PartyTable />
    </div>
  );
};

export default PartiesPage;
