'use client';

import answerData from '@/data/vaalikonevastaukset.json';
import { ArrowPathIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDeferredValue, useMemo, useState } from 'react';

type Language = 'fi' | 'en' | 'sv';

type VaalikoneResponse = {
  response: string;
  explanations: Partial<Record<Language, string>>;
  election: string;
  year: number;
  source: string;
};

type QuestionGroup = {
  question: string;
  responses: VaalikoneResponse[];
};

type GroupFilter = 'all' | 'repeated';

const questions: QuestionGroup[] = answerData;
const responseCount = questions.reduce((total, group) => total + group.responses.length, 0);
const years = questions.flatMap((group) => group.responses.map((answer) => answer.year));
const yearRange = `${Math.min(...years)}–${Math.max(...years)}`;

const languageLabels: Record<Language, string> = {
  fi: 'Perustelu',
  en: 'Explanation',
  sv: 'Motivering',
};
const languages: Language[] = ['fi', 'en', 'sv'];

const normalizeForSearch = (value: string) => value.toLocaleLowerCase('fi-FI').trim();

const includesSearch = (value: string, query: string) => normalizeForSearch(value).includes(query);

const explanationLength = (answer: VaalikoneResponse) => {
  if (answer.explanations.fi) return answer.explanations.fi.length;
  return Math.max(0, ...Object.values(answer.explanations).map((explanation) => explanation?.length ?? 0));
};

const groupExplanationLength = (group: QuestionGroup) =>
  group.responses.reduce((total, answer) => total + explanationLength(answer), 0);

function Answer({ answer }: { answer: VaalikoneResponse }) {
  const explanations = languages.flatMap((language) => {
    const explanation = answer.explanations[language];
    return explanation ? [{ language, explanation }] : [];
  });

  return (
    <section className="rounded-2xl bg-gray-50 p-4 sm:p-5" aria-label={`${answer.election}, ${answer.source}`}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
        <span className="font-semibold text-gray-900">{answer.election}</span>
        <span aria-hidden="true">·</span>
        <span>{answer.source}</span>
      </div>

      <p className="mt-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-950">
        {answer.response}
      </p>

      <div className="mt-4 space-y-4">
        {explanations.length > 0 ? (
          explanations.map(({ language, explanation }) => (
            <div key={language} lang={language}>
              <p className="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                {languageLabels[language]}
              </p>
              <p className="text-[0.95rem] leading-7 whitespace-pre-line text-gray-800">{explanation}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">Perustelua ei annettu.</p>
        )}
      </div>
    </section>
  );
}

function QuestionCard({ group }: { group: QuestionGroup }) {
  const firstYear = Math.min(...group.responses.map(({ year }) => year));
  const lastYear = Math.max(...group.responses.map(({ year }) => year));
  const yearLabel = firstYear === lastYear ? String(firstYear) : `${firstYear}–${lastYear}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <details className="group/details">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-left marker:content-none sm:p-6 [&::-webkit-details-marker]:hidden">
          <span>
            <span className="flex flex-wrap gap-2">
              {group.responses.length > 1 && (
                <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-900">
                  Useasti kysytty
                </span>
              )}
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                {group.responses.length} {group.responses.length === 1 ? 'vastaus' : 'vastausta'} · {yearLabel}
              </span>
            </span>
            <span className="mt-3 block text-lg leading-7 font-bold text-gray-950 sm:text-xl">{group.question}</span>
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="mt-1 h-5 w-5 shrink-0 text-gray-400 transition-transform group-open/details:rotate-180 group-hover/details:text-gray-700"
          />
        </summary>
        <div className="space-y-3 border-t border-gray-100 px-5 py-5 sm:px-6 sm:py-6">
          {group.responses.map((answer) => (
            <Answer
              key={`${answer.election}-${answer.source}-${answer.response}-${JSON.stringify(answer.explanations)}`}
              answer={answer}
            />
          ))}
        </div>
      </details>
    </article>
  );
}

export default function VaalikonevastauksetClient() {
  const [search, setSearch] = useState('');
  const [election, setElection] = useState('all');
  const [groupFilter, setGroupFilter] = useState<GroupFilter>('all');
  const deferredSearch = useDeferredValue(search);
  const normalizedSearch = normalizeForSearch(deferredSearch);

  const elections = useMemo(
    () =>
      [...new Set(questions.flatMap((group) => group.responses.map((answer) => answer.election)))].toSorted((a, b) => {
        const yearA = Math.max(
          ...questions.flatMap((group) =>
            group.responses.filter((answer) => answer.election === a).map((answer) => answer.year),
          ),
        );
        const yearB = Math.max(
          ...questions.flatMap((group) =>
            group.responses.filter((answer) => answer.election === b).map((answer) => answer.year),
          ),
        );
        return yearB - yearA || a.localeCompare(b, 'fi');
      }),
    [],
  );

  const filteredQuestions = useMemo(
    () =>
      questions
        .flatMap((group) => {
          if (groupFilter === 'repeated' && group.responses.length === 1) return [];

          const matchingElectionResponses =
            election === 'all' ? group.responses : group.responses.filter((answer) => answer.election === election);

          if (matchingElectionResponses.length === 0) return [];

          const matchesQuery =
            !normalizedSearch ||
            includesSearch(group.question, normalizedSearch) ||
            matchingElectionResponses.some(
              (answer) =>
                includesSearch(answer.response, normalizedSearch) ||
                includesSearch(answer.election, normalizedSearch) ||
                includesSearch(answer.source, normalizedSearch) ||
                Object.values(answer.explanations).some(
                  (explanation) => explanation && includesSearch(explanation, normalizedSearch),
                ),
            );

          return matchesQuery ? [{ ...group, responses: matchingElectionResponses }] : [];
        })
        .toSorted(
          (a, b) =>
            b.responses.length - a.responses.length ||
            groupExplanationLength(b) - groupExplanationLength(a) ||
            a.question.localeCompare(b.question, 'fi'),
        ),
    [election, groupFilter, normalizedSearch],
  );

  const hasFilters = Boolean(search) || election !== 'all' || groupFilter !== 'all';

  const resetFilters = () => {
    setSearch('');
    setElection('all');
    setGroupFilter('all');
  };

  return (
    <>
      <section className="relative isolate w-full overflow-hidden bg-gray-950 px-4 py-14 text-white sm:py-20">
        <div
          className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.22),transparent_65%)]"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-bold tracking-[0.2em] text-blue-300 uppercase">Vaalikonearkisto</p>
          <h1 className="max-w-4xl text-4xl leading-tight font-black tracking-tight sm:text-6xl">
            Visa Pollarin vaalikonevastaukset {yearRange}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Kaikki vaalikonevastaukseni vuodesta 2023 lähtien yhdessä paikassa. Kun sama kysymys on esitetty useissa
            vaaleissa, vastaukset ja perustelut näkyvät rinnakkain.
          </p>
          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/15 pt-7">
            <div>
              <dt className="text-sm text-gray-400">Kysymyksiä</dt>
              <dd className="text-2xl font-bold">{questions.length}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-400">Vastauksia</dt>
              <dd className="text-2xl font-bold">{responseCount}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-400">Ajanjakso</dt>
              <dd className="text-2xl font-bold">{yearRange}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="w-full bg-gray-50 px-4 py-8 sm:py-12" aria-labelledby="answers-heading">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.45fr)]">
              <div>
                <label htmlFor="answer-search" className="mb-2 block text-sm font-semibold text-gray-700">
                  Hae kysymyksistä, vastauksista ja perusteluista
                </label>
                <div className="relative">
                  <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="answer-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Esimerkiksi perustulo tai verotus"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pr-4 pl-11 text-base text-gray-950 transition outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="election-filter" className="mb-2 block text-sm font-semibold text-gray-700">
                  Vaalit
                </label>
                <select
                  id="election-filter"
                  value={election}
                  onChange={(event) => setElection(event.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-950 transition outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
                >
                  <option value="all">Kaikki vaalit</option>
                  {elections.map((electionName) => (
                    <option key={electionName} value={electionName}>
                      {electionName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
              <div className="inline-flex rounded-xl bg-gray-100 p-1" aria-label="Kysymysten rajaus">
                <button
                  type="button"
                  onClick={() => setGroupFilter('all')}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    groupFilter === 'all' ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-600 hover:text-gray-950'
                  }`}
                  aria-pressed={groupFilter === 'all'}
                >
                  Kaikki
                </button>
                <button
                  type="button"
                  onClick={() => setGroupFilter('repeated')}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    groupFilter === 'repeated'
                      ? 'bg-white text-gray-950 shadow-sm'
                      : 'text-gray-600 hover:text-gray-950'
                  }`}
                  aria-pressed={groupFilter === 'repeated'}
                >
                  Useasti kysytyt
                </button>
              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-gray-600 hover:text-gray-950"
                >
                  <ArrowPathIcon aria-hidden="true" className="h-4 w-4" />
                  Tyhjennä rajaukset
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-end justify-between gap-4">
            <div>
              <h2 id="answers-heading" className="text-2xl font-black tracking-tight text-gray-950">
                Vastaukset
              </h2>
              <p className="mt-1 text-sm text-gray-500" aria-live="polite">
                {filteredQuestions.length} {filteredQuestions.length === 1 ? 'kysymys' : 'kysymystä'}
              </p>
            </div>
            <p className="hidden text-sm text-gray-500 sm:block">Avaa kysymys nähdäksesi perustelut</p>
          </div>

          {filteredQuestions.length > 0 ? (
            <div className="mt-5 space-y-3">
              {filteredQuestions.map((group) => (
                <QuestionCard key={group.question} group={group} />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <p className="text-lg font-bold text-gray-900">Hakua vastaavia kysymyksiä ei löytynyt.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-3 text-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                Tyhjennä rajaukset
              </button>
            </div>
          )}

          <p className="mt-12 border-t border-gray-200 pt-6 text-sm leading-6 text-gray-500">
            Vastaukset ja perustelut on tuotu vaalikoneista sellaisina kuin ne on annettu. Vaalikoneen tarjoaja näkyy
            jokaisen vastauksen yhteydessä. Vastauksia ei ole muokattu jälkikäteen.
          </p>
        </div>
      </section>
    </>
  );
}
