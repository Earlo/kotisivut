import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from 'react-twitter-embed'
//bg-[#fbbb00]
const Header = () => {
  return (
    <section className="flex flex-row w-full py-10 h-32 bg-gray-100 ">
      <div className=" w-1/2 items-start">
        <h1 className="text-3xl ml-10 font-bold ">Visa Pollari</h1>
      </div>
      <div className="w-1/2 flex mr-10 flex-row justify-end ">
        <div>
          <Image
            src="/lib-logo-1-fin-white.png"
            width={500 / 3}
            height={150 / 3}
            alt="logo"
          />
        </div>
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
  /*
  useEffect(() => {
    async function fetchData() {
      const result = await axios('https://t.me/s/visapollari')
      console.log('result', result)
    }
    fetchData()
  })

  */
  return (
    <main className="flex text-black flex-col items-center bg-white  ">
      <Header />
      {/**
      <Image
        src="/visa-pollari.jpg"
        className="w-32 h-32 rounded-full m-5"
        width={88}
        height={88}
        alt="Visa Pollari"
      />
 */}
      <section className="flex flex-col items-center w-full p-10">
        <h2 className="text-2xl font-bold">Miksi olen ehdolla</h2>
        <p className="text-lg">
          Olen aktiivisesti seurannut suomen politiikkaa viimeiset 10 vuotta ja
          olen tietyillä tasoilla turhautunut siihen kuinka politiikkaa tehdään,
          ja erityisesti kuinka yhteiskunnallista keskustelua käydään.
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
      </section>
      <section className="flex flex-col items-center w-full py-10 px-10">
        <h2 className="text-2xl font-bold">Tavoitteeni politiikassa</h2>
        <ul className="list-disc pl-5">
          <div className="text-lg mb-3">
            <p>
              <b>
                Puolueen vaalikanpanjan mukaisesi:{' '}
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
              <b>Sääntelyn keventäminen ja lainsäädännön yksinkertaistaminen</b>
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
              <b>Yhteiskunnan rakenne ja poliittinen järjestelmä</b>
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
      <section className="flex flex-row items-center justify-around w-full py-10 px-10">
        <div className="flex flex-col items-center justify-center w-1/2">
          {tgPosts.map((post) => (
            <div
              className="w-full py-10 px-10"
              key={post.attributes['data-post'].nodevalue}
              dangerouslySetInnerHTML={{ __html: post.innerHTML }}
            />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center w-1/2">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="VisaPollari"
            options={{ height: 400 }}
          />{' '}
        </div>
      </section>
      {/** footer */}
      <footer className="flex flex-row items-center justify-around w-full py-10 bg-black">
        <a href="https://t.me/visapollari">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
            className="w-10 h-10"
          >
            <path
              fill="white"
              d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"
            />
          </svg>
        </a>
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
