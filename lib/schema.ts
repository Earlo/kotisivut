import type { Person, WebSite, WithContext } from 'schema-dts';

export const personId = 'https://visapollari.fi/#visa-pollari';

export const personJsonLd = {
  '@type': 'Person',
  '@id': personId,
  name: 'Visa Pollari',
  jobTitle: 'Ohjelmistokonsultti',
  address: { '@type': 'PostalAddress', addressLocality: 'Espoo', addressCountry: 'FI' },
  url: 'https://visapollari.fi',
  image: 'https://visapollari.fi/vaalikuva_rect.jpg',
  sameAs: [
    'https://t.me/visapollari',
    'https://x.com/VisaPollari',
    'https://www.linkedin.com/in/visapollari',
    'https://github.com/Earlo',
    'https://bsky.app/profile/visapollari.bsky.social',
    'https://www.threads.net/@visapollari',
    'https://suomi.social/@visapollari',
  ],
} satisfies Person;

export const articleAuthorJsonLd = {
  '@type': 'Person',
  '@id': personId,
  name: 'Visa Pollari',
  url: 'https://visapollari.fi',
} satisfies Person;

export const websiteJsonLd: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://visapollari.fi/#website',
  name: 'Visa Pollari',
  url: 'https://visapollari.fi/',
  inLanguage: 'fi',
  publisher: { '@id': personId },
};
