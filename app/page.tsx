import { Telegram } from '@/components/telegram';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <section className="flex h-32 w-full items-center justify-between bg-gray-100">
      <div className="w-3/4 items-start">
        <h1 className="ml-4 text-3xl font-bold md:ml-10 ">Visa Pollari</h1>
        <h3 className="ml-4 text-xl font-bold md:ml-10 ">
          Tärkeintä on osallistuminen :)
        </h3>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <main className="flex flex-col items-center bg-white text-black  ">
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
            Visa Pollari, ohjelmistokehittäjä, yrittäjä, ja teekkari Espoosta.
            <br />
            Upeat projektit ja hankkeeet joita olen nähnyt ihmisten ympärilläni
            tekevän ja joita olen päässyt itse tekemään, on luonut uskoa siihen,
            että ihmisillä voi todella olla omistajuus heitä ympäröivästä
            maailmasta,
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
      <Telegram />
    </main>
  );
};

export default Home;
