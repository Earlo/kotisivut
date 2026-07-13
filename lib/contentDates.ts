export type ContentDates = {
  published: string;
  modified: string;
};

// Dates come from the commits that introduced each page and last materially
// changed its editorial content or interactive tool. Formatting and SEO-only
// commits are intentionally excluded.
export const contentDates = {
  home: {
    published: '2023-02-08T13:28:12+02:00',
    modified: '2025-10-11T21:20:02+03:00',
  },
  blog: {
    published: '2024-05-30T16:57:04+03:00',
    modified: '2024-06-01T22:22:56+03:00',
  },
  eurovaalit: {
    published: '2024-06-09T13:09:28+03:00',
    modified: '2024-06-09T13:09:28+03:00',
  },
  eurovaalitResults: {
    published: '2024-06-09T17:32:01+03:00',
    modified: '2024-06-09T17:32:01+03:00',
  },
  puolueet: {
    published: '2024-05-30T13:21:39+03:00',
    modified: '2024-07-16T16:27:17+03:00',
  },
  stv: {
    published: '2024-01-16T15:44:22+02:00',
    modified: '2024-01-22T14:38:20+02:00',
  },
  lakot: {
    published: '2024-02-02T19:44:51+02:00',
    modified: '2024-02-19T01:21:43+02:00',
  },
  tuotantofutuuri: {
    published: '2024-07-16T15:09:14+03:00',
    modified: '2024-07-16T15:36:55+03:00',
  },
  budjettipeli: {
    published: '2024-04-12T15:56:39+03:00',
    modified: '2026-07-08T21:06:00+03:00',
  },
  ekvaalit2023: {
    published: '2023-02-08T13:28:12+02:00',
    modified: '2023-03-05T02:21:36+02:00',
  },
} satisfies Record<string, ContentDates>;
