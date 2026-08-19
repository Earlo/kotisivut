type SiteInfo = {
  id: number;
  partyDesc: string | null;
  partyDescSv: string | null;
  registered: string;
  language: string;
  dualLanguage: boolean;
  address: string;
  addressAlt: string | null;
  postcode: string;
  postcodeAlt: string | null;
  city: string;
  cityAlt: string | null;
  url: string | null;
  urlAlt: string | null;
  email: string;
  emailAlt: string | null;
  phoneNumber: string | null;
};

export type Party = {
  id: number;
  name: string;
  siteInfo: SiteInfo;
};
