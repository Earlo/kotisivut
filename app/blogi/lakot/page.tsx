import Header from '@/components/BlogHeader';
import List from '@/components/List';
import Subheader from '@/components/Subheader';
import Text from '@/components/Text';
import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Lakot ja metariita',
  description: 'Pohdintaa poliittisten lakkojen säätelystä ja vaikutuksista.',
  alternates: { canonical: '/blogi/lakot' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Lakot ja metariita',
    description: 'Pohdintaa poliittisten lakkojen säätelystä ja vaikutuksista.',
    url: 'https://visapollari.fi/blogi/lakot',
    type: 'article',
    images: [{ url: 'https://visapollari.fi/blogi/lakot/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visapollari',
    creator: '@visapollari',
    images: ['https://visapollari.fi/blogi/lakot/opengraph-image'],
    description: 'Pohdintaa poliittisten lakkojen säätelystä ja vaikutuksista.',
  },
};

const Page = () => {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title,
    description: metadata.description,
    author: { '@type': 'Person', name: 'Visa Pollari' },
    mainEntityOfPage: 'https://visapollari.fi/blogi/lakot',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Etusivu', item: 'https://visapollari.fi/' },
      { '@type': 'ListItem', position: 2, name: 'Blogi', item: 'https://visapollari.fi/blogi' },
      { '@type': 'ListItem', position: 3, name: 'Lakot', item: 'https://visapollari.fi/blogi/lakot' },
    ],
  };

  return (
    <div className="max-w-8xl mx-auto bg-gray-950 p-4">
      <Script
        id="lakot-article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id="lakot-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article aria-labelledby="lakot-heading">
        <Header>
          <span id="lakot-heading">TÄÄ on ihan kesken :D.</span>
        </Header>
        <Header>Lakkoja löytyy soilta.</Header>
        <Text>
          Viimepäivinä oon suhteellisen etäisesi seurannut lakoista käytävää julkista keskustelua, ja itselleni
          suhteellisen epäselväksi on jäänyt molemmat, mitä hallitus haluaa saavuttaa poliittiset lakot kieltämällä sekä
          mitä AY-liike haluaa saavuttaa niitä suojelemalla. Tässä on siis käsillä hyvinkin herkullinen metariita, jossa
          kumpikaan osapuoli ei oikein ole kosketuksissa substanssin kanssa, vaan riita on meta-aseesta jolla ehkä
          joskus voisi joskus mahdollisesti jotain substanssitavoitetta edistää.
        </Text>
        <Text>
          Jos henkilökohteisesti tarkastelen ajatusta poliittisien lakkojen kieltämisestä, on pakko myöntää että se
          särähtää korvaani. Asioiden kieltäminen niiden taustalla olevien motiivien perusteella kuullostaa hyvin
          vaikealta lailta säätää ja valvoa. En usko että tällaisien ajatusrikosten pohtiminen tai
          ajatusrikoslainsäädännön kiertäminen tulee olemaan yhteiskunnalle hirveän hyödyllistä puuhaa. Toisaalta jopa
          Github Copilot tarjosi tähän kirjoitukseen tällaista määritelmää lakoille:
          <Image
            src="/CopilotLakko.png"
            alt="Kuvakaappaus GitHub Copilotin tarjoamasta lakon määritelmästä"
            width={500}
            height={500}
          />
          Jonka alle hallitukseen kohdistunut lakko ei millään tavalla sovi.
        </Text>
        <Text>
          Ongelma onkin paljon syvemmällä kuin poliittisissa lakoissa. Jos vasaroita on olemassa, niin on täysin
          mahdollista että joku joskus joskus tulee hujauttamaan sillä jotakin muuta kuin naulaa päähän. Tämä ei
          kuitenknaan ole syy kieltää vasaroita.
        </Text>
        <Subheader>Perimmäinen ongelma</Subheader>
        <Text>
          Tilanteen ongelma on juurikin nykytila, ja kontekstisuo jossa kiistan osapuolet painivat. Vaikka se onkin
          paljon helpompaa minunlaiselle nojatuolipoliitikolle, tulisi miettiä enemmän peruskysymyksiä. Eli mitä nämä
          perusmyksymset ovat?
        </Text>
        <Text>
          1. Mitkä ovat valtion tehtävät? Tämä saattaa olla ehkä hiukan liian laaja aihe ihan tämän kirjoituksen
          kontekstissa, mutta voimme varmastikin todeta että sopimusten valvonta on yksi niistä. Tämä johtaa kysymykseen
          2.
        </Text>
        <Text>
          2. Millaisia sopimuksia ja sopimusehtoja valtio on valmis takaamaan oikeuslaitukosellaan. On esimerkiksi
          täysin selvää että sopimus &apos;Lupaan ajatella norsuja joka päivä&apos; on jotain mitä kaksi osapuolta voi
          keskenään sopia, mutta valtiolla ei ole mitään keinoja valvoa että tämä sopimus pitää.
        </Text>
        <Text>
          Ongelma on myös liittojen puolella. Nykyisen erityisasemansa johdosta, ovat liitot käytännössä osa valtiota,
          joten kiista on vaan noloa itsensä kanssa painimista.
        </Text>
        <Subheader>Visa Pollarin korjassarja</Subheader>
        <List
          items={[
            'Työehtosopimusten yleissitovuuden poisto.',
            'Erikseen laissa määrätyn lakko-oikeuden poistaminen.',
            'Vaatimus että työsopimuksessa pitää sopia lakko-oikeudesta.',
          ]}
        />
        <Header>Vaihtehtoinen :D en tiiä</Header>
        Puretaanpa tämä lakkokysymys aivan alusta. Lähdetään perusoletuksista jotka kaikki ymmärävätä, ja katsotaan
        kykenemmekö saamaan jonkun synteensin aikaan niiden päälle
        <Subheader>1. Valtion oikeuslaitoksen tehtävä on varmistaa että yhteiskunnassa voi tehdä sopimuksia</Subheader>
        <Subheader>2. Oikeuslaitoksen on mahdotonta valvoa mitä vain mielivaltaista sopimusta</Subheader>
        <Text>
          Rajallisten resurssien ja tiedon vuoksi tämä on aika ilmiselvä asia. Sopimus &quot;Lupaan ajatella norsuja
          joka päivä&quot; on jotain mitä kaksi osapuolta voi keskenään sopia, mutta kellään ei ole mitään keinoja
          valvoa että tämä sopimus pitää.
        </Text>
        <Subheader>
          3. Liittojen vaikutusvalta perustuu näiden jäsenistöön, ja jäsenistön vapaaseenhaluun seurata liiton päätöksiä
        </Subheader>
        <Text>
          Toisin kuin valtiolla, liitoilla ei ole väkivaltamonopolia jonka perusteella velvoittaa ketään seuoraamaan
          päätöksiään. Voimme siis olettaa että mikäli joku jotain tekee, tekee hän tämän omasta halustaan.
        </Text>
      </article>
    </div>
  );
};

export default Page;
