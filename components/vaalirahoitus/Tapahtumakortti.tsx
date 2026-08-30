import {
  ArrowUpRightIcon,
  BuildingOffice2Icon,
  NewspaperIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Money from './Money';

interface MediaSource {
  nimi: string;
  url: string;
}

interface MediaAttention {
  havaittu: boolean;
  yhteenveto?: string;
  lahteet?: MediaSource[];
}

export interface VaalirahoitusCase {
  nimi: string;
  puolue: string | null;
  vaalit: string;
  rahoittaja: string;
  rahoittajan_tyyppi: string;
  tuki_euroa: number;
  lakisaateinen_raja_euroa: number;
  ylitys_euroa?: number | null;
  nimellinen_ylitys_euroa?: number;
  alkuperainen_ylitys_euroa?: number;
  rikkeen_taso: string;
  status: string;
  tausta: string;
  kysymys?: string;
  mediahuomio?: MediaAttention;
  lahde: string;
}

interface TapahtumakorttiProps {
  tapaus: VaalirahoitusCase;
}

const partyLogos: Record<string, { id: number; shortName: string }> = {
  'Suomen Sosialidemokraattinen Puolue': { id: 1, shortName: 'SDP' },
  'Suomen Keskusta': { id: 2, shortName: 'Keskusta' },
  'Kansallinen Kokoomus': { id: 3, shortName: 'Kokoomus' },
  Vasemmistoliitto: { id: 7, shortName: 'Vasemmistoliitto' },
};

export const levelStyles = {
  selvä: {
    label: 'Selvä ylitys',
    badge: 'bg-red-400 text-red-950',
    accent: 'bg-red-400',
    text: 'text-red-300',
  },
  selvä_varauksin: {
    label: 'Ylitys varauksin',
    badge: 'bg-orange-300 text-orange-950',
    accent: 'bg-orange-300',
    text: 'text-orange-200',
  },
  epäselvä: {
    label: 'Epäselvä',
    badge: 'bg-amber-300 text-amber-950',
    accent: 'bg-amber-300',
    text: 'text-amber-200',
  },
  avoimuusongelma: {
    label: 'Avoimuusongelma',
    badge: 'bg-violet-300 text-violet-950',
    accent: 'bg-violet-300',
    text: 'text-violet-200',
  },
  korjattu: {
    label: 'Korjattu jälkikäteen',
    badge: 'bg-emerald-300 text-emerald-950',
    accent: 'bg-emerald-300',
    text: 'text-emerald-200',
  },
};

export const getLevelStyle = (level: string) => {
  switch (level) {
    case 'selvä':
      return levelStyles.selvä;
    case 'selvä_varauksin':
      return levelStyles.selvä_varauksin;
    case 'epäselvä':
      return levelStyles.epäselvä;
    case 'avoimuusongelma':
      return levelStyles.avoimuusongelma;
    case 'korjattu':
      return levelStyles.korjattu;
    default:
      return levelStyles.epäselvä;
  }
};

const getOverage = (tapaus: VaalirahoitusCase) => {
  if (typeof tapaus.ylitys_euroa === 'number') return { label: 'Ylitys', value: tapaus.ylitys_euroa };
  if (typeof tapaus.alkuperainen_ylitys_euroa === 'number') {
    return { label: 'Alkup. ylitys', value: tapaus.alkuperainen_ylitys_euroa };
  }
  if (typeof tapaus.nimellinen_ylitys_euroa === 'number') {
    return { label: 'Nimell. ylitys', value: tapaus.nimellinen_ylitys_euroa };
  }
  return null;
};

const Tapahtumakortti = ({ tapaus }: TapahtumakorttiProps) => {
  const level = getLevelStyle(tapaus.rikkeen_taso);
  const overage = getOverage(tapaus);
  const party = tapaus.puolue ? partyLogos[tapaus.puolue] : undefined;

  return (
    <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl bg-[#121214] shadow-2xl shadow-black/35">
      <header className="h-24 shrink-0 px-5 pt-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-[0.65rem] font-bold tracking-[0.16em] text-zinc-400 uppercase">{tapaus.vaalit}</p>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[0.62rem] font-extrabold ${level.badge}`}>
            {level.label}
          </span>
        </div>
        <div className="mt-3 flex min-w-0 items-center justify-between gap-2.5">
          <h3 className="truncate text-2xl leading-none font-black tracking-tight text-white" title={tapaus.nimi}>
            {tapaus.nimi}
          </h3>
          {party && tapaus.puolue && (
            <Image
              src={`https://puoluerekisteri.fi/publicapi/attachment/${party.id}/0/logo.png`}
              alt={tapaus.puolue}
              title={tapaus.puolue}
              width={80}
              height={32}
              className="h-8 w-auto max-w-20 shrink-0 object-contain"
            />
          )}
        </div>
      </header>

      <section className="flex h-18 shrink-0 items-center gap-3 bg-white/5.5 px-5 sm:px-6" aria-label="Rahoittaja">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-zinc-200">
          <BuildingOffice2Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.6rem] font-bold tracking-[0.14em] text-zinc-500 uppercase">Rahoittaja</p>
          <p className="mt-0.5 truncate text-sm font-bold text-zinc-100" title={tapaus.rahoittaja}>
            {tapaus.rahoittaja}
          </p>
          <p className="truncate text-xs leading-5 text-zinc-400" title={tapaus.rahoittajan_tyyppi}>
            {tapaus.rahoittajan_tyyppi}
          </p>
        </div>
      </section>

      <dl className="grid h-14 shrink-0 grid-cols-3 bg-black/30 px-2 sm:px-3">
        <div className="flex min-w-0 flex-col justify-center px-2">
          <dt className="truncate text-[0.58rem] font-bold tracking-widest text-zinc-500 uppercase">Tuki</dt>
          <dd className="mt-1 truncate text-[0.72rem] font-extrabold text-white sm:text-sm">
            <Money amount={tapaus.tuki_euroa} />
          </dd>
        </div>
        <div className="flex min-w-0 flex-col justify-center px-2">
          <dt className="truncate text-[0.58rem] font-bold tracking-widest text-zinc-500 uppercase">Lain raja</dt>
          <dd className="mt-1 truncate text-[0.72rem] font-extrabold text-white sm:text-sm">
            <Money amount={tapaus.lakisaateinen_raja_euroa} />
          </dd>
        </div>
        <div className="flex min-w-0 flex-col justify-center px-2">
          <dt className="truncate text-[0.58rem] font-bold tracking-widest text-zinc-500 uppercase">
            {overage?.label ?? 'Ylitys'}
          </dt>
          <dd
            className={`mt-1 truncate text-[0.72rem] font-extrabold sm:text-sm ${overage ? level.text : 'text-zinc-500'}`}
          >
            {overage ? <Money amount={overage.value} showPlus /> : '—'}
          </dd>
        </div>
      </dl>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2">
        <p className="text-[0.6rem] font-bold tracking-[0.16em] text-zinc-500 uppercase">Mitä ilmoitus kertoo</p>
        <p className="mt-2 text-base leading-6 font-bold text-zinc-50">{tapaus.status}</p>
        <p className="mt-3 text-sm leading-6 text-zinc-400">{tapaus.tausta}</p>

        {tapaus.kysymys && (
          <div className="mt-4 flex gap-3 rounded-lg bg-amber-300/9 p-3.5 text-amber-50/90">
            <QuestionMarkCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" aria-hidden="true" />
            <p className="text-sm leading-5">{tapaus.kysymys}</p>
          </div>
        )}

        <section className="mt-4 rounded-lg bg-white/4 p-3.5" aria-label="Mediahuomio">
          <div className="flex items-center gap-2.5">
            <NewspaperIcon className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
            <p className="text-[0.62rem] font-bold tracking-[0.14em] text-zinc-400 uppercase">Mediahuomio</p>
            <span className="ml-auto rounded-full bg-white/8 px-2.5 py-1 text-[0.62rem] font-bold text-zinc-300">
              {tapaus.mediahuomio ? (tapaus.mediahuomio.havaittu ? 'Havaittu' : 'Ei havaittu') : 'Kartoittamatta'}
            </span>
          </div>
          {tapaus.mediahuomio?.yhteenveto && (
            <p className="mt-3 text-sm leading-5 text-zinc-400">{tapaus.mediahuomio.yhteenveto}</p>
          )}
          {tapaus.mediahuomio?.lahteet && tapaus.mediahuomio.lahteet.length > 0 && (
            <ul className="mt-3 space-y-2">
              {tapaus.mediahuomio.lahteet.map((lahde) => (
                <li key={lahde.url}>
                  <a
                    href={lahde.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 transition hover:text-white focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                  >
                    {lahde.nimi}
                    <ArrowUpRightIcon className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>

        <a
          href={tapaus.lahde}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-zinc-500 transition hover:text-zinc-300 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
        >
          Alkuperäinen ilmoitus
          <ArrowUpRightIcon className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
};

export default Tapahtumakortti;
