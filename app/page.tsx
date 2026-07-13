import { Telegram } from '@/components/telegram';
import { personJsonLd } from '@/lib/schema';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'Visa Pollari' },
  description: 'Ohjelmistokonsultti ja kunnallispoliitikko Espoosta. Varaa aika kahville tai soita.',
  alternates: { canonical: '/' },
};

export const revalidate = 300;

export default function Page() {
  const phone = '+358456350724';
  const calUrl = 'https://cal.com/visap/30min';

  const personSchema = {
    '@context': 'https://schema.org',
    ...personJsonLd,
    telephone: phone,
  };

  return (
    <>
      <script
        id="person-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <section className="flex w-full flex-col items-center p-0 md:p-4 xl:p-10">
        <Image
          src="/vaalikuva_rect.jpg"
          className="m-5 block h-48 w-48 rounded-full md:hidden"
          width={192}
          height={192}
          alt="Visa Pollari"
          priority
        />
        <h1 className="text-2xl font-bold">Kuka olen?</h1>
        <div className="flex w-full max-w-5xl flex-col items-center p-4 md:flex-row md:p-10">
          <Image
            src="/vaalikuva_rect.jpg"
            className="m-5 hidden h-48 w-48 rounded-full md:block"
            width={192}
            height={192}
            alt="Visa Pollari"
            priority
          />
          <div className="text-lg">
            <p>Visa Pollari, ohjelmistokonsultti ja yhteiskunnallinen keskustelija.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                href={calUrl}
                className="inline-flex items-center justify-center rounded-md bg-black px-5 py-3 font-medium text-white ring-1 ring-black/10 transition hover:opacity-90"
              >
                Varaa tapaaminen
              </Link>
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 font-medium text-black ring-1 ring-black/10 transition hover:bg-gray-50"
              >
                Soita: {phone}
              </a>
              <a
                href="mailto:visa@visapollari.fi"
                className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 font-medium text-black ring-1 ring-black/10 transition hover:bg-gray-50"
              >
                Sähköposti
              </a>
            </div>
          </div>
        </div>
      </section>
      <Telegram />
    </>
  );
}
