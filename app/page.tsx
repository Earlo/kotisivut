import { Telegram } from '@/components/telegram';

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
      <Telegram />
    </main>
  );
};

export default Home;
