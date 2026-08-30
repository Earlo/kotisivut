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

const ehdokkaatIlmanIlmoitusta = [
  { puolue: 'Liberaalipuolue – Vapaus valita', maara: '72', osuus: '22,6 %' },
  { puolue: 'Vihreä liitto', maara: '1 114', osuus: '23,6 %' },
  { puolue: 'Vasemmistoliitto', maara: '2 276', osuus: '41,8 %' },
  { puolue: 'Suomen Sosialidemokraattinen Puolue', maara: '4 613', osuus: '53,2 %' },
  { puolue: 'Suomen Keskusta', maara: '4 884', osuus: '53,2 %' },
  { puolue: 'Kansallinen Kokoomus', maara: '5 561', osuus: '60,6 %' },
  { puolue: 'Suomen ruotsalainen kansanpuolue', maara: '1 215', osuus: '61,2 %' },
  { puolue: 'Suomen Kristillisdemokraatit (KD)', maara: '2 434', osuus: '67,5 %' },
  { puolue: 'Perussuomalaiset', maara: '4 721', osuus: '68,8 %' },
  { puolue: 'Liike Nyt', maara: '707', osuus: '82,1 %' },
] as const;

export const metadata: Metadata = {
  title: 'Suomen vaalirahoitusvalvonnan puutteet',
  description:
    'Katsaus ja kevyttä OSINTtia liittyen suomen vaalirahoitusvalvonnan tilaan. Nostoja vallan vahtikoiran hampaattomuudesta, ja turhapäiväistä nillitystä.',
  alternates: { canonical: '/blogi/vaalirahoitus' },
  openGraph: {
    title: 'Suomen vaalirahoitusvalvonnan puutteet',
    description:
      'Katsaus ja kevyttä OSINTtia liittyen suomen vaalirahoitusvalvonnan tilaan. Nostoja vallan vahtikoiran hampaattomuudesta, ja turhapäiväistä nillitystä.',
    images: [
      {
        url: 'https://visapollari.fi/blogi/vaalirahoitus/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Vaalirahoituslain porsaanreiät',
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
    description:
      'Katsaus ja kevyttä OSINTtia liittyen suomen vaalirahoitusvalvonnan tilaan. Nostoja vallan vahtikoiran hampaattomuudesta, ja turhapäiväistä nillitystä.',
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
              päällekkäisinä vaaleina. Vielä 2025 vaaliessa oli aluevaalien ilmoitusraja sama kuin kuntavaalien{' '}
              <Money amount={800} /> mikäli ehdokas oli ehdolla molemmissa (<Money amount={1500} /> jos vain
              aluevaaleissa). Nostoa argumentoitiin indeksikorotuksena
              <Reference number={1} />. VTV:n aluevaalirahoitusraportin mukaan "Yhdistelmäehdokkaiden osalta erikseen
              ilmoitettavan tuen raja nousi vuoden 2025 lakimuutoksen myötä <Money amount={800} suffix=":sta" />{' '}
              <Money amount={2000} suffix=":oon" />. Siten yhdistelmäehdokas voi jat- kossa ottaa vastaan 150 prosenttia
              enemmän ulkopuolista rahoitusta ilman, että hänen tarvitsee nimetä tuen antajaa
              vaalirahoitusilmoituksella". Eli käytännössä jatkossa olemalla ehdolla myös aluevaaleissa,
              kuntavaaliehdokas voi vastaanottaa nimettömänä lahjoituksena <Money amount={1999.99} />{' '}
              <Money amount={799.99} suffix=":n" /> sijasta
              <Reference number={2} />. Kun näitä rajoja mietitään suhteessa siihen uskomattomaan määrään ehdokkaita
              joita jokaisissa vaaleissa on ehdolla, aukeaa väylä kanavoida erittäin suuria kokonaissummia
              puoluekoneistoille. Tilastotietoina, 2025 alue- ja kuntavaaleissa oli 29 950 kuntavaaliehdokasta, ja 10
              097 aluevaaliehdokasta.
            </Text>
            <Text>
              Tämänhetkiset rajat yksittäisen lahjoittajan tekemille lahjoituksille ovat seuraavanlaiset: Kuntavaaleissa{' '}
              <Money amount={3000} />, eduskunta- ja aluevaaleissa <Money amount={6000} /> ja europarlamenttivaaleissa{' '}
              <Money amount={10000} />. Rajat ovat vaalikohtaisia, eli yhdistetyissä alue- ja kuntavaaleissa raja on
              käytännössä <Money amount={9000} />. Lahjaveron nykyinen <Money amount={7500} /> tai eninen{' '}
              <Money amount={5000} suffix=":n" /> kynnys ei tietenkään koske vaalirahoitusta, vaan on tietenkin täysin
              eri asia™. Lisäpoikkeuksen muodostavat puolueet ja puolueyhdistykset, joilta ehdokas voi vastaanottaa tätä
              suurempia summia. Niidenkään kautta ei kuitenkaan saa välittää yhdeltä muulta tukijalta tukikaton
              ylittävää summaa, mutta mikäli tässä on vaikkapa puoluetuista saadusta "puolueen omasta rahasta", ei
              lahjoituksen määrälle ole mitään rajaa.
            </Text>
            <Text>
              Valvonta perustuu pitkälti siihen, että media ja kansalaiset jaksavat toimia vallan vahtikoirina. Yksi
              tällainen on <Tapauspainike nimi="Timo Harakka">Harakan tapaus</Tapauspainike>, jossa ehdokas sai
              julkisesti näpeilleen ja korjasi tilanteen sen seurauksena. VTV:n tarkastus ei kohdistu siihen, että onko
              rajoituksia rikottu vai ei, vaan pelkästään siihen että ilmoitus täytetään. Mikäli VTV:n ulkopuoliset
              tahot eivät ole raporteista kiinnostuneita, hautautuva ne unholaan. Toinen kiinnostava seikka tässä on se,
              mutiten verottajan mukaan oman firman ehdokkaalle tekemä lahjoitus voidaan tulkita peitetltynä osinkona
              <Reference number={3} />. Harakan tapauksessa myös mahdollinen peitelty osinko nousi mediassa esiin.
              Julkista tietoa siitä, miten asia lopulta vaikutti hänen verotuksessaan, en kuitenkaan löytänyt.
            </Text>
            <Text>
              Vielä ongelmallisempaa on, että itvalvonta perustuu pitkälti ehdokkaidense tekemiin ilmoituksiin. Kun
              julkisia vaalirahoitusilmoituksia alkaa käydä järjestelmällisesti läpi, vastaan tulee sekä ilmeisiä
              tukikaton ylityksiä että ilmoituksia, joista ei pysty edes yksiselitteisesti selvittämään, kuka
              rahoituksen alkuperäinen antaja on. Esimerkiksi{' '}
              <Tapauspainike nimi="Aleksi Jäntti">Jäntin tapaus</Tapauspainike> tuli itselle vastaan ihan
              summanmutikassa VTV:n rahoitusportaalia selatessa. Ilmoituksessahan ei itsessään ole yhtään mitään vikaa.
              Mutta se havainnollistaa hyvin kuinka huomattaviakin vaalikassoja on mahdollista kerätä ilman että
              yksikään yksittäinen lahoitus ylittää nimeämisrajan kynnystä. Mikäli rahoituksen lähteitä halutttaisiin
              peittää, uskoisin sen olevan varsin triviaalia reitittämällä raha useampien välikäsien tai muiden
              bulvaanien kautta.
            </Text>
            <Text>
              Ylipäätään vaalirahoitusilmoitusia selatessa, tuntuun ett ne ovat täytetty hyvinkin leväperäisesti. Jos
              katsomme vaikkapa <Tapauspainike nimi="Petteri Orpo">Petter Orpon</Tapauspainike> 2023
              vaalirahoitusilmoitusta. Tuon <Money amount={300} /> ylityksen lisäksi, on lomakkeessa kohta 2.8. jätetty
              täysin tyhjäksi, vaikka kohda 2.5. lisätiedoissa lukee "c. Lisätietoja Puolueelta saatu tuki sisältää
              välitettyä tukea seuraavilta tahoilta: T2H Group Oy 5000 €, Notalar Oy 4000 €, Versowood Oy 4000 €, Troll
              Capital Oy 4000 € sekä Paananen Elmar Jalo 5000 €.", eli nämä kyseiset seikat olisi tulleet olla
              eriteltynä viimeiseen kohtaan taulukkomuodossa. Tällaisen epästrukturoidun datan johdosta, on
              vaalirahoitusilmoitusten systemaattinen läpikäyminen on hyvin haastavaa. Ja jos kyseisenlainen datapuute
              menee VTV:n lävitse juuri vaalit voittaneen puolueen puheenjohtajan ilmoituksen osalta, niin voitte vain
              kuvitella minkälaista sekoilua muista ilmoituksista löytyy.
            </Text>
            <Text>
              Vaalrahoituksen vastaanottanut ehdokas tai tukiyhdistys on vapaa käyttämään vastaanottamansa rahat
              parhaalla katsomallaan tavallaan. Ja homma käy vielä lepsummaksi vaalien jälkeen. Vaalirahoituslain
              mukaan, mikäli vaalirahoitusta jää käyttämättä, ja ehdokkaalla ei ole esim. tukiyhdistystä jolla on
              ennaltamäärätty loppusijoituspaikka kerätyille varoille, siirtyy varat ehdokkaan omiin varoihin. Tämä
              tiedän hyvin, sillä nurkissani taitaa vieläkin lojua Pro Markkinatalouden minulle vuoden 2023 vaaleihin
              myöntämällä <Money amount={1500} suffix=":lla" /> ostama pullo Puolustuslaitoksen Leikattua. Korkkaamaton.
            </Text>
            <Text>
              Tämän lisäksi, ilmoituvelvollisia on pelkästään vaaleissa valituksi tai varasijalle tulleet ehdokkaat.
              Muut voivat halutessaan täyttää ennakkoilmoituksen, mutta suuri osa ehdokkaista jää kokonaan ilman
              ilmoitusta:
            </Text>
            <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/60">
              <div className="overflow-x-auto">
                <table className="w-full min-w-lg border-collapse text-left text-sm text-zinc-300">
                  <caption className="px-4 pt-4 pb-3 text-left text-base font-semibold text-zinc-100">
                    Vaalirahoitusilmoituksetta olevat ehdokkaat puolueittain
                  </caption>
                  <thead className="border-y border-white/10 bg-white/4 text-[0.65rem] tracking-wider text-zinc-500 uppercase">
                    <tr>
                      <th scope="col" className="px-4 py-2.5 font-semibold">
                        Puolue
                      </th>
                      <th scope="col" className="px-4 py-2.5 text-right font-semibold">
                        Ehdokkaita Ilman ilmoitusta (Tarkasteluväli vaalit 2019 - 2026)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.07]">
                    {ehdokkaatIlmanIlmoitusta.map((rivi) => (
                      <tr key={rivi.puolue}>
                        <th scope="row" className="px-4 py-3 font-medium text-zinc-200">
                          {rivi.puolue}
                        </th>
                        <td className="px-4 py-3 text-right font-semibold whitespace-nowrap text-white">
                          {rivi.osuus} <p className="font-light text-gray-500">({rivi.maara}kpl)</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Text>
              Suomen listavaalitavasta johtuen kuitenkin, jokainen yhden ehdokkaan näkyvyyteen käytetty euro on
              käytännössä hyödyttää koko listaa. Ja kunta- ja aluetason luottamustoimikäyntäntöjen takia, yleensä jopa
              varapaikasta kausa jääneillä ehdokkailla on täysin mahdollista päästä julkisen valmisteluvallan
              käyttäjiksi ja luottamustoimipallille istumaan.
            </Text>
            <Text>
              Lopultahan ongelma tässäkin on äänestäjäkunnan ja siten median kiinnostuksen puute vaalirahoitusta
              kohtaan. Mikäli ehdokaan etupiirien ymmärätäminen ei paina paljoa vaakakupissa äänestyspäätöstä tehdessä,
              tulee myös vaalirahoitusilmoitusten tekemisestä aikalailla tyhjäpäiväistä teatteria.
            </Text>
            <aside className="mt-8 border-l border-zinc-700 pl-4 text-sm leading-relaxed text-zinc-400">
              Mikäli huomaat kirjoituksessa asiavirheitä, tai muuta kommentoitavaa, ole yhteydessä{' '}
              <a
                href="mailto:visa@visapollari.fi"
                className="text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white"
              >
                visa@visapollari.fi
              </a>
              .
            </aside>
          </div>
          <Tapausnavigaattori tapaukset={tapaukset} />
        </div>
        <ReferenceList sources={references} />
      </article>
    </div>
  );
};

export default PartiesPage;
