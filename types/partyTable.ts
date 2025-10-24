type SiteInfo = {
  id: number;
  partyDesc: string | null;
  partyDescSv: string | null;
  registered: string;
  language: string;
  dualLanguage: boolean;
  address: string;
  addressAlt: string;
  postcode: string;
  postcodeAlt: string;
  city: string;
  cityAlt: string;
  url: string;
  urlAlt: string | null;
  email: string;
  emailAlt: string | null;
  phoneNumber: string;
};

export type Party = {
  id: number;
  name: string;
  siteInfo: SiteInfo;
};
