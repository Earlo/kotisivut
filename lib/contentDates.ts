export type ContentDates = {
  published: string;
  modified: string;
};

// Publication dates preserve each page's original publication. Modification
// dates use commits with significant content, structured data, link, or tool
// changes. Formatting, type-only, and dependency updates do not advance them;
// neither do routine refreshes of upstream feeds or directory data.
export const contentDates = {
  home: {
    published: '2023-02-08T13:28:12+02:00',
    modified: '2026-10-03T01:15:35+03:00',
  },
  blog: {
    published: '2024-05-30T16:57:04+03:00',
    modified: '2026-09-13T13:55:40+03:00',
  },
  eurovaalit: {
    published: '2024-06-09T13:09:28+03:00',
    modified: '2026-10-03T01:15:35+03:00',
  },
  eurovaalitResults: {
    published: '2024-06-09T17:32:01+03:00',
    modified: '2026-10-03T01:15:35+03:00',
  },
  puolueet: {
    published: '2024-05-30T13:21:39+03:00',
    modified: '2026-07-13T22:15:24+03:00',
  },
  stv: {
    published: '2024-01-16T15:44:22+02:00',
    modified: '2026-10-03T01:15:35+03:00',
  },
  lakot: {
    published: '2024-02-02T19:44:51+02:00',
    modified: '2026-07-13T22:15:24+03:00',
  },
  tuotantofutuuri: {
    published: '2024-07-16T15:09:14+03:00',
    modified: '2026-07-13T22:15:24+03:00',
  },
  budjettipeli: {
    published: '2024-04-12T15:56:39+03:00',
    modified: '2026-10-03T01:15:35+03:00',
  },
  ekvaalit2023: {
    published: '2023-02-08T13:28:12+02:00',
    modified: '2026-10-03T01:15:35+03:00',
  },
  vaalirahoitus: {
    published: '2026-08-29T15:00:00+03:00',
    modified: '2026-10-01T14:41:15+03:00',
  },
  vaalikonevastaukset: {
    published: '2026-09-13T12:00:00+03:00',
    modified: '2026-10-03T01:15:35+03:00',
  },
} satisfies Record<string, ContentDates>;
