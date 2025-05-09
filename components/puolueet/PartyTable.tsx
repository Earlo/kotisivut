'use client';

import CopyButton from '@/components/puolueet/CopyButton';
import { cn } from '@/lib/helpers';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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

const PartyTable = () => {
  const [parties, setParties] = useState<Party[]>([]);
  const [error, setError] = useState<string | null>(null);
  const partyString = parties.map((party) => party.siteInfo.email).join(', ');

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

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  return (
    <>
      <CopyButton copyTarget={partyString} />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
              >
                Logo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
              >
                Nimi
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
              >
                Sähköposti
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
              >
                Puhelin
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
              >
                Osoite
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
              >
                Web
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white text-sm">
            {parties.map((party) => (
              <tr key={party.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {party.siteInfo ? (
                    <Image
                      src={`https://puoluerekisteri.fi/publicapi/attachment/${party.id}/0/logo.png`}
                      alt={`Ei kuvaa`}
                      width={64}
                      height={64}
                      className="h-16 w-16 object-contain"
                    />
                  ) : (
                    <span>Ei kuvaa</span>
                  )}
                </td>
                <td className="px-6 py-4 font-medium">
                  <div className="text-gray-900">{party.name}</div>
                  <div className="">{party.siteInfo.email}</div>
                  <div className="">{party.siteInfo.phoneNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {party.siteInfo.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {party.siteInfo.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {party.siteInfo.address}, {party.siteInfo.postcode},{' '}
                  {party.siteInfo.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {party.siteInfo.url ? (
                    <a
                      href={
                        party.siteInfo.url.startsWith('http') ||
                        party.siteInfo.url.startsWith('https')
                          ? party.siteInfo.url
                          : `http://${party.siteInfo.url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn('underline', {
                        'text-blue-600 hover:text-blue-900': party.siteInfo.url,
                      })}
                    >
                      {party.siteInfo.url
                        .replace(/(^\w+:|^)\/\//, '')
                        .replace(/\/$/, '')
                        .replace('www.', '')
                        .replace('http://', '')
                        .replace('https://', '')}
                    </a>
                  ) : (
                    'Ei verkkosivua'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PartyTable;
