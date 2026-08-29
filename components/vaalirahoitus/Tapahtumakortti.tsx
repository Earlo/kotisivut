import { ArrowUpRightIcon, BuildingOffice2Icon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

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
  lahde: string;
}

interface TapahtumakorttiProps {
  tapaus: VaalirahoitusCase;
  tiivis?: boolean;
}

const euroFormatter = new Intl.NumberFormat('fi-FI', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const levelStyles = {
  selvä: {
    label: 'Selvä ylitys',
    badge: 'border-red-400/30 bg-red-400/10 text-red-200',
    accent: 'bg-red-400',
    text: 'text-red-300',
  },
  selvä_varauksin: {
    label: 'Ylitys varauksin',
    badge: 'border-orange-400/30 bg-orange-400/10 text-orange-200',
    accent: 'bg-orange-400',
    text: 'text-orange-300',
  },
  epäselvä: {
    label: 'Epäselvä',
    badge: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
    accent: 'bg-amber-300',
    text: 'text-amber-200',
  },
  avoimuusongelma: {
    label: 'Avoimuusongelma',
    badge: 'border-violet-400/30 bg-violet-400/10 text-violet-200',
    accent: 'bg-violet-400',
    text: 'text-violet-300',
  },
  korjattu: {
    label: 'Korjattu jälkikäteen',
    badge: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
    accent: 'bg-emerald-400',
    text: 'text-emerald-300',
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
    return { label: 'Alkuperäinen ylitys', value: tapaus.alkuperainen_ylitys_euroa };
  }
  if (typeof tapaus.nimellinen_ylitys_euroa === 'number') {
    return { label: 'Nimellinen ylitys', value: tapaus.nimellinen_ylitys_euroa };
  }
  return null;
};

const Tapahtumakortti = ({ tapaus, tiivis = false }: TapahtumakorttiProps) => {
  const level = getLevelStyle(tapaus.rikkeen_taso);
  const overage = getOverage(tapaus);

  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-xl shadow-black/20">
      <div className={`absolute inset-y-0 left-0 w-1 ${level.accent}`} aria-hidden="true" />
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[0.68rem] font-semibold tracking-widest text-zinc-400 uppercase">{tapaus.vaalit}</p>
          <span className={`rounded-full border px-2.5 py-0.5 text-[0.68rem] font-semibold ${level.badge}`}>
            {level.label}
          </span>
        </div>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-white">{tapaus.nimi}</h3>
        {tapaus.puolue && <p className="mt-0.5 text-xs leading-5 text-zinc-400">{tapaus.puolue}</p>}
      </div>

      <div className="px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 rounded-lg bg-white/5 p-2 text-zinc-300">
            <BuildingOffice2Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[0.65rem] font-medium tracking-wide text-zinc-500 uppercase">Rahoittaja</p>
            <p className="mt-0.5 font-semibold text-zinc-100">{tapaus.rahoittaja}</p>
            <p className="text-xs leading-5 text-zinc-400">{tapaus.rahoittajan_tyyppi}</p>
          </div>
        </div>

        <dl
          className={`mt-4 grid overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] ${overage ? 'grid-cols-3' : 'grid-cols-2'}`}
        >
          <div className="p-2.5">
            <dt className="text-[0.58rem] font-semibold tracking-wide text-zinc-500 uppercase">Tuki</dt>
            <dd className="mt-1 text-xs font-bold text-white sm:text-sm">{euroFormatter.format(tapaus.tuki_euroa)}</dd>
          </div>
          <div className="border-l border-white/10 p-2.5">
            <dt className="text-[0.58rem] font-semibold tracking-wide text-zinc-500 uppercase">Raja</dt>
            <dd className="mt-1 text-xs font-bold text-white sm:text-sm">
              {euroFormatter.format(tapaus.lakisaateinen_raja_euroa)}
            </dd>
          </div>
          {overage && (
            <div className="border-l border-white/10 p-2.5">
              <dt className="text-[0.58rem] font-semibold tracking-wide text-zinc-500 uppercase">{overage.label}</dt>
              <dd className={`mt-1 text-xs font-bold sm:text-sm ${level.text}`}>
                +{euroFormatter.format(overage.value)}
              </dd>
            </div>
          )}
        </dl>

        <p className="mt-4 text-sm leading-5 font-semibold text-zinc-100">{tapaus.status}</p>
        {tiivis ? (
          <details className="group/details mt-3 rounded-xl border border-white/10 bg-white/[0.025] open:bg-white/[0.04]">
            <summary className="cursor-pointer list-none px-3.5 py-3 text-xs font-semibold text-zinc-300 marker:hidden">
              <span className="flex items-center justify-between gap-3">
                Tapauksen tausta
                <span
                  className="text-base leading-none text-zinc-500 transition group-open/details:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </span>
            </summary>
            <div className="border-t border-white/10 px-3.5 py-3">
              <p className="text-sm leading-6 text-zinc-400">{tapaus.tausta}</p>
              {tapaus.kysymys && (
                <div className="mt-3 flex gap-2.5 text-amber-50/90">
                  <QuestionMarkCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" aria-hidden="true" />
                  <p className="text-xs leading-5">{tapaus.kysymys}</p>
                </div>
              )}
            </div>
          </details>
        ) : (
          <>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{tapaus.tausta}</p>
            {tapaus.kysymys && (
              <div className="mt-4 flex gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] p-3">
                <QuestionMarkCircleIcon className="h-5 w-5 shrink-0 text-amber-200" aria-hidden="true" />
                <p className="text-sm leading-5 text-amber-50/90">{tapaus.kysymys}</p>
              </div>
            )}
          </>
        )}

        <a
          href={tapaus.lahde}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 transition hover:text-sky-200 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
        >
          Alkuperäinen ilmoitus
          <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
};

export default Tapahtumakortti;
