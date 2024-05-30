'use client';

import CopyButton from '@/components/puolueet/CopyButton';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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
    </>
  );
};

export default PartyTable;
