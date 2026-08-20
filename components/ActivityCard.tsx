import { cn } from '@/lib/helpers';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type ActivityCardLink =
  { label: string; href: Route; external?: false } | { label: string; href: string; external: true };

interface ActivityCardLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  containerClassName?: string;
}

export interface ActivityCardProps {
  title: string;
  description: ReactNode;
  logo: ActivityCardLogo;
  links: ActivityCardLink[];
  linksLabel: string;
  linkHoverClassName: string;
}

export default function ActivityCard({
  title,
  description,
  logo,
  links,
  linksLabel,
  linkHoverClassName,
}: ActivityCardProps) {
  const linkClassName = cn('flex items-center justify-between py-3 font-medium transition', linkHoverClassName);

  return (
    <article className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className={cn('mb-5 flex h-16 w-16 items-center justify-center', logo.containerClassName)}>
        <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className={logo.className} />
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-3 grow text-gray-600">{description}</p>
      <ul className="mt-6 divide-y divide-gray-100 border-t border-gray-100" aria-label={linksLabel}>
        {links.map((link) => {
          const content = (
            <>
              {link.label}
              <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
            </>
          );

          return (
            <li key={`${link.label}-${link.href}`}>
              {link.external ? (
                <a href={link.href} className={linkClassName}>
                  {content}
                </a>
              ) : (
                <Link href={link.href} className={linkClassName}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
