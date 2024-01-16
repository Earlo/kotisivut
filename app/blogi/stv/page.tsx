import { defaultVotes } from './votes';
import BallotBox from '@/components/stv/BallotBox';

const Page = () => {
  return (
    <div>
      <h1>Siirtoäänivaali</h1>
      <p>
        Presidentinvaalien ennakkoäänestys on alkamassa, ja ehdokkaiden ollessa
        99-prosenttisesti samaa mieltä kaikesta, ei luvassa ole
        reaalipoliittisesti mitään järkyttävän suurta jännitysnäytelmää. Tästä
        syystä tilaisuus onkin mitä parhain keskustella jokaisien vaalien
        kaikista kiinostavimmasta asiasta, eli vaalimetasta.
      </p>
      <p>
        Suomen nykyinen kaksikierroksinen presidentinvaalikäytäntö leinee
        kaikille tuttu. Jokainen äänioikeutettu voi äänestää yhtä ehdokasta, ja
        jos kukaan ehdokkaista ei saa yli 50% äänistä, järjestetään toinen
        kierros kahden eniten ääniä saaneen ehdokkaan välillä.
      </p>
      <p>
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
      </p>
      <p>
        Mitä asialle voisi tehdä? Itse haluaisin ehdottaa ratkaisuksi
        siirtoäänivaaleja
      </p>
      <h2>Siirtoäänivaali</h2>
      <p>
        Yksinkertaisesti siirtoäänivaalissa äänestäjät asettavat ehdokkaat
        järjestykseen mieltymystensä mukaan. Jos kukaan ehdokas ei saa heti
        enemmistöä äänistä, vähiten ääniä saanut ehdokas poistetaan, ja hänen
        äänensä siirretään äänestäjien toisen valinnan mukaisesti. Tätä
        prosessia jatketaan kunnes joku ehdokas saavuttaa enemmistön. Tämä
        järjestelmä tunnetaan Single Transferable Vote -järjesteämänä (STV)
        elikkäs SiirToääniVaaleina.
      </p>
      <h2>Esimerkkivaalit</h2>
      <div className="flex">
        <BallotBox votes={defaultVotes} />
        <p>ohessa on esimerkkiäänilipas</p>
      </div>
      <p>
        Useat suomalaiset yhdistysaktiivit ovat varmasti tutustuneet tähän
        järjestelmään, ja se on mahdollista soveltaa myös useamman kuin yhden
        henkilön valitseviin vaaleihin.
      </p>
      <h2>Siirtoäänivaali presidentinvaalissa</h2>
    </div>
  );
};

export default Page;
