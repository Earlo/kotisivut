'use client';

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

const PartiesPage = () => {
  const [parties, setParties] = useState<Party[]>([]);
  const [error, setError] = useState<string | null>(null);

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
    const emails = parties.map((party) => party.siteInfo.email).join(', ');
    navigator.clipboard.writeText(emails);
    alert('Emails copied to clipboard');
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Registered Parties</h1>
      <button
        onClick={copyEmails}
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
      >
        Copy All Emails
      </button>
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
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Website
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
