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
}

const euroFormatter = new Intl.NumberFormat('fi-FI', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const levelStyles = {
  selvä: {
    label: 'Selvä ylitys',
    badge: 'border-red-400/30 bg-red-400/10 text-red-200',
    accent: 'bg-red-400',
    glow: 'group-hover:border-red-400/40',
  },
  selvä_varauksin: {
    label: 'Ylitys varauksin',
    badge: 'border-orange-400/30 bg-orange-400/10 text-orange-200',
    accent: 'bg-orange-400',
    glow: 'group-hover:border-orange-400/40',
  },
  epäselvä: {
    label: 'Epäselvä',
    badge: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
    accent: 'bg-amber-300',
    glow: 'group-hover:border-amber-300/40',
  },
  avoimuusongelma: {
    label: 'Avoimuusongelma',
    badge: 'border-violet-400/30 bg-violet-400/10 text-violet-200',
    accent: 'bg-violet-400',
    glow: 'group-hover:border-violet-400/40',
  },
  korjattu: {
    label: 'Korjattu jälkikäteen',
    badge: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
    accent: 'bg-emerald-400',
    glow: 'group-hover:border-emerald-400/40',
  },
};

const getLevelStyle = (level: string) => {
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
  if (typeof tapaus.ylitys_euroa === 'number') {
    return { label: 'Ylitys', value: tapaus.ylitys_euroa };
  }

  if (typeof tapaus.alkuperainen_ylitys_euroa === 'number') {
    return { label: 'Alkuperäinen ylitys', value: tapaus.alkuperainen_ylitys_euroa };
  }

  if (typeof tapaus.nimellinen_ylitys_euroa === 'number') {
    return { label: 'Nimellinen ylitys', value: tapaus.nimellinen_ylitys_euroa };
  }

  return null;
};

const Tapahtumakortti = ({ tapaus }: TapahtumakorttiProps) => {
  const level = getLevelStyle(tapaus.rikkeen_taso);
  const overage = getOverage(tapaus);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 ${level.glow}`}
    >
      <div className={`absolute inset-y-0 left-0 w-1 ${level.accent}`} aria-hidden="true" />

      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 px-5 py-5 sm:px-6">
        <div>
          <p className="mb-1 text-xs font-semibold tracking-widest text-zinc-400 uppercase">{tapaus.vaalit}</p>
          <h3 className="text-xl font-bold tracking-tight text-white">{tapaus.nimi}</h3>
          {tapaus.puolue && <p className="mt-1 text-sm text-zinc-400">{tapaus.puolue}</p>}
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap ${level.badge}`}>
          {level.label}
        </span>
      </div>

      <div className="flex grow flex-col px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 rounded-lg bg-white/5 p-2 text-zinc-300">
            <BuildingOffice2Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase">Rahoittaja</p>
            <p className="mt-0.5 font-semibold text-zinc-100">{tapaus.rahoittaja}</p>
            <p className="mt-0.5 text-sm text-zinc-400">{tapaus.rahoittajan_tyyppi}</p>
          </div>
        </div>

        <dl
          className={`mt-5 grid overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] ${overage ? 'grid-cols-3' : 'grid-cols-2'}`}
        >
          <div className="p-3 sm:p-4">
            <dt className="text-[0.65rem] font-semibold tracking-wide text-zinc-500 uppercase">Ilmoitettu tuki</dt>
            <dd className="mt-1 text-sm font-bold text-white sm:text-base">
              {euroFormatter.format(tapaus.tuki_euroa)}
            </dd>
          </div>
          <div className="border-l border-white/10 p-3 sm:p-4">
            <dt className="text-[0.65rem] font-semibold tracking-wide text-zinc-500 uppercase">Lakisääteinen raja</dt>
            <dd className="mt-1 text-sm font-bold text-white sm:text-base">
              {euroFormatter.format(tapaus.lakisaateinen_raja_euroa)}
            </dd>
          </div>
          {overage && (
            <div className="border-l border-white/10 p-3 sm:p-4">
              <dt className="text-[0.65rem] font-semibold tracking-wide text-zinc-500 uppercase">{overage.label}</dt>
              <dd className="mt-1 text-sm font-bold text-red-300 sm:text-base">
                +{euroFormatter.format(overage.value)}
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-5">
          <p className="font-semibold text-zinc-100">{tapaus.status}</p>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{tapaus.tausta}</p>
        </div>

        {tapaus.kysymys && (
          <div className="mt-5 flex gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] p-4">
            <QuestionMarkCircleIcon className="h-5 w-5 shrink-0 text-amber-200" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold tracking-wide text-amber-200/80 uppercase">Avoin kysymys</p>
              <p className="mt-1 text-sm leading-6 text-amber-50/90">{tapaus.kysymys}</p>
            </div>
          </div>
        )}

        <a
          href={tapaus.lahde}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-sky-300 transition hover:text-sky-200 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
        >
          Avaa alkuperäinen ilmoitus
          <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
};

export default Tapahtumakortti;
