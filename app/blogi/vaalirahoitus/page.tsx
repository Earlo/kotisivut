import ArticleDates from '@/components/ArticleDates';
import Text from '@/components/Text';
import Tapahtumakortti from '@/components/vaalirahoitus/Tapahtumakortti';
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
        <h1 id="vaalirahoitus-heading" className="mb-4 text-3xl font-bold">
          Suomen vaalirahoitusvalvonnan puutteet.
        </h1>
        <ArticleDates {...contentDates.vaalirahoitus} />
        <Text>
          Vuonna 2008 oli Suomen mediassa pinnalla ns. "vaalirahoituskohu". Keskustan kansanedustaja Timo Kallin
          kieltäydyttyä haastattelussa kertomasta tukiyhdistyksensä vastaanottamien lahjoituste summia.
          Vaalirahoituslaki jo tuolloin vaati ilmoittamaan kaikki yli 1700 euroa ylittävät lahjoitukset. Kuitenkin,
          Kallin argumentoi, että kyseistä lakia ei tarvitse noudattaa, sillä siitä ei ole säädetty minkäänlaista
          rangaistusta.
        </Text>
        <Text>
          Kyseinen tapaus poiki paljon julkista keskustelua, ja siivittikin vaalirahoituslain uudistamista. Elikkäs
          homma taputeltu kuntoon ja sillä hyvä. Eikös näin?
        </Text>
        <Text>
          Noh, tilanne vuonna 2026 on edelleen sama. Vaalirahoituslaki on edelleen olemassa, muutamia ilmoituskynnyksiä
          on rukattu alaspäin, ja vaaditaan tarkempaa erittelyä, ja asetettu kattoja yhden lahjoittajan tekemille
          lahjoituksille. Mutta erot ovat pääosin täysin kosmeettisia. Muunmmuassa asetettu katto lahjoitusten koolle ei
          ole millään tavalla sitova. Rajan ylittäimisestä ei ole mitään säädettyä sanktiota.
        </Text>

        <Text>
          Tämänhetkiset rajat yksittäisen lahjoittajan tekemille lahjoituksille ovat seuraavanlaiset: Kuntavaaleissa
          3000 euroa, eduskunta- ja aluevaaleissa 6 000 euroa, europarlamenttivaaleissa 10 000 euroa. Rajat ovat
          vaalikohtaisia, eli yhdistetyissä Alue- ja kuntavaaleissa on raja käytännössä 9000 euroa. Lahjaveron 5000euron
          kynnys ei tietenkään koske vaalirahoitusta, vaan on täysin erillinen asia :tm:.
        </Text>
        <section className="my-10" aria-labelledby="tapaukset-heading">
          <div className="mb-6 max-w-3xl">
            <p className="mb-2 text-sm font-semibold tracking-widest text-red-300 uppercase">Ilmoituksista poimittua</p>
            <h2 id="tapaukset-heading" className="text-2xl font-bold text-white sm:text-3xl">
              Vaalirahoituksen tapauskortit
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-400">
              Alla olevat tapaukset perustuvat ehdokkaiden julkisiin vaalirahoitusilmoituksiin. Kortin luokitus kertoo,
              kuinka yksiselitteisesti mahdollinen ylitys tai avoimuusongelma käy ilmoituksesta ilmi.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {tapaukset.map((tapaus) => (
              <Tapahtumakortti key={`${tapaus.lahde}-${tapaus.rahoittaja}`} tapaus={tapaus} />
            ))}
          </div>
        </section>
        <Text>
          Vielä ongelmallisempaa on, että valvonta perustuu pitkälti ehdokkaiden itse tekemiin ilmoituksiin. Kun
          julkisia vaalirahoitusilmoituksia alkaa käydä järjestelmällisesti läpi, vastaan tulee sekä ilmeisiä tukikaton
          ylityksiä että ilmoituksia, joista ei pysty edes yksiselitteisesti selvittämään, kuka rahoituksen alkuperäinen
          antaja on. [TODO: nosto tapaukseen Jäntti]. Kyseinen tapaus sattui omiin näppeihin ihan summanmutikassa VTV:n
          rahoitusportaalia selatessa. Mikäli rahoituksen lähteitä halutaan peittää, on se täysin triviaalia
          reitittämällä raha useampien välikäsien kautta. Ja mikäli rahoituksen alkuperäinen lähde on ulkomainen, ei
          sitä edes tarvitse ilmoittaa. [TODO: nosto tapaukseen Orpo].
        </Text>
        <Text>
          Valvonta perustuu pitkälti siihen, että media ja kansalaiset jaksavat toimia vallan vahtikoirina. Muutamia
          tapauksia on mm. [Case Orpo ja Case Harakka]. Näissäkin, lakia ilmiselvästi rikottiin, mutta ainoa seuraamus
          oli se, että ylitetty määrä palautettiin lahjoittajalle.
        </Text>
        <Text>
          Vaalrahoituksen vastaanottanut ehdokas tai tukiyhdistys on täysin vapaa käyttämään vastaanottamansa rahat
          täysin itselleen parhaalla katsomallaan tavallaan. Tämä tiedän hyvin, sillä nurkissani taitaa vieläkin lojua
          Pro Markkinatalouden minulle vuoden 2023 vaaleihin myöntämällä 1 500 eurolla ostama pullo Puolustuslaitoksen
          Leikattua. Korkkaamaton. [TODO mieti haluunko sanoa tän :D]
        </Text>

        <Text>
          Tämän lisäksi, ilmoituvelvollisia on pelkästään vaaleissa valituksi tai varasijalle tulleet ehdokkaat. Muut
          voivat halutessaan täyttää ennakkoilmoituksen, mutta näiden osalta prosenttimäärät ovat surullisen pieniä.
          [TODO: lisää tilastoja tähän]. Suomen listavaalitavasta johtuen kuitenkin, jokainen yhden ehdokkaan
          näkyvyyteen käytetty euro on käytännössä hyödyttää koko listaa. Ja kunta- ja aluetason
          luottamustoimikäyntäntöjen takia, yleensä jopa varapaikasta kausa jääneillä ehdokkailla on täysin mahdollista
          päästä julkisen valmisteluvallan käyttäjiksi ja luottamustoimipallille istumaan.
        </Text>
        <Text>T. Visa Pollari</Text>
      </article>
    </div>
  );
};

export default PartiesPage;
