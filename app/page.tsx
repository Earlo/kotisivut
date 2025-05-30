import { Telegram } from '@/components/telegram';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  return (
    <main className="flex flex-col items-center bg-white text-black">
      <section className="flex w-full flex-col items-center p-0 md:p-4 xl:p-10">
        <Image
          src="/vaalikuva_rect.jpg"
          className="m-5 block h-48 w-48 rounded-full md:hidden"
          width={192}
          height={192}
          alt="Visa Pollari"
        />
        <h2 className="text-2xl font-bold">Kuka olen?</h2>
        <div className="flex w-full flex-col items-center p-4 md:flex-row md:p-10">
          <Image
            src="/vaalikuva_rect.jpg"
            className="m-5 hidden h-48 w-48 rounded-full md:block"
            width={192}
            height={192}
            alt="Visa Pollari"
          />
          <p className="text-lg">
            Visa Pollari, ohjelmistokonsultti Espoosta.
            <br />
            Haluatko tutustua minuun paremmin? Varaa aika oheisesta linkistä.
            Mennään vaikka kahville.{' '}
            <Link href="https://cal.com/visap/30min" className="text-blue-500">
              Varaa aika
            </Link>{' '}
            tai soita minulle +358456350724
          </p>
        </div>
      </section>
      <Telegram />
    </main>
  );
};

export default Home;
