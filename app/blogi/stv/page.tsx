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
    <div>
      <Header>Siirtoäänivaali</Header>
      <Text>
        Presidentinvaalien ennakkoäänestys on alkamassa, ja ehdokkaiden ollessa
        99-prosenttisesti samaa mieltä kaikesta, ei luvassa ole
        reaalipoliittisesti mitään järkyttävän suurta jännitysnäytelmää. Tästä
        syystä tilaisuus onkin mitä parhain keskustella jokaisien vaalien
        kaikista kiinostavimmasta asiasta, eli vaalimetasta.
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
      <div className="mx-auto  rounded-lg  p-6 shadow">
        <Subheader>Esimerkkivaalit</Subheader>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* BallotBox taking full width on small screens and 1/3 on medium screens and above */}
          <div className="md:col-span-1">
            <BallotBox
              votes={allVotes}
              setVotes={setAllVotes}
              candidates={candidates}
            />
          </div>
          {/* Text content taking full width on small screens and 2/3 on medium screens and above */}
          <div className="space-y-4 md:col-span-2">
            <Text>
              Siirtoäänivaalitapa toimii siten, että ensisijaisesti äänet
              annetaan äänilipukkeen ensimmäiselle nimelle, ja lasketaan
              vaalitulos näin. Mikäli yksikään ehdokkaista ei saavuta
              enemmistöä, poistetaan vähiten ääniä saanut ehdokas, ja hänen
              äänensä siirretään äänestäjien toisen valinnan mukaisesti. Tätä
              prosessia jatketaan kunnes joku ehdokas saavuttaa enemmistön.
            </Text>

            <Text>
              Ohessa on esimerkkiäänilipas jossa on jo 50 esimerkkiääntä.
              Alapuolella on laskettu äänten siirtoäänivaalitulokset
              kierroksittain. Nykyisellä äänijakaumalla Väykkä voittaa vaalit
              toisella kierroksella, mutta lisäämällä ääniä lippaaseen voit
              muuta tulosta.
            </Text>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row">
          <ResultGraph votes={votesWithColor} candidates={candidates} />
        </div>
      </div>
      <Text>
        Useat suomalaiset yhdistysaktiivit ovat varmasti tutustuneet tähän
        järjestelmään, ja se on mahdollista soveltaa myös useamman kuin yhden
        henkilön valitseviin vaaleihin.
      </Text>
      <Text>
        Mitkä ovat siis siirtoäänivaalien hyödyt verrattuna nykyiseen?
        Ensinnäkin se kannustaa äänestäjiä äänestämään omien mieltymystensä
        mukaan, eikä taktikoimaan ääntään. Tämän myötä ehdokkailla on parempi
        mahdollisuus erottautua toisistaan, sen sijaan että pyrkivät olemaan
        pelkästään vähiten huono vaihtoehto.
      </Text>
      <Subheader>Siirtoäänivaali presidentinvaalissa</Subheader>
    </div>
  );
};

export default Page;
