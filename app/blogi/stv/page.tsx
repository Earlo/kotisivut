'use client';
import { defaultVotes } from './votes';
import RealVote from '@/components/stv/RealVote';
import BallotBox from '@/components/stv/BallotBox';
import ResultGraph from '@/components/stv/ResultsGraph';
import Header from '@/components/BlogHeader';
import Text from '@/components/Text';
import Subheader from '@/components/Subheader';
import { useState } from 'react';
import Link from 'next/link';

const Page = () => {
  const [allVotes, setAllVotes] = useState<string[][]>(defaultVotes);

  const candidates = [
    { name: 'Stobb', imageSrc: '/stv/Stobb.png', color: '#ff0000' },
    { name: 'Laho-Hall', imageSrc: '/stv/Laho-Hall.png', color: '#00ff00' },
    { name: 'Maik Weiv', imageSrc: '/stv/Maik.png', color: '#0000ff' },
    { name: 'Väykkä', imageSrc: '/stv/Väykkä.png', color: '#ffff00' },
  ];
  const votesWithColor = allVotes.map((vote) => {
    const voteWithColor = {
      vote: vote.filter((candidate) =>
        candidates.find((c) => c.name === candidate),
      ),
      color: candidates.find((c) => c.name === vote[0])?.color || '#aaaaaa',
    };
    return voteWithColor;
  });
  return (
    <div className="max-w-8xl mx-auto bg-gray-950 p-4 ">
      <Header>Siirtoäänivaali</Header>
      <Text>
        Presidentinvaalien ennakkoäänestys on meneillään. Ehdokkaat ovat
        99-prosenttisesti samaa mieltä kaikesta, joten mitään järkyttävän suurta
        jännitysnäytelmää ei ole luvassa. Tästä syystä tilaisuus onkin mitä
        parhain keskustella jokaisten vaalien kaikista kiinnostavimmasta asiasta
        eli vaalimetasta.
      </Text>
      <Text>
        Suomen nykyinen kaksikierroksinen presidentinvaalikäytäntö lienee
        kaikille tuttu, mutta kertauksena: Jokainen äänioikeutettu voi äänestää
        yhtä ehdokasta, ja näistä ehdokkaista valitaan se, joka saa yli puolet
        äänistä. Kuitenkin, mikäli kukaan ehdokkaista ei ylitä tätä 50%
        rajapyykkiä, järjestetään kahden ensimmäisellä kierroksella eniten ääniä
        saaneen ehdokkaan välillä toinen kierros.
      </Text>
      <Text>
        Tässä järjestelmässä on kuitenkin ongelmansa. Ilmeisin niistä on
        dominoinut keskustelua niin aiempien eduskuntavaalien alla, ja
        nousevasti nytkin presidentinvaaleissa, eli taktinen äänestäminen.
        Vaikka käytössä olevan vaalitavan etuna on sen yksinkertaisuus, voi
        äänestyspäätös olla äänestäjälle hyvinkin monimutkainen, mikäli hän
        alkaa päätöstään enemmän miettimään.
      </Text>
      <Text>
        Mikäli äänestäjä haluaa varmistaa itsensä kannalta mieluisimman
        mahdollisen lopputuloksen, ei hänen ole välttämättä järkevää äänestää
        omaa suosikkiaan, vaan valita sellainen ehdokas, jolla on mahdollisimman
        suuri todennäköisyys päästä toiselle kierrokselle ja voittaa se.
        Erityisesti nykyisellä sosiaalisen median ja välittömän kommunikaation
        aikakaudella tämä johtaa siihen, että äänestäjät jähmettyvät kahden
        suosituimman ehdokkaan taakse ja muut ehdokkaat jäävät marginaaliin.
        Gallupien ja median asema vaalien voittajassa kasvaa suunnattomasti, ja
        vetävä narratiivi kaksintaistelusta nousee ylitse itse politiikan
        substanssista puhumisen. Tämä puolestaan edistää monen jo monen
        huomaamaa ilmiötä poliittisesta polarisoitumisesta, jossa laajan kentän
        sijaan kannattajat keskittyvät muutaman kuplan ympärille.
      </Text>
      <Text>
        Mitä asialle voisi tehdä? Itse ehdotan ratkaisuksi siirtoäänivaaleja.
      </Text>
      <div className="mx-auto  rounded-lg  shadow">
        <Subheader>Siirtoäänivaali</Subheader>
        <div className="flex flex-col-reverse gap-2 md:grid md:grid-cols-2">
          <BallotBox
            votes={allVotes}
            setVotes={setAllVotes}
            candidates={candidates}
          />
          <div className="space-y-4 md:col-span-1">
            <Text>
              Siirtoäänivaalissa äänestäjät yksinkertaisesti asettavat ehdokkaat
              järjestykseen mieltymystensä mukaan. Äänet annetaan äänilipukkeen
              ensimmäiselle nimelle ja lasketaan vaalitulos näin. Jos yksikään
              ehdokas ei saa yli puolta äänistä, vähiten ääniä saanut ehdokas
              eliminoidaan ja hänen saamat äänet siirretään kunkin äänestäjän
              toiselle ehdokkaalle. Tätä prosessia jatketaan, kunnes joku
              ehdokas saa enemmistön äänet.
            </Text>
            <Text>
              Äänestyskertoja on siis vain yksi riippumatta ehdokkaiden
              määrästä. Lipukkeeseen ei tarvitse merkitä yhtään varavaihtoehtoa,
              mutta halutessaan voi merkitä vaikka kaikki. Mikäli kaikki lapulla
              olevat ehdokkaat on eliminoitu, ääni lasketaan tyhjäksi ääneksi.
              Tämä järjestelmä tunnetaan Single Transferable Vote -järjestelmänä
              (STV) (elikkäs SiirToääniVaaleina).
            </Text>
            <Text>
              Ohessa on esimerkkiäänilipas jossa on jo 50 esimerkkiääntä ja
              alapuolella on laskettu äänten siirtoäänivaalitulokset
              kierroksittain. Nykyisellä äänijakaumalla Väykkä voittaa vaalit
              toisella kierroksella, mutta lisäämällä ääniä lippaaseen voit
              muuta tulosta.
            </Text>
          </div>
        </div>
        <div className="mt-2 flex flex-col sm:flex-row">
          <ResultGraph votes={votesWithColor} candidates={candidates} />
        </div>
      </div>
      <Text>
        Mitkä ovat siis siirtoäänivaalin hyödyt verrattuna nykyiseen
        vaalitapaan? Nämä ovat tietenkin kirjoittajan subjektiivisia näkemyksiä,
        mutta tässä muutamia:
      </Text>
      <Text>
        1. Järjestelmä kannustaa äänestäjiä äänestämään omien mieltymystensä
        mukaan eikä taktikoimaan ääntään. Taktinen äänestäminen on varmasti
        jokaiselle tuttu konsepti viimeaikaisten vaalien vuoksi ja
        siirtoäänivaalitapa vähentää tätä ilmiötä merkittävästi. Oman äänensä
        voi ensisijaisesti antaa mieleisemmälle ehdokkaalle. Jos oma
        suosikkiehdokas tulee eliminoiduksi, ääni siirtyy seuraavalle. Lopulta
        ääni päätyy pienimmälle hyväksyttävälle pahalle, mikäli äänestäjä vain
        täyttää lipukkeen niin pitkälle.
      </Text>
      <Text>
        2. Järjestelmä vähentää ehdokkaiden iinsentiivejä pyrkiä vetoamaan vain
        suurimpaan yhteiseen nimittäjään. Se vapauttaa heidät ehkä jopa olemaan
        hiukan radikaalimpia ja vetoamaan myös pienempiin, kenties tällä
        hetkellä politiikasta vieraantuneisiin äänestäjäryhmiin.
      </Text>
      <Text>
        3. Kun äänestäjiä ei rangaista marginaalisempien ehdokkaiden
        äänestämisestä, myös yhteiskunta saa laajempaa tietoa siitä, minkälaisia
        ajatuksia ja ideologioita väestössä elää. Tämä voi olla hyvinkin
        arvokasta dataa yhteiskunnan ymmärtämisen kannalta ja se auttaa
        päätöksentekijöitä näkemään minkälaisille asioille on oikeasti kysyntää.
        Hyvä esimerkki tästä on Nato-jäsenyys. Ehdokkaat eivät halunnut puhua
        sen puolesta, sillä kansa ei ollut ilmaissut haluaan Natoa kohtaan
        tarpeeksi selkeästi. Kansa ei kyennyt ilmaisemaan Nato-kantaansa, sillä
        tarjolla ei ollut ehdokkaita, jotka olisivat selkeästi asettuneet asian
        taakse.
      </Text>
      <Subheader>Lopuksi</Subheader>
      <Text>
        Vaikka suomen vaalijärjestelmä ei ole maailman suurin farssi, on
        järjestelmässämme selkeä valuvika siinä, että mikään elin tai taho ei
        ole vastuussa järjestelmän aktiivisesta kehittämisestä. Tärkeimpiä
        henkilökohtaisia poliittisia tavoitteitani on juurikin metapoliittisen
        keskustelun herättely, niin Suomessa kuin laajemminkin.
      </Text>

      <Text>
        Mikäli haluat osallistua mielikuvitteellisiin siirtoäänivaaleihin
        nykyisten ehdokkaiden kautta, voit tehdä sen tästä. Julkaisen tulokset
        oikeiden vaalien jälkeen.
      </Text>
      <RealVote />
      <Subheader>Linkkejä</Subheader>
      <Link
        href="https://youtu.be/l8XOZJkozfI?si=m3URF-ou-g-ne3A7"
        className="flex transition-transform hover:underline"
      >
        Erinomainen Youtubevideo selittäen yhdenlaiset hypoteettiset
        siirtoäänivaalit
      </Link>
      <Link
        href="http://www.chickennation.com/voting/"
        className="flex transition-transform hover:underline"
      >
        Sarjakuva Australiassa käytössä olevasta siirtoäänivaalijärjestelmästä
      </Link>
      <Link
        href="https://en.wikipedia.org/wiki/Single_transferable_vote"
        className="flex transition-transform hover:underline"
      >
        Aiheesta wikipediassa
      </Link>
    </div>
  );
};

export default Page;
