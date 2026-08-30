import ArticleDates from '@/components/ArticleDates';
import Reference, { ReferenceList, type ReferenceSource } from '@/components/Reference';
import Text from '@/components/Text';
import Title from '@/components/Title';
import Money from '@/components/vaalirahoitus/Money';
import Tapausnavigaattori from '@/components/vaalirahoitus/Tapausnavigaattori';
import Tapauspainike from '@/components/vaalirahoitus/Tapauspainike';
import { contentDates } from '@/lib/contentDates';
import { articleAuthorJsonLd } from '@/lib/schema';
import type { Metadata } from 'next';
import tapaukset from './caset.json';

const references = [
  {
    href: 'https://www.hs.fi/tutkiva/art-2000011272338.html',
    title: 'Helsingin Sanomat: vaalirahoituksen ilmoituskynnyksiä käsittelevä artikkeli',
  },
  {
    href: 'https://vtv.fi/wp-content/uploads/2025/12/vtv-vaalirahoituksenvalvonta-aluevaaleissa-2025.pdf',
    title: 'Valtiontalouden tarkastusvirasto: Vaalirahoituksen valvonta aluevaaleissa 2025',
  },
  {
    href: 'https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/48072/vaaliavustusten-ja-vaalimenojen-k%C3%A4sittely-verotuksessa/',
    title: 'Verohallinto: Vaaliavustusten ja vaalimenojen käsittely verotuksessa',
  },
] satisfies readonly ReferenceSource[];

export const metadata: Metadata = {
  title: 'Vaalirahoituslaki ja -valvonta on yksi vitsi',
  description: 'Katsaus ja kevyttä OSINTtia liittyen suomen vaalirahoitusvalvonnan tilaan.',
  alternates: { canonical: '/blogi/vaalirahoitus' },
  openGraph: {
    title: 'Vaalirahoituslaki ja -valvonta on yksi vitsi',
    description: 'Katsaus ja kevyttä OSINTtia liittyen suomen vaalirahoitusvalvonnan tilaan.',
    images: [
      {
        url: 'https://visapollari.fi/blogi/vaalirahoitus/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Vaalirahoitus esikatselukuva',
      },
    ],
    type: 'website',
    url: 'https://visapollari.fi/blogi/vaalirahoitus',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visapollari',
    creator: '@visapollari',
    images: 'https://visapollari.fi/blogi/vaalirahoitus/opengraph-image',
    description: 'Katsaus ja kevyttä OSINTtia liittyen suomen vaalirahoitusvalvonnan tilaan.',
  },
};

const PartiesPage = () => {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title,
    description: metadata.description,
    author: articleAuthorJsonLd,
    datePublished: contentDates.vaalirahoitus.published,
    dateModified: contentDates.vaalirahoitus.modified,
    image: 'https://visapollari.fi/blogi/vaalirahoitus/opengraph-image',
    url: 'https://visapollari.fi/blogi/vaalirahoitus',
    mainEntityOfPage: 'https://visapollari.fi/blogi/vaalirahoitus',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Etusivu', item: 'https://visapollari.fi/' },
      { '@type': 'ListItem', position: 2, name: 'Blogi', item: 'https://visapollari.fi/blogi' },
      { '@type': 'ListItem', position: 3, name: 'vaalirahoitus', item: 'https://visapollari.fi/blogi/vaalirahoitus' },
    ],
  };

  return (
    <div className="container mx-auto bg-black px-4 py-8">
      <script
        id="vaalirahoitus-article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        id="vaalirahoitus-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article aria-labelledby="vaalirahoitus-heading">
        <Title id="vaalirahoitus-heading" className="mb-4 text-3xl font-bold">
          Suomen vaalirahoitusvalvonnan puutteet.
        </Title>
        <ArticleDates {...contentDates.vaalirahoitus} />
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,46rem)_26rem]">
          <div className="min-w-0">
            <Text>
              Vuonna 2008 oli Suomen mediassa pinnalla ns. "vaalirahoituskohu". Keskustan kansanedustaja Timo Kallin
              kieltäydyttyä haastattelussa kertomasta tukiyhdistyksensä vastaanottamien lahjoituste summia.
              Vaalirahoituslaki jo tuolloin vaati ilmoittamaan kaikki yli <Money amount={1700} suffix=":n" />{' '}
              lahjoitukset. Kuitenkin, Kallin argumentoi, että kyseistä lakia ei tarvitse noudattaa, sillä siitä ei ole
              säädetty minkäänlaista rangaistusta.
            </Text>
            <Text>
              Kyseinen tapaus poiki paljon julkista keskustelua, ja siivittikin vaalirahoituslain uudistamista. Elikkäs
              homma taputeltu kuntoon ja sillä hyvä. Eikös näin?
            </Text>
            <Text>
              Noh, tilanne vuonna 2026 on edelleen sama. Vaalirahoituslaki on edelleen olemassa, muutamia
              ilmoituskynnyksiä on rukattu alaspäin, ja vaaditaan tarkempaa erittelyä, ja asetettu kattoja yhden
              lahjoittajan tekemille lahjoituksille. Mutta yksi ongelman keskeisistä piirteistä jäi ennalleen:
              aineellisen kiellon rikkomisesta ei säädetty varsinaista rangaistusta. Siten asetettu katto lahjoitusten
              koolle ei ole millään käytännön tasolla sitova.
            </Text>
            <Text>
              Ilmoituskynnyksessä on myös viime vuosina otettu takapakkia. Vuoden 2025 uudistuksella kuntavaalien
              nimetyn ilmoituksen kynnystä nostettiin <Money amount={800} suffix=":sta" />{' '}
              <Money amount={1100} suffix=":oon" /> ja alue- ja eudskunta- alue- tai presidentinvaaleissa{' '}
              <Money amount={1500} suffix=":sta" /> <Money amount={2000} suffix=":oon" />. Varsinkin Alue- ja
              kuntavaalien eroavat rajat tulevat varmasti olemaan ongelma, mikäli vaaleja jatkossakin toteutetaan
              päällekkäisinä vaaleina. Vielä 2025 vaaliessa oli Aluevaalien ilmoitusraja sama kuin kuntavaalien{' '}
              <Money amount={800} />. Nostoa argumentoitiin indeksikorotuksena
              <Reference number={1} />. VTV:n aluevaalirahoitusraportin mukaan "Yhdistelmäehdokkaiden osalta erikseen
              ilmoitettavan tuen raja nousi vuoden 2025 lakimuutoksen myötä <Money amount={800} suffix=":sta" />{' '}
              <Money amount={2000} suffix=":oon" />. Siten yhdistelmäehdokas voi jat- kossa ottaa vastaan 150 prosenttia
              enemmän ulkopuolista rahoitusta ilman, että hänen tarvitsee nimetä tuen antajaa
              vaalirahoitusilmoituksella". Eli käytännössä jatkossa olemalla ehdolla myös aluevaaleissa,
              kuntavaaliehdokas voi vastaanottaa nimettömänä lahjoituksena <Money amount={2000} />{' '}
              <Money amount={800} suffix=":n" /> sijasta
              <Reference number={2} />. Kun näitä rajoja mietitään suhteessa siihen uskomattomaan määrään ehdokkaita
              joita jokaisissa vaaleissa on ehdolla, aukeaa väylä syytää aivan suunnattomia summia puoluekoneistoille.
            </Text>
            <Text>
              Tämänhetkiset rajat yksittäisen lahjoittajan tekemille lahjoituksille ovat seuraavanlaiset: Kuntavaaleissa{' '}
              <Money amount={3000} />, eduskunta- ja aluevaaleissa <Money amount={6000} /> ja europarlamenttivaaleissa{' '}
              <Money amount={10000} />. Rajat ovat vaalikohtaisia, eli yhdistetyissä alue- ja kuntavaaleissa raja on
              käytännössä <Money amount={9000} />. Lahjaveron nykyinen <Money amount={7500} /> tai eninen{' '}
              <Money amount={5000} suffix=":n" /> kynnys ei tietenkään koske vaalirahoitusta, vaan on tietenkin täysin
              eri asia™. Mikäli lahjoituksen antaa henkilön itse omistama firma, voidaan verittajan mukaan lahjoitus
              tulkita peitetltynä osinkona. Se, tehdäänkö todella näin ja millä reunaehdoin, ei ole selkeää
              <Reference number={3} />.
            </Text>
            <Text>
              Valvonta perustuu pitkälti siihen, että media ja kansalaiset jaksavat toimia vallan vahtikoirina. Muutamia
              tapauksia on mm. <Tapauspainike nimi="Timo Harakka">Näytä Harakan tapaus</Tapauspainike>, jossa ehdokas
              sai julkisesti näpeilleen ja korjasi tilanteen sen seurauksena. VTV:n tarkastus ei kohdistu siihen, että
              onko rajoituksia rikottu vai ei, vaan pelkästään siihen että ilmoitus täytetään. Mikäli VTV:n ulkopuoliset
              tahot eivät ole raporteista kiinnostuneita, hautautuva ne unholaan.
            </Text>
            <Text>
              Vielä ongelmallisempaa on, että itvalvonta perustuu pitkälti ehdokkaidense tekemiin ilmoituksiin. Kun
              julkisia vaalirahoitusilmoituksia alkaa käydä järjestelmällisesti läpi, vastaan tulee sekä ilmeisiä
              tukikaton ylityksiä että ilmoituksia, joista ei pysty edes yksiselitteisesti selvittämään, kuka
              rahoituksen alkuperäinen antaja on.{' '}
              <Tapauspainike nimi="Aleksi Jäntti">Näytä Jäntin tapaus</Tapauspainike>. Kyseinen tapaus sattui omiin
              näppeihin ihan summanmutikassa VTV:n rahoitusportaalia selatessa. Käytännössä ulkopuolisen on kuitenkin
              hyvin vaikea tarkistaa, mistä välitetty rahoitus tosiasiassa on lähtöisin, jos ilmoituksen erittely on
              puutteellinen tai raha kulkee useamman toimijan kautta. Mikäli rahoituksen lähteitä halutttaisiin peittää,
              uskoisin sen olevan varsin triviaalia reitittämällä raha useampien välikäsien tai muiden bulvaanien
              kautta.
            </Text>

            <Text>
              Vaalrahoituksen vastaanottanut ehdokas tai tukiyhdistys on täysin vapaa käyttämään vastaanottamansa rahat
              täysin itselleen parhaalla katsomallaan tavallaan. Ja homma käy vielä lepsummaksi vaalien jälkeen.
              Vaalirahoituslain mukaan, mikäli vaalirahoitusta jää käyttämättä, ja ehdokkaalla ei ole esim.
              tukiyhdistystä jolla on ennaltamäärätty loppusijoituspaikka kerätyille varoille, siirtyy varat ehdokkaan
              omiin varoihin. Tämä tiedän hyvin, sillä nurkissani taitaa vieläkin lojua Pro Markkinatalouden minulle
              vuoden 2023 vaaleihin myöntämällä <Money amount={1500} suffix=":lla" /> ostama pullo Puolustuslaitoksen
              Leikattua. Korkkaamaton.
            </Text>
            <Text>
              Tämän lisäksi, ilmoituvelvollisia on pelkästään vaaleissa valituksi tai varasijalle tulleet ehdokkaat.
              Muut voivat halutessaan täyttää ennakkoilmoituksen, mutta näiden osalta prosenttimäärät ovat surullisen
              pieniä. [TODO: lisää tilastoja tähän]. Suomen listavaalitavasta johtuen kuitenkin, jokainen yhden
              ehdokkaan näkyvyyteen käytetty euro on käytännössä hyödyttää koko listaa. Ja kunta- ja aluetason
              luottamustoimikäyntäntöjen takia, yleensä jopa varapaikasta kausa jääneillä ehdokkailla on täysin
              mahdollista päästä julkisen valmisteluvallan käyttäjiksi ja luottamustoimipallille istumaan.
            </Text>
            <Text>
              Lopultahan ongelma tässäkin on äänestäjäkunnan ja siten median kiinnostuksen puute vaalirahoitusta
              kohtaan. Mikäli ehdokaan etupiirien ymmärätäminen ei paina paljoa vaakakupissa äänestyspäätöstä tehdessä,
              tulee myös vaalirahoitusilmoitusten tekemisestä aikalailla tyhjäpäiväistä teatteria.
            </Text>
            <Text>T. Visa Pollari</Text>
          </div>
          <Tapausnavigaattori tapaukset={tapaukset} />
        </div>
        <ReferenceList sources={references} />
      </article>
    </div>
  );
};

export default PartiesPage;
