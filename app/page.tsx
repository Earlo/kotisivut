import ActivityCard, { type ActivityCardProps } from '@/components/ActivityCard';
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

const phone = '+358456350724';
const calUrl = 'https://cal.com/visap/30min';

const activities: ActivityCardProps[] = [
  {
    title: 'Konsultointi',
    description:
      'Teen ohjelmistokonsultointia ja rakennan digitaalisia palveluita. Tällä hetkellä uusille projekteille ei lähtökohtaisesti ole kaistaa, mutta keskustelen mielelläni. Ensimmäinen annos on ilmainen.',
    logo: {
      src: '/OpenSauce.svg',
      alt: 'OpenSauce',
      width: 105,
      height: 384,
      className: 'h-12 w-auto',
      containerClassName: 'rounded-xl bg-orange-50',
    },
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/visapollari', external: true },
      { label: 'Varaa tapaaminen', href: calUrl, external: true },
    ],
    linksLabel: 'Koodiin liittyvät linkit',
    linkHoverClassName: 'hover:text-blue-700',
  },
  {
    title: 'Politiikka',
    description:
      'Olen mukana rakentamassa suomeen todellista Liberaalia vaihtoehtoa puoluekentälle. Osallistun yhteiskunnalliseen keskusteluun huutamalla mielipiteitäni internetin tyhjyyteen. Tsekkaa alapuolella oleva Telegram-feedi nähdäksesi horinoitani.',
    logo: {
      src: '/libLogo.png',
      alt: 'Liberaalipuolue',
      width: 462,
      height: 462,
      className: 'h-16 w-16 rounded-xl',
    },
    links: [
      {
        label: 'Liberaalipuolue',
        href: 'https://liberaalipuolue.fi/piirijarjestot/uusimaa/',
        external: true,
      },
      { label: 'Kirjoitukset ja työkalut', href: '/blogi' },
      { label: 'Varaa tapaaminen', href: calUrl, external: true },
    ],
    linksLabel: 'Politiikkaan liittyvät linkit',
    linkHoverClassName: 'hover:text-violet-700',
  },
  {
    title: 'Kattilalaakson Tislaamo',
    description:
      'Olen mukana rakentamassa espoolaista tislaamoa. Ensisijaisia tavoitteitamme on laatu, raaka-aineiden kotimaisuus, ja uteliaisuus.',
    logo: {
      src: '/kattila_logo_dark.svg',
      alt: 'Kattilalaakson Tislaamo',
      width: 123,
      height: 139,
      className: 'h-16 w-auto',
    },
    links: [{ label: 'Kattilalaakson Tislaamo', href: 'https://www.kattilalaakso.fi/', external: true }],
    linksLabel: 'Kattilalaakson Tislaamon linkit',
    linkHoverClassName: 'hover:text-amber-800',
  },
];

export default function Page() {
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
      <section aria-labelledby="what-i-do-heading" className="w-full bg-gray-50 px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8 max-w-2xl">
            <h2 id="what-i-do-heading" className="text-3xl font-bold tracking-tight">
              Mitä teen?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {activities.map((activity) => (
              <ActivityCard key={activity.title} {...activity} />
            ))}
          </div>
        </div>
      </section>
      <Telegram />
    </>
  );
}
