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
};

export const articleAuthorJsonLd = {
  '@type': 'Person',
  '@id': personId,
  name: 'Visa Pollari',
  url: 'https://visapollari.fi',
};
