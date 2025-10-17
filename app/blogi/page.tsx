import Text from '@/components/Text';
import Link from 'next/link';

const BlogListing = () => {
  return (
    <div className="container mx-auto flex grow flex-col bg-black px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Blogi</h1>
      <Text>Tässä muutamia kirjoittamiani tekstejä tai muita virtuaalisyhteiskunnallisia kokemuksia:</Text>
      <div className="flex flex-col space-y-2">
        <Link href="/blogi/puolueet" className="text-blue-500 hover:text-blue-700">
          Puolueet
        </Link>
        <Link href="/blogi/stv" className="text-blue-500 hover:text-blue-700">
          STV
        </Link>
        <Link href="/budjettipeli" className="text-blue-500 hover:text-blue-700">
          Budjettipeli
        </Link>
      </div>
    </div>
  );
};

export default BlogListing;
