import ArticleDates from '@/components/ArticleDates';
import BarChart from '@/components/BarChart';
import Reference, { ReferenceList, type ReferenceSource } from '@/components/Reference';
import Subheader from '@/components/Subheader';
import Text from '@/components/Text';
import Title from '@/components/Title';
import { contentDates } from '@/lib/contentDates';
import { articleAuthorJsonLd } from '@/lib/schema';
import type { Metadata } from 'next';
import Image from 'next/image';
import type { Article, BreadcrumbList, WithContext } from 'schema-dts';
import { governmentGroups, ministerRows, ministersByGroup, ministerTotal, oppositionGroups } from './data';
import voimasuhteet from './voimasuhteet.png';

const title = 'Nillityspsykoosi: Hallituksessa on 108 kansanedustajaa. Paitsi ettei ole.';
const description =
  'Hallitus, hallituspuolueet ja eduskuntaryhmät ovat eri asioita. Pohdintaa eduskunnan pylväsdiagrammista, parlamentarismista ja käsitteiden tarkkuudesta.';
const url = 'https://visapollari.fi/blogi/hallitus';
const imageUrl = `${url}/opengraph-image`;

export const metadata = {
  title,
  description,
  alternates: { canonical: '/blogi/hallitus' },
  openGraph: {
    title,
    description,
    url,
    type: 'article',
    publishedTime: contentDates.hallitus.published,
    modifiedTime: contentDates.hallitus.modified,
    authors: ['https://visapollari.fi/'],
    images: [
      { url: imageUrl, width: 1200, height: 630, alt: 'Hallituksessa on 108 kansanedustajaa. Paitsi ettei ole.' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@visapollari',
    creator: '@visapollari',
    images: [imageUrl],
  },
} satisfies Metadata;

const references = [
  {
    href: 'https://www.finlex.fi/fi/lainsaadanto/1999/731',
    title: 'Suomen perustuslaki (731/1999), erityisesti 3, 29, 60 ja 61 §',
  },
  {
    href: 'https://www.eduskunta.fi/fi/kansanedustajat-ja-toimielimet/eduskuntaryhmat/eduskuntaryhman-tyo',
    title: 'Eduskunta: Eduskuntaryhmän työ',
  },
  {
    href: 'https://valtioneuvosto.fi/hallitusneuvottelut/miten-hallitus-muodostetaan',
    title: 'Valtioneuvosto: Miten hallitus muodostetaan eduskuntavaalien jälkeen?',
  },
  {
    href: 'https://www.finlex.fi/fi/viranomaiset/oikeuskansleri/2000/1345',
    title:
      'Apulaisoikeuskanslerin ratkaisu 7.1.2000: Puolue- eli ryhmäkurista kansanedustajan riippumattomuuden kannalta',
  },
  {
    href: 'https://valtioneuvosto.fi/hallitukset',
    title: 'Valtioneuvosto: Pääministeri Petteri Orpon hallitus ja ministerien henkilökuvat (tarkistettu 1.11.2026)',
  },
] satisfies readonly ReferenceSource[];

export default function HallitusPage() {
  const articleJsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: articleAuthorJsonLd,
    datePublished: contentDates.hallitus.published,
    dateModified: contentDates.hallitus.modified,
    image: imageUrl,
    url,
    mainEntityOfPage: url,
  };
  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Etusivu', item: 'https://visapollari.fi/' },
      { '@type': 'ListItem', position: 2, name: 'Blogi', item: 'https://visapollari.fi/blogi' },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  };
  const governmentTotal = governmentGroups.reduce((total, group) => total + group.value, 0);
  const oppositionTotal = oppositionGroups.reduce((total, group) => total + group.value, 0);

  return (
    <article aria-labelledby="hallitus-heading" className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <script
        id="hallitus-article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        id="hallitus-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className="mx-auto max-w-3xl">
        <Title id="hallitus-heading" className="leading-tight sm:text-4xl">
          {title}
        </Title>
        <ArticleDates {...contentDates.hallitus} />
      </header>
      <div className="mx-auto max-w-3xl">
        <Text>
          Eksyin tässä eräänä päivänä eduskunnan verkkosivuille, ja onnistuin pahoittamaan mieleni yhdestä
          pylväsdiagrammista.
        </Text>
        <Text>
          Eduskunnan etusivulla esitellään eduskuntaryhmien voimasuhteita. Kaaviossa kansanedustajat on jaettu kahteen
          joukkoon:
        </Text>
        <ul className="mb-6 list-disc space-y-2 pl-5 text-lg text-gray-200">
          <li>
            <strong>Hallitus: 108 kansanedustajaa</strong>
          </li>
          <li>
            <strong>Oppositio: 92 kansanedustajaa</strong>
          </li>
        </ul>
      </div>

      <figure className="my-8">
        <a
          href={voimasuhteet.src}
          className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
          aria-label="Avaa alkuperäinen kuvakaappaus täysikokoisena"
        >
          <Image
            src={voimasuhteet}
            alt="Eduskuntaryhmien voimasuhteet: Hallitus 108 kansanedustajaa, oppositio 92 kansanedustajaa. Ryhmäkohtaiset luvut esitetään myös alla olevissa kaavioissa."
            sizes="(max-width: 1024px) 100vw, 976px"
            className="h-auto w-full rounded-lg bg-white"
          />
        </a>
        <figcaption className="mt-3 text-sm leading-relaxed text-gray-400">
          Kuvakaappaus eduskunnan verkkosivuilta. Kuvan tallennuspäivä ei ole tiedossa; tämän kirjoituksen 108–92-jako
          viittaa kuvan tilanteeseen.
        </figcaption>
      </figure>

      <section aria-labelledby="voimasuhteet-heading" className="my-10">
        <h2 id="voimasuhteet-heading" className="mb-2 text-2xl font-bold text-gray-200">
          Sama jako pylväinä
        </h2>
        <p className="mb-5 text-sm leading-relaxed text-gray-400">
          Kuvan luvut ja otsikointi uudelleen piirrettynä. Molemmissa kaavioissa on sama asteikko: 0–50 kansanedustajaa.
        </p>
        <div className="grid items-start gap-5 md:grid-cols-2">
          <BarChart
            id="hallitusryhmat"
            title={`Hallitus: ${governmentTotal} kansanedustajaa`}
            rows={governmentGroups}
            maxValue={50}
            unit="Kansanedustajia"
          />
          <BarChart
            id="oppositioryhmat"
            title={`Oppositio: ${oppositionTotal} kansanedustajaa`}
            rows={oppositionGroups}
            maxValue={50}
            unit="Kansanedustajia"
          />
        </div>
      </section>

      <div className="mx-auto max-w-3xl">
        <Text>
          Tässä on vain yksi ongelma. Hallituksessa ei ole 108 kansanedustajaa. Eikä hallitukseen oikeastaan kuulu
          kansanedustajia lainkaan siinä ominaisuudessa, että he ovat kansanedustajia.
        </Text>
        <Text>Tiedän, mitä tällä tarkoitetaan. Kaikki tietävät. Mutta juuri se tässä ärsyttääkin.</Text>

        <Subheader>Mikä ihmeen hallitus?</Subheader>
        <Text>
          Suomen perustuslain 60 § määrittelee valtioneuvoston kokoonpanon varsin yksiselitteisesti
          <Reference number={1} />:
        </Text>
        <blockquote className="my-6 border-l-4 border-sky-400 pl-5 text-xl leading-relaxed text-gray-100">
          <p>Valtioneuvostoon kuuluu pääministeri ja tarvittava määrä muita ministereitä.</p>
        </blockquote>
        <Text>Siinä se. Siinä on hallitus.</Text>
        <Text>
          Ei kokoomuksen eduskuntaryhmää, ei perussuomalaisten eduskuntaryhmää, ei RKP:tä eikä kristillisdemokraatteja.
          Ei edes puolueita ylipäätään. Hallitus on pääministeristä ja muista ministereistä muodostuva valtioelin.
        </Text>
        <Text>
          Ministerin ei tarvitse olla kansanedustaja. Hänen ei tarvitse kuulua mihinkään puolueeseen. Valtioneuvosto
          voisi aivan hyvin koostua yksinomaan puolueisiin sitoutumattomista henkilöistä.
        </Text>
        <Text>
          Hallitus ei myöskään ole eduskunnan osa. Perustuslain 3 §:ssä valtiolliset tehtävät jaetaan nimenomaisesti
          siten, että lainsäädäntövaltaa käyttää eduskunta ja hallitusvaltaa tasavallan presidentti sekä valtioneuvosto.
        </Text>
        <Text>
          Eduskunnan tehtävänä on muun muassa valvoa hallitusta. Hallituksen jäsenten tulee nauttia eduskunnan
          luottamusta.
        </Text>
        <Text>
          Miten ihmeessä olemme päätyneet tilanteeseen, jossa eduskunnan omilla verkkosivuilla hallitus esitetään 108
          kansanedustajan joukkona?
        </Text>

        <Subheader>Puolueet eivät ole hallitus</Subheader>
        <Text>
          Käytännössä hallitus muodostetaan eduskuntaryhmien välisten neuvottelujen pohjalta. Tästä on jopa säädetty
          perustuslain 61 §:ssä
          <Reference number={1} />
          <Reference number={3} />.
        </Text>
        <Text>
          Mutta perustuslaki ei edellytä, että hallituksen muodostamiseen osallistuvat eduskuntaryhmät sitoutuisivat
          hallituksen tukemiseen koko vaalikaudeksi. Se ei edellytä ministerinsalkkujen jakamista puolueiden kesken,
          eikä ministerien puoluesidonnaisuutta.
        </Text>
        <Text>Nämä ovat poliittisia käytäntöjä, eivät hallituksen oikeudellisen määritelmän osia.</Text>
        <Text>
          Käytännössä puolueet sopivat keskenään hallituksen kokoonpanosta, ohjelmasta ja tukemisesta. Tällainen
          yhteistyö on tietenkin täysin hyväksyttävää. Se on myös käytännöllinen tapa organisoida parlamentaarista
          päätöksentekoa.
        </Text>
        <Text>Mutta puolueiden muodostama poliittinen yhteistyöverkosto ei ole sama asia kuin valtioneuvosto.</Text>
        <Text>Ero ei ole merkityksetön.</Text>
        <Text>
          Perustuslain 29 § määrittelee kansanedustajan riippumattomuuden. Kansanedustaja on velvollinen noudattamaan
          oikeutta, totuutta ja perustuslakia, eivätkä häntä sido muut määräykset
          <Reference number={1} />.
        </Text>
        <Text>
          Hallituspuolueen kansanedustaja ei ole juridisesti velvollinen kannattamaan hallituksen esityksiä tai edes
          antamaan hallitukselle luottamustaan.
        </Text>
        <Text>
          Puoluekuri on poliittinen, ei oikeudellinen velvoite
          <Reference number={2} />
          <Reference number={4} />.
        </Text>
        <Text>
          Kun kansanedustajat kategorisoidaan hallitukseen ja oppositioon, tämä ero hämärtyy. Syntyy vaikutelma, että
          hallituspuolueiden kansanedustajat ovat ensisijaisesti osa hallitusta, eivät sitä valvovaa eduskuntaa.
        </Text>

        <Subheader>Käytäntö muuttuu instituutioksi</Subheader>
        <Text>
          Tietenkin hallituspuolueiden ja opposition välinen jako on poliittisesti merkityksellinen. Hallituksen
          toimintakyky riippuu sen saamasta parlamentaarisesta tuesta, ja puolueet ovat keskeisiä tämän tuen
          organisoimisessa.
        </Text>
        <Text>En siis väitä, että hallituspuolueista tai oppositiosta pitäisi lakata puhumasta.</Text>
        <Text>
          Minua häiritsee, kuinka itsestään selvänä pidämme puolueiden muodostamien koalitioiden asemaa, kunnes ne
          alkavat käsitteellisesti korvata varsinaiset valtioelimet.
        </Text>
        <Text>Eduskunnan verkkosivujen kaavio voisi aivan hyvin ilmoittaa:</Text>
        <ul className="mb-4 list-disc space-y-2 pl-5 text-lg text-gray-200">
          <li>
            <strong>Hallituspuolueiden eduskuntaryhmät: 108 kansanedustajaa</strong>
          </li>
          <li>
            <strong>Oppositioryhmät: 92 kansanedustajaa</strong>
          </li>
        </ul>
        <Text>Informaatiosisältö olisi täsmälleen sama, mutta käsitteet olisivat oikein.</Text>
        <Text>
          Tämä voi tuntua mitättömältä semanttiselta erolta. Minusta se kuitenkin kertoo jotakin siitä, miten
          suomalaista parlamentarismia hahmotetaan.
        </Text>
        <Text>
          Eduskunta nähdään helposti hallituksena ja oppositiona, kahden keskenään kilpailevan poliittisen blokin
          näyttämönä. Hallituksen parlamentaarista enemmistöä käsitellään ikään kuin se olisi osa toimeenpanovaltaa.
        </Text>
        <Text>
          Tosiasiassa kaikki 200 kansanedustajaa kuuluvat samaan valtioelimeen, jonka tehtävänä on käyttää
          lainsäädäntövaltaa ja valvoa hallitusta.
        </Text>
        <Text>
          Tämä ei tarkoita, että puolueiden välisestä yhteistyöstä pitäisi luopua. Mutta olisi hyvä muistaa, että
          puolueiden välinen työnjako on eri asia kuin perustuslain määrittelemä valtiorakenne.
        </Text>
      </div>

      <section aria-labelledby="ministerit-heading" className="my-10">
        <div className="mx-auto max-w-3xl">
          <h2 id="ministerit-heading" className="mb-4 text-2xl font-bold text-gray-200">
            Entä ketkä oikeasti ovat hallituksessa?
          </h2>
          <Text>
            Jos halutaan kuvata nimenomaan valtioneuvoston ja eduskunnan henkilöllistä päällekkäisyyttä, voidaan laskea
            eduskuntaryhmittäin ne ministerit, jotka toimivat myös kansanedustajina. Asian voisi ilmaista vaikkapa näin:
          </Text>
          <blockquote className="my-6 border-l-4 border-sky-400 pl-5 text-xl leading-relaxed text-gray-100">
            <p>
              Seuraavissa eduskuntaryhmissä on tekemässä kansanedustajan sivupestiä {ministerTotal} valtioneuvoston
              jäsentä.
            </p>
          </blockquote>
          <Text className="text-base text-gray-400">
            ”Sivupesti” on tässä kielellinen kärjistys. Oikeudellisesti kansanedustajuus ja ministerin tehtävä ovat
            erillisiä valtiosääntöisiä tehtäviä. Ministerin ei tarvitse olla kansanedustaja; tämä kaavio laskee vain
            molempia tehtäviä hoitavat henkilöt.
          </Text>
        </div>
        <BarChart
          id="ministerit"
          title={`Valtioneuvoston jäsenet eduskuntaryhmissä: ${ministerTotal} henkilöä`}
          rows={ministerRows}
          maxValue={8}
          unit="Valtioneuvoston jäseniä, jotka ovat myös kansanedustajia"
        />
        <p className="mt-3 text-sm leading-relaxed text-gray-400">
          Tilanne 1.11.2026. Lähde: valtioneuvoston ministeriluettelo ja ministerien henkilökuvat
          <Reference number={5} />. Tämä kaavio kuvaa eri ajankohtaa ja eri asiaa kuin yllä olevan kuvakaappauksen
          108–92-jako. Pylväiden asteikko on 0–8 henkilöä.
        </p>
        <details className="mt-4 rounded-lg border border-white/10 p-4 text-sm text-gray-300">
          <summary className="cursor-pointer font-semibold text-sky-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">
            Ketkä {ministerTotal} valtioneuvoston jäsentä kaaviossa lasketaan?
          </summary>
          <dl className="mt-4 space-y-4 leading-relaxed">
            {ministersByGroup.map((group) => (
              <div key={group.label}>
                <dt className="font-semibold text-gray-100">
                  {group.label} ({group.members.length})
                </dt>
                <dd>{group.members.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </details>
      </section>

      <div className="mx-auto max-w-3xl">
        <Subheader>Miksi nillittää yhdestä pylväsdiagrammista?</Subheader>
        <Text>Koska kyseessä on eduskunnan oma verkkosivusto.</Text>
        <Text>
          Yksittäisen toimittajan tai kansalaisen puheissa tällainen epätarkkuus ei häiritse minua juuri lainkaan.
          Arkikielessä sanat saavat tarkoittaa kaikenlaista.
        </Text>
        <Text>
          Mutta valtiollisen instituution itsensä voisi odottaa käyttävän käsitteitä, jotka erottavat toisistaan sen,
          mikä perustuu lakiin, ja sen, mikä perustuu vakiintuneeseen poliittiseen käytäntöön.
        </Text>
        <Text>Erityisesti silloin, kun kyse on valtiollisten toimielinten välisistä suhteista.</Text>
        <Text>
          Kenties huoleni on täysin suhteeton. Tuskin kukaan on muodostanut virheellistä käsitystä Suomen
          valtiosäännöstä yhden diagrammin perusteella. Eikä yhden sanan vaihtaminen eduskunnan etusivulla tietenkään
          muuta parlamentarismin toimintaa. Ja on toki sillä arvonsa, että valtiolliset elimet viestivät
          kansankielisesti.
        </Text>
        <Text>
          Mutta minusta on kiinnostavaa, kuinka helposti poliittiset käytännöt muuttuvat ajattelussamme itsestään
          selviksi rakenteiksi. Niin itsestään selviksi, ettemme enää huomaa eroa käytännön ja oikeudellisen
          järjestelmän välillä. Erityisesti silloin, kun nämä pehmeät rakenteet pönkittävät olemassa olevia
          valtarakenteita, kuten puolueinstituutiota, entistä voimakkaammaksi.
        </Text>
        <Text>
          Ja jos tämä ero hämärtyy jopa eduskunnan omassa viestinnässä, missä sen sitten pitäisi pysyä kirkkaana?
        </Text>
        <Text className="mt-6 font-bold">
          Hallituksessa ei ole 108 kansanedustajaa, vaan kuvan tilanteessa 108 kansanedustajaa kuuluu hallituspuolueiden
          eduskuntaryhmiin.
        </Text>
        <Text>Se on eri asia.</Text>
        <Text>Kiitos, että osallistuitte tämänkertaisen nillityspsykoosini käsittelyyn.</Text>
        <ReferenceList sources={references} />
      </div>
    </article>
  );
}
