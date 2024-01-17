'use client';
import { defaultVotes } from './votes';
import BallotBox from '@/components/stv/BallotBox';
import ResultGraph from '@/components/stv/ResultsGraph';
import Header from '@/components/BlogHeader';
import Text from '@/components/Text';
import Subheader from '@/components/Subheader';
import { useState } from 'react';

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
    <div className="max-w-8xl mx-auto p-4">
      <Header>Siirtoäänivaali</Header>
      <Text>
        Presidentinvaalien ennakkoäänestys on alkamassa, ja ehdokkaiden ollessa
        99-prosenttisesti samaa mieltä kaikesta, ei todellisuudessa ole luvassa
        mitään järkyttävän suurta jännitysnäytelmää. Tästä syystä tilaisuus
        onkin mitä parhain keskustella jokaisien vaalien kaikista
        kiinostavimmasta asiasta, eli vaalimetasta.
      </Text>
      <Text>
        Suomen nykyinen kaksikierroksinen presidentinvaalikäytäntö leinee
        kaikille tuttu. Jokainen äänioikeutettu voi äänestää yhtä ehdokasta, ja
        jos kukaan ehdokkaista ei saa yli 50% äänistä, järjestetään toinen
        kierros kahden eniten ääniä saaneen ehdokkaan välillä.
      </Text>
      <Text>
        Tässä järjestelmässä on kuitenkin ongelmansa. Joista itselleni ainakin
        selkein on se, miten se kannustaa vaalien aikana äänestäjiä taktikoimaan
        äänestystään. Mikäli äänestäjä haluaa varmistaa, itselleen parhaimman
        mahdollisen lopputuloksen, ei välttämätt ole järkevää äänestää omaa
        suosikkiaan, vaan rajoittaa valintansa niihin ehdokkaisiin joilla on
        mahdollisimman suuri todennäköisyys päästä toiselle kierrokselle ja
        voittaa se. Erityisesti nykyisessä sosiaalisen median ja välittömän
        kommunikaation aikakaudella, tämän johtaa siihen että äänestäjät
        jähmettyvät kahden suosituimman ehdokkaan taakse, ja muut ehdokkaat
        jäävät marginaaliin.
      </Text>
      <Text>
        Mitä asialle voisi tehdä? Itse haluaisin ehdottaa ratkaisuksi
        siirtoäänivaaleja
      </Text>
      <Subheader>Siirtoäänivaali</Subheader>
      <Text>
        Yksinkertaisesti siirtoäänivaalissa äänestäjät asettavat ehdokkaat
        järjestykseen mieltymystensä mukaan. Jos kukaan ehdokas ei saa heti
        enemmistöä äänistä, vähiten ääniä saanut ehdokas poistetaan, ja hänen
        äänensä siirretään äänestäjien toisen valinnan mukaisesti. Tätä
        prosessia jatketaan kunnes joku ehdokas saavuttaa enemmistön. Tämä
        järjestelmä tunnetaan Single Transferable Vote -järjesteämänä (STV)
        (elikkäs SiirToääniVaaleina.)
      </Text>
      <div className="mx-auto  rounded-lg  shadow">
        <Subheader>Esimerkkivaalit</Subheader>
        <div className="flex flex-col-reverse gap-2 md:grid md:grid-cols-2">
          <BallotBox
            votes={allVotes}
            setVotes={setAllVotes}
            candidates={candidates}
          />
          <div className="space-y-4 md:col-span-1">
            <Text>
              Siirtoäänivaalitapa toimii siten, että ensisijaisesti äänet
              annetaan äänilipukkeen ensimmäiselle nimelle, ja lasketaan
              vaalitulos näin. Mikäli yksikään ehdokkaista ei saavuta
              enemmistöä, poistetaan vähiten ääniä saanut ehdokas, ja hänen
              äänensä siirretään äänestäjien toisen valinnan mukaisesti. Tätä
              prosessia jatketaan kunnes joku ehdokas saavuttaa enemmistön.
            </Text>
            <Text>
              Tämä siis tarkoittaa, että äänestyskertoja on vain yksi,
              riippumatta ehdokkaiden määrästä. Lipukkeeseen ei tarvitse merkitä
              yhtään varavaihtoehtoa, mutta jos haluaa, voi merkitä vaikka
              kaikki. Mikäli kaikki lapulla olevat ehdokkaat on eliminoitu,
              lasketaan ääni tästä eteenpäin tyhjäksi ääneksi.
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
        Mitkä ovat siis siirtoäänivaalien hyödyt verrattuna nykyiseen? Nämä
        tietenkin on hiukan kirjoittajan subjektiivisia näkemyksiä, mutta tässä
        muutamia:{' '}
      </Text>
      <Text>
        1. Järjestelmä kannustaa äänestäjiä äänestämään omien mieltymystensä
        mukaan, eikä taktikoimaan ääntään. Taktinen äänestäminen on varmasti
        jokaiselle tuttu konsepti viimeaikaisten vaalien johdosta, ja
        siirtoäänivaalitapa vähentää tätä ilmiötä merkittävästi. Oman äänensä
        voi ensisijaisesti antaa mieleisemmälle ehdokkaalle, ja vaikka tämä en
        johtaisikaan valintaan, siirtyy ääni seuraavalle, ja lopulta pienimmälle
        hyväksyttävälle pahalle, mikäli äänestäjä vain täyttää lipukkeen niin
        pitkälle
      </Text>
      <Text>
        2. Järjestelmä poistaa insentiivejä ehdokkaista pyrkimään vetoamaan vain
        suurimpaan yhteiseen nimittäjään, vaan vapauttaa heidät ehkä jopa
        olemaan hiukan radikaalimpia, ja vetoamaan myös pienempiin, kenties
        tällä hetkellä politiikasta vieraantuneisiin äänestäjäryhmiin.
      </Text>
      <Text>
        3. Kun äänestäjiä ei rangaista marginaalisempien ehdokkaiden
        äänestämisestä, saa myös yhteiskunta laajempaa tietoa siitä, minkälaisia
        ajatuksia ja ideologioita väestössä elää. Tämä voi olla hyvinkin
        arvokasta dataa yhteiskunnan ymmärtämisen kannalta, sekä auttaa
        päätöksentekijöitä näkemään että minkälaisille asioille on oikeasti
        kysyntää. Hyvä esimerkki tästä on NATO-jäsenyys, jossa kukaan ei
        halunnut asettautua selkeästi sen puoleastapuhujaksi, sillä kansa ei
        ilamissut haluaan NATOa kohtaan tarpeeksi selkeästi. Muttan kansa ei
        myöskään kyennyt NATOkantaansa ilmaisemaan, sillä tarjolla ei ollut
        ehdokkaita jotka olisivat selkeästi asettautuneet asian taakse.
      </Text>
      <Subheader>Leikkisiirtoäänivaalit 2024</Subheader>
      <Text>
        Tämän artikkelin tarkoituksena on myös toimia kokeena, jossa
        siirtoäänivaaleja kokeillaan käytännössä. Tässä artikkelissa on
        mahdollisuus äänestää omia suosikkiehdokkaitaan, ja nähdä miten
        siirtoäänivaalitapa toimisi käytännössä. Tämä on kuitenkin vain
        leikkivaali, eikä sillä ole mitään vaikutusta oikeisiin vaaleihin.
      </Text>
    </div>
  );
};

export default Page;
