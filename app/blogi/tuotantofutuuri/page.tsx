import Header from '@/components/BlogHeader';
import Text from '@/components/Text';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tuotantofutuurimalli',
  description: 'Kuinka varmistaa huoltovarmmus ilman helikopterirahaa?',
  openGraph: {
    title: 'Tuotantofutuurimalli',
    description: 'Kuinka varmistaa huoltovarmmus ilman helikopterirahaa?',
    images: [
      {
        url: 'https://visapollari.fi/blogi/tuotantofutuuri/og-image',
        width: 1200,
        height: 630,
        alt: 'Tuotantofutuurimalli esikatselukuva',
      },
    ],
    type: 'website',
    url: 'https://visapollari.fi/blogi/tuotantofutuuri',
  },
  twitter: {
    card: 'summary',
    site: '@visapollari',
    creator: '@visapollari',
    images: 'https://visapollari.fi/blogi/tuotantofutuuri/og-image',
    description: 'Kuinka varmistaa huoltovarmmus ilman helikopterirahaa?',
  },
};

const Page = () => {
  return (
    <div className="max-w-8xl mx-auto bg-gray-950 p-4">
      <Header>Tuotantofutuurimalli</Header>
      <Text>
        Suomessa maksettiin erinäisiä maataloustukia lähes 2 miljardia euroa
        vuonna 2023. Tätä tukipottia usein perustellaan huoltovarmmuudella
        kriisiolosuhteita varten, mutta toteutuuko tämä? Venäjän vastaisia
        pakotteita asettaessa, huomattiin että Suomen ruokatuontanto oli
        hyvinkin riippuvainen Venäjästä, esim. lannoitteen suhteen.
      </Text>
      <Text>
        Tällä hetkellä tukia jaetaan monilla perusteilla. On peltopinta-alan
        mukaan jyvitettyä viljelijätukea, hanketukia, rakennetukia,
        markkinatukia, normaaleja yritystukia, ja niin edelleen. Siitä
        huolimatta, kun huoltovarmuus ilmiselvästi ei toteudu nykyisellä
        järjestelmällä, niin mikä tarkalleen sitten sen oikeutus on? Olisko
        kenties maataloustukipotti mahdollista kohdistaa paremmin?
      </Text>
      <Text>Ehdottaisin asiaa korjaamista Tuotantofutuurimallilla.</Text>
      <Text>
        Tuotantofutuurimallissa summanmutikassa heitetyn helikoterirahan sijaan,
        jokin valtiollinen toimija, kuten huoltovarmuuskeskus ottaisi
        tehtäväkseen laskea ja selvittää kuinka paljon ruokaa tulee pystyä
        tuottamaan kriisiolosuhteissa jotta väestön selviäminen voidaan taata.
        Sanotaan että laskelmat tehdään, ja yksi komponentti tässä on vaikka
        että Suomen väestö tarvitsee selvitäkseen sata tonnia herneitä.
      </Text>
      <Text>
        Tämän laskelman tehtyään huoltovarmuuskeskus pistää ilmoille
        tarjouspyynnön herneistä, jossa tarjouksen ehtona on spesifioitu
        kriisitilassa toimimiseen vaaditut puitteet. Tämä voisi sisältää
        vaikkapa sen, että tuotanto tehdään paikallisella työvoimalla, jo maassa
        olevilla välineistöllä, kotimaisella lannoitteella, jne. Oletettavasti
        huoltovarmuuskeskus saisi tarjouksia, joista sitten he valikoisivat
        edullisimmat kunnes vaaditu määrä herneitä olisi tilattu.
        Toimitusajankohta herneille olisi tulevaisuudessa, mutta
        huoltovarmuuskeskus ostaisi nämä herneet futuurina.
      </Text>
      <Text>
        Kun aikaa kuluu, toimitusajankohta lähestyy, ja käy selväksi että
        herneille ei olekaan tarvetta väestönsuojissa, niin nämä hernefutuurit
        voitaisiin asettaa myyntiin avoimille markkinoille. Oletettavasti
        huoltovarmuuskeskus ei saisi näistä herneistä aivan niin hyvää hintaa
        kuin oli itse maksanut, sillä normaaleilla markkinoilla ei niinkään ole
        kiinnostusta siihen, onko tuotannossa käytetty kotimaista lainnoitetta
        vai ei, mutta tietty markkina-arvo herneillä toki on. Jollain
        korvauksella valtio pääsisi siis eroon hernevuoresta, markkinoille
        virtaisi kotimaisia herneitä, ja futuurin osto- ja myyntihinnan välinen
        erotus määrittäisi sen miten paljon maataloustoimintaa suomessa on
        tarvetta tukea.
      </Text>
      <Text>
        Olen vakuuttunut että pitkällä tähtäimellä tämä malli tulisi
        merkittävästi halvemmaksi, ja toteuttaisi ensisijaista tarkoitusperäänsä
        paremmin kuin nykyinen haulikkostrategia.
      </Text>
    </div>
  );
};

export default Page;
