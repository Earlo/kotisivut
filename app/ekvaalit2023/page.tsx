'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  return (
    <section className="flex h-32 w-full items-center justify-between bg-gray-100">
      <div className="w-3/4 items-start">
        <h1 className="ml-4 text-3xl font-bold md:ml-10">Visa Pollari</h1>
        <h3 className="ml-4 text-xl font-bold md:ml-10">
          Ehdolla Uudellamaalla
        </h3>
      </div>
      <Image
        className="mr-4 hidden h-3/4 w-auto md:flex"
        src="/lib-logo-1-fin.png"
        width={500}
        height={150}
        alt="logo"
      />
      <Image
        className="mr-4 flex h-3/5 w-auto md:hidden"
        src="/libLogo.png"
        width={256}
        height={256}
        alt="logo"
      />
    </section>
  );
};

const Home = () => {
  const [tgPosts, setTgPosts] = useState<string[]>([]);
  useEffect(() => {
    fetch('/api/telegram')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTgPosts(data);
      });
  }, []);
  return (
    <main className="flex flex-col items-center bg-white text-black">
      <Header />
      <section className="flex w-full flex-col items-center p-0 md:p-10">
        <Image
          // show when mobile
          src="/ehdolla.jpg"
          className="m-5 block h-48 w-48 rounded-full md:hidden"
          width={192}
          height={192}
          alt="Visa Pollari"
        />
        <h2 className="text-2xl font-bold">Kuka olen?</h2>
        <div className="flex w-full flex-col items-center p-4 md:flex-row md:p-10">
          <Image
            // hide when mobile
            src="/ehdolla.jpg"
            className="m-5 hidden h-48 w-48 rounded-full md:block"
            width={192}
            height={192}
            alt="Visa Pollari"
          />
          <p className="text-lg">
            Visa Pollari, ohjelmistokehittäjä, yhdistysaktiivi, ja teekkari
            Espoosta.
            <br />
            Opiskelen töitteni ohella tietototekniikkaa Aalto-yliopistossa, ja
            toiminut laajasti yliopistoa ympäröivässä yhdistys- ja
            yhteisökentässä. Tämä on tietyllä tavalla ollut myös
            yhteiskunnallisen heräämiseni kipinä. Upeat projektit ja hankkeeet
            joita olen nähnyt ihmisten ympärilläni tekevän ja joita olen päässyt
            itse tekemään, on luonut uskoa siihen, että ihmisillä voi todella
            olla omistajuus heitä ympäröivästä maailmasta,
            <br />
            Vapaa-aikani kuluu suurelta osin erinäisten projektiluontoisten
            harrastusten parissa, tapahtumia järjestäen, ohjelmoiden, tai
            milloin mitäkin. Nautin suuresti filosofisista keskusteluista, sekä
            leipomisesta. Lenkkeilen säännöllisen epäsäännöllisesti.
            <br />
            Haluatko tutustua minuun paremmin? Varaa aika oheisesta linkistä.
            Mennään vaikka kahville.{' '}
            <Link href="https://cal.com/visap/30min" className="text-blue-500">
              Varaa aika
            </Link>
          </p>
        </div>
      </section>
      <section className="flex w-full flex-col items-center p-0 md:p-10">
        <h2 className="text-2xl font-bold">Miksi olen ehdolla?</h2>
        <div className="flex w-full flex-col items-center p-4 md:flex-row md:p-10">
          <p className="text-lg">
            Olen aktiivisesti seurannut suomen politiikkaa viimeiset 10 vuotta
            ja olen tietyillä tasoilla turhautunut siihen kuinka politiikkaa
            tehdään, ja erityisesti kuinka yhteiskunnallista keskustelua
            käydään.
            <br />
            Vaikka en olekaan täysin samaa mieltä kaikista Liberaalipuolueen
            puolueohjelman tai vaihtoehtobudjetin kohdista, niin itselleni se on
            vaikuttanut ensimmäiseltä kokonaisvaltaiselta visiolta siitä, mikä
            valtion rooli on yhteiskunnassa. Valtapuolueet eivät ole kyenneet
            samalla tavalla tarjoamaan visiota siitä mikä on valtion rooli
            yhteiskunnassa, vaan monelta osin ottavat nykytilanteen jonain
            ennalta-annettuna totuutena, ja pyrkivät hiomaan sitä haluamaansa
            muotoon.
            <br />
            <i>
              Muiden puolueiden etsiessä siis lokaalia maksimia, koen että
              Liberaalipuolueen tähtäimessä globaali maksimi.
            </i>
          </p>
        </div>
      </section>

      <section className="flex w-full flex-col items-center p-4 md:p-10">
        <h2 className="text-2xl font-bold">Tavoitteeni politiikassa</h2>
        <ul className="list-disc pl-5">
          <div className="mb-3 text-lg">
            <p>
              <b>
                1. Puolueen vaalikampanjan mukaisesi:{' '}
                <Link
                  href="https://liberaalipuolue.fi/leikattavaaloytyy"
                  className="text-blue-800"
                >
                  #Leikattavaalöytyy
                </Link>
              </b>
              <br />
              Vaikka en uskokaan että vuoden 2024 budjetti tulee vastaamaan
              liberaalipuolueen varjobudjettia, tai allekirjoita aivan jokaista
              leikkauskohdetta, on se kuitenkin hyvä rima asettaa. <br />
              Euromäärien sijaan omasta mielestäni leikkauslistan pointti on
              käydä keskustelua siitä, mitkä valtion tehtävät ovat oikeasti
              välttämättömiä jotta yhteiskunta sen ympärillä voi toimia
            </p>
          </div>
          <div className="mb-3 text-lg">
            <p>
              <b>
                2. Sääntelyn keventäminen ja lainsäädännön yksinkertaistaminen
              </b>
            </p>
            Valtio on liian suuri ja liian monipuolinen toimija, ja se
            näännyttää itse itseään laajenemalla liian usealle sektorille. Lista
            asioista joita tulisi laillistaa tai valvoa vähemmän on mittava.
            Joukkorahoitus, alkoholin anniskelu, dyykkaaminen, kannabis,
            jumalanpilkka, sähköpyörät, juridinen sukupuoli, ja niin edelleen
            ovat kaikki asioita joiden syynäämiseen valtion tulisi käyttää
            huomattavasti vähemmän resursseja.
          </div>
          <div className="mb-3 text-lg">
            <p>
              <b>3. Yhteiskunnan rakenne ja poliittinen järjestelmä</b>
            </p>
            Nykyinen poliittinen järjestelmä edistää vallan keskittymistä
            puolueille. Suomen tulisi poistaa vaalipiirit ja siirtyä
            siirtoäänijärjestelmään. Eduskunta-, Alue-, sekä kuntavaalit
            voitaisiin yhdistää yksiksi vaaleiksi, jolloin tilanteet jossa
            poliitikko päätyy useaan pestiin samanaikaisesti olisi
            harvinaisempaa. Yhdistetyt vaalit antaisivat myös poliitikoille
            mahdollisuuden keskittyä hallinnollisiin tehtäviin, vaalityön
            sijasta. <br />
            Puoluetukea tulisi vähentää, ja kansanedustajien sopeutumisrahan
            kaltaiset välineitä jotka kannustavat ammattipoliitikon uraan tulisi
            poistaa. Valtion rahoitus 3. sektorin järjestöille, ajatuspajoille,
            tai muille ulkoisille organisaatiolle tulisi lopettaa.
          </div>
        </ul>
      </section>
      {/** section with two columns, one for telegram one for twitter */}
      <section className="flex w-full flex-row items-center justify-around p-0 md:p-10">
        <div className="flex w-full flex-col items-center justify-center md:w-1/2">
          <p className="mb-3 text-lg">
            <b>
              Telegram:{' '}
              <Link href="https://t.me/visapollari" className="text-blue-800">
                @VisaPollari
              </Link>
            </b>
          </p>
          {tgPosts.map((post) => (
            <div
              className="w-full px-10 py-1"
              key={post}
              dangerouslySetInnerHTML={{ __html: post }}
            />
          ))}
        </div>
      </section>
      {/** footer */}
      <footer className="mt-4 grid w-full items-center justify-around bg-black py-10">
        <a href="https://twitter.com/VisaPollari">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-10 w-10"
          >
            <path
              fill="white"
              d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
            />
          </svg>
        </a>
        <div className="mb-3 text-lg"></div>
      </footer>
    </main>
  );
};

export default Home;
