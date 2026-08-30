import ArticleDates from '@/components/ArticleDates';
import Subheader from '@/components/Subheader';
import Text from '@/components/Text';
import Title from '@/components/Title';
import Money from '@/components/vaalirahoitus/Money';
import Tapausnavigaattori from '@/components/vaalirahoitus/Tapausnavigaattori';
import { contentDates } from '@/lib/contentDates';
import { articleAuthorJsonLd } from '@/lib/schema';
import type { Metadata } from 'next';
import tapaukset from './caset.json';

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
              Vaalirahoituslaki jo tuolloin vaati ilmoittamaan kaikki yli <Money amount={1700} />
              :n lahjoitukset. Kuitenkin, Kallin argumentoi, että kyseistä lakia ei tarvitse noudattaa, sillä siitä ei
              ole säädetty minkäänlaista rangaistusta.
            </Text>
            <Text>
              Kyseinen tapaus poiki paljon julkista keskustelua, ja siivittikin vaalirahoituslain uudistamista. Elikkäs
              homma taputeltu kuntoon ja sillä hyvä. Eikös näin?
            </Text>
            <Text>
              Noh, tilanne vuonna 2026 on edelleen sama. Vaalirahoituslaki on edelleen olemassa, muutamia
              ilmoituskynnyksiä on rukattu alaspäin, ja vaaditaan tarkempaa erittelyä, ja asetettu kattoja yhden
              lahjoittajan tekemille lahjoituksille. Mutta erot ovat pääosin täysin kosmeettisia. Muunmmuassa asetettu
              katto lahjoitusten koolle ei ole millään tavalla sitova. Rajan ylittäimisestä ei ole mitään säädettyä
              sanktiota.
            </Text>

            <Text>
              Tämänhetkiset rajat yksittäisen lahjoittajan tekemille lahjoituksille ovat seuraavanlaiset: Kuntavaaleissa{' '}
              <Money amount={3000} />, eduskunta- ja aluevaaleissa <Money amount={6000} /> ja europarlamenttivaaleissa{' '}
              <Money amount={10000} />. Rajat ovat vaalikohtaisia, eli yhdistetyissä alue- ja kuntavaaleissa raja on
              käytännössä <Money amount={9000} />. Lahjaveron <Money amount={5000} />
              :n kynnys ei tietenkään koske vaalirahoitusta, vaan on täysin eri asia™. Mikäli ehdokkaan itse omistama
              firma maksaa ehdokkaalle tukea, on se myös keino käytännössä nostaa verottomia osinkoja.
            </Text>
            <Text>
              Vielä ongelmallisempaa on, että valvonta perustuu pitkälti ehdokkaiden itse tekemiin ilmoituksiin. Kun
              julkisia vaalirahoitusilmoituksia alkaa käydä järjestelmällisesti läpi, vastaan tulee sekä ilmeisiä
              tukikaton ylityksiä että ilmoituksia, joista ei pysty edes yksiselitteisesti selvittämään, kuka
              rahoituksen alkuperäinen antaja on. [TODO: nosto tapaukseen Jäntti]. Kyseinen tapaus sattui omiin
              näppeihin ihan summanmutikassa VTV:n rahoitusportaalia selatessa. Mikäli rahoituksen lähteitä halutaan
              peittää, on se täysin triviaalia reitittämällä raha useampien välikäsien kautta.
            </Text>
            <Subheader>Kuinka piilottaisin vaalirahoitusta jos haluaisin Tips and Tricks</Subheader>
            <Text>1. Valitse ehdokas joka ei missään nimessä ole pääsemässä läpi, kuten vaikka Visa Pollari. 2.</Text>
            <Text>
              Valvonta perustuu pitkälti siihen, että media ja kansalaiset jaksavat toimia vallan vahtikoirina. Muutamia
              tapauksia on mm. [Case Orpo ja Case Harakka]. Näissäkin, lakia ilmiselvästi rikottiin, mutta ainoa
              seuraamus oli se, että ylitetty määrä palautettiin lahjoittajalle.
            </Text>
            <Text>
              Vaalrahoituksen vastaanottanut ehdokas tai tukiyhdistys on täysin vapaa käyttämään vastaanottamansa rahat
              täysin itselleen parhaalla katsomallaan tavallaan. Tämä tiedän hyvin, sillä nurkissani taitaa vieläkin
              lojua Pro Markkinatalouden minulle vuoden 2023 vaaleihin myöntämällä <Money amount={1500} />
              :lla ostama pullo Puolustuslaitoksen Leikattua. Korkkaamaton. [TODO mieti haluunko sanoa tän :D]
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
      </article>
    </div>
  );
};

export default PartiesPage;
