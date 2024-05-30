'use client';

import useClipboard from '@/hooks/useClipboard';
import { cn } from '@/lib/helpers';
import Text from '@/components/Text';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/20/solid';

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

type Party = {
  id: number;
  name: string;
  siteInfo: SiteInfo;
};

const fetchParties = async (): Promise<Party[]> => {
  const response = await fetch('/api/parties');
  if (!response.ok) {
    throw new Error('Failed to fetch parties');
  }
  return response.json();
};

const PartiesPage = () => {
  const [parties, setParties] = useState<Party[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { copiedData, onCopy } = useClipboard();
  const partyString = parties.map((party) => party.siteInfo.email).join(', ');
  const partiesClipped = copiedData && copiedData === partyString;

  useEffect(() => {
    const getParties = async () => {
      try {
        const data = await fetchParties();
        setParties(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    getParties();
  }, []);

  const copyEmails = () => {
    if (!partiesClipped) {
      onCopy(partyString);
    }
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  return (
    <div className="container mx-auto bg-black px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Rekisteröityneet puolueet</h1>
      <Text>
        Eurovaalien alla olen huomannut erään selkeästi suomalaista
        kansalaisyhteiskuntaa piinaavan vaivan: poliittisten puolueiden
        tavoittaminen tuntuu olevan suunnattoman vaikeaa. On täysin
        ymmärrettävää, että kansalaisyhteiskunnan resurssit ovat rajalliset, ja
        kuten tiedämme, mikäli kommunikaatio voi epäonnistua, se myös
        epäonnistuu.
      </Text>
      <Text>
        Mietin, mistä asia johtuu, ja tässä muutama päivä sitten, samalla kun
        kävin napsauttamassa 25.5. Hamppupuolueelle kannattajakorttini, tajusin
        sen. Puoluerekisteri.fi ei tarjoa yksinkertaista tapaa napata kaikkien
        puolueiden yhteystietoja. Eli siis vuosien ajan yhteiskunta on kärsinyt
        tästä saavutettavuusesteestä!
      </Text>
      <Text>
        Mielestäni julkisten palveluiden, kuten puoluerekisteri.fi:n, tulisi
        olla avointa lähdekoodia. Tällöin kuka tahansa voisi kehittää palvelua
        eteenpäin ja esimerkiksi lisätä sivustolle listan kaikkien puolueiden
        yhteystiedoista.
      </Text>
      <Text>
        Pahimpaan hätään olen kuitenkin tehnyt tämän sivun, josta löydät
        kaikkien rekisteröityneiden puolueiden yhteystiedot. Voit joko kopioida
        koko taulukon omaan käyttöösi tai klikata kätevää namiskaa, joka kopioi
        kaikkien puolueiden sähköpostit leikepöydällesi.
      </Text>
      <Text>T. Visa Pollari</Text>
      <div className="mb-4 flex items-center">
        <button
          onClick={copyEmails}
          className={cn(
            'mr-2 flex flex-row rounded bg-blue-500 px-4 py-2 text-white ',
            {
              'cursor-not-allowed ': partiesClipped,
              'hover:bg-blue-700': !partiesClipped,
            },
          )}
        >
          {partiesClipped
            ? 'Puolueiden sähköpostit ovat nyt leikepöydällesi!'
            : 'Kopioi kaikkien puolueiden sähköpostit leikepöydällesi'}
          {partiesClipped ? (
            <ClipboardDocumentCheckIcon className="ml-2 h-6 w-6 text-green-500" />
          ) : (
            <ClipboardIcon className="ml-2 h-6 w-6 text-gray-500" />
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Logo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Nimi
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Sähköposti
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Puhelin
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Osoite
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Web
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {parties.map((party) => (
              <tr key={party.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  {party.siteInfo ? (
                    <Image
                      src={`https://puoluerekisteri.fi/publicapi/attachment/${party.id}/0/logo.png`}
                      alt={`${party.name} logo`}
                      width={64}
                      height={64}
                      className="h-16 w-16 object-contain"
                    />
                  ) : (
                    <span>No Logo</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <div>{party.name}</div>
                  <div className="text-sm text-gray-500">
                    {party.siteInfo.email}
                  </div>
                  <div className="text-sm text-gray-500">
                    {party.siteInfo.phoneNumber}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {party.siteInfo.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {party.siteInfo.phoneNumber}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {party.siteInfo.address}, {party.siteInfo.postcode},{' '}
                  {party.siteInfo.city}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-blue-600">
                  {party.siteInfo.url ? (
                    <a
                      href={`http://${party.siteInfo.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {party.siteInfo.url}
                    </a>
                  ) : (
                    'No Website'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartiesPage;
