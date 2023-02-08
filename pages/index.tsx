import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

//bg-[#fbbb00]
const Header = () => {
  return (
    <section className="flex flex-row w-full py-10 h-32 bg-gray-100 ">
      <div className=" w-1/2 items-start">
        <h1 className="text-3xl ml-10 font-bold ">Visa Pollari</h1>
        <h3 className="text-xl ml-10 font-bold ">Ehdolla uudellamaalla</h3>
      </div>
      <div className="hidden md:flex w-1/2 mr-10 justify-end ">
        <Image
          src="/lib-logo-1-fin-white.png"
          width={500 / 3}
          height={150 / 3}
          alt="logo"
        />
      </div>
      <div className="flex md:hidden w-1/2 justify-end ">
        <Image src="/favicon.ico" width={150 / 3} height={150 / 3} alt="logo" />
      </div>
    </section>
  )
}

const Home = () => {
  const [tgPosts, setTgPosts] = useState<Element[]>([])
  useEffect(() => {
    fetch('https://t.me/s/visapollari')
      .then((res) => res.text())
      .then((data) => {
        const parser = new DOMParser()
        const virtualDoc = parser.parseFromString(data, 'text/html')
        const results = Array.from(
          virtualDoc.getElementsByClassName('js-widget_message'),
        )
        results.shift()
        results.forEach((result) => {
          console.log('result', result)
        })
        setTgPosts(results)
      })
  }, [])
  return (
    <main className="flex text-black flex-col items-center bg-white  ">
      <Header />
      <section className="flex flex-col items-center w-full p-0 md:p-10">
        <h2 className="text-2xl font-bold">Miksi olen ehdolla</h2>
        <div className="flex flex-col md:flex-row items-center w-full p-4 md:p-10">
          <Image
            src="/visa-pollari.jpg"
            className="w-48 h-48 rounded-full m-5"
            width={192}
            height={192}
            alt="Visa Pollari"
          />
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
      <section className="flex flex-col items-center w-full p-4 md:p-10">
        <h2 className="text-2xl font-bold">Tavoitteeni politiikassa</h2>
        <ul className="list-disc pl-5">
          <div className="text-lg mb-3">
            <p>
              <b>
                1. Puolueen vaalikanpanjan mukaisesi:{' '}
                <Link
                  href="https://liberaalipuolue.fi/leikattavaaloytyy"
                  className="text-blue-800"
                >
                  #Leikattavaalöytyy
                </Link>
              </b>
              <br />
              Vaikka en uskokaan että vuoden 2024 budjetti tulee vastaamaan
              tavoiteohjelmaamme, tai allekirjoita aivan jokaista
              leikkauskohdetta, on se kuitenkin hyvä rima asettaa. <br />
              Euromäärien sijaan omasta mielestäni leikkauslistan pointti on
              käydä keskustelua siitä, mitkä valtion tehtävät ovat oikeasti
              välttämättömiä jotta yhteiskunta sen ympärillä voi toimia
            </p>
          </div>
          <div className="text-lg mb-3">
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
          <div className="text-lg mb-3">
            <p>
              <b>3. Yhteiskunnan rakenne ja poliittinen järjestelmä</b>
            </p>
            Nykyinen poliittinen järjestelmä edistää vallan keskittymistä
            puolueille. Suomen tulisi poistaa vaalipiirit ja siirtyä
            siirtoäänijärjestelmään. Eduskunta-, Alue-, sekä kuntavaalit
            voitaisiin yhdistää yksiksi vaaleiksi, jolloin tilanteet jossa
            politiikko päätyy useaan pestiin samanaikaisesti olisi
            harvinaisempaa. Yhdistetyt vaalit antaisivat myös politiikoille
            mahdollisuuden keskittyä hallinnollisiin tehtäviin, vaalityön
            sijasta. <br />
            Puoluetukea tulisi vähentää, ja kansanedustajien sopeutumisrahan
            kaltaiset välineitä jotka kannustavat ammattipoliitkon uraan tulisi
            poistaa. Valtion rahoitus 3. sektorin järjestöille, ajatuspajoille,
            tai muille ulkoisille organisaatiolle tulisi lopettaa.
          </div>
        </ul>
      </section>
      {/** section with two columns, one for telegram one for twitter */}
      <section className="flex flex-row items-center justify-around w-full p-0 md:p-10">
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <div className="text-lg mb-3">
            <p>
              <b>
                Liity kanavalleni telegramissa:{' '}
                <Link href="https://t.me/visapollari" className="text-blue-800">
                  @VisaPollari
                </Link>
              </b>
            </p>
          </div>
          {tgPosts.map((post) => (
            <div
              className="w-full py-10 px-10"
              key={post.innerHTML}
              dangerouslySetInnerHTML={{ __html: post.innerHTML }}
            />
          ))}
        </div>
      </section>
      {/** footer */}
      <footer className="grid items-center justify-around w-full py-10 bg-black">
        <a href="https://twitter.com/VisaPollari">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-10 h-10"
          >
            <path
              fill="white"
              d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
            />
          </svg>
        </a>
        <div className="text-lg mb-3"></div>
      </footer>
    </main>
  )
}

export default Home
