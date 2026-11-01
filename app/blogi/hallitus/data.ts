import type { BarChartRow } from '@/components/BarChart';

// Reproduce voimasuhteet.png, whose capture date is unknown. These are not
// presented as the current sizes of the parliamentary groups.
export const governmentGroups = [
  { label: 'Kokoomuksen eduskuntaryhmä', value: 48, color: '#4b8bdf' },
  { label: 'Perussuomalaisten eduskuntaryhmä', value: 45, color: '#ffdb00' },
  { label: 'Ruotsalainen eduskuntaryhmä', value: 10, color: '#ffdc8a' },
  { label: 'Kristillisdemokraattinen eduskuntaryhmä', value: 5, color: '#40a6c6' },
] as const satisfies readonly BarChartRow[];

export const oppositionGroups = [
  { label: 'Sosialidemokraattinen eduskuntaryhmä', value: 43, color: '#ed1740' },
  { label: 'Keskustan eduskuntaryhmä', value: 23, color: '#00a65a' },
  { label: 'Vihreä eduskuntaryhmä', value: 13, color: '#61bf1a' },
  { label: 'Vasemmistoliiton eduskuntaryhmä', value: 11, color: '#d52228' },
  { label: 'Liike Nyt -eduskuntaryhmä', value: 1, color: '#d33188' },
  { label: 'Eduskuntaryhmä Timo Vornanen', value: 1, color: '#5a8fdf' },
] as const satisfies readonly BarChartRow[];

// Government membership and MPs checked on 1 November 2026 against
// https://valtioneuvosto.fi/hallitukset and the linked minister profiles.
// Derive the counts from people, rather than treating every member of a
// government party's parliamentary group as a member of the Government.
export const ministersByGroup = [
  {
    label: 'Kokoomuksen eduskuntaryhmä',
    color: governmentGroups[0].color,
    members: [
      'Petteri Orpo',
      'Elina Valtonen',
      'Antti Häkkänen',
      'Anna-Kaisa Ikonen',
      'Mari-Leena Talvitie',
      'Matias Marttinen',
      'Karoliina Partanen',
      'Sari Multala',
    ],
  },
  {
    label: 'Perussuomalaisten eduskuntaryhmä',
    color: governmentGroups[1].color,
    members: [
      'Riikka Purra',
      'Ville Tavio',
      'Leena Meri',
      'Mari Rantanen',
      'Lulu Ranne',
      'Sakari Puisto',
      'Wille Rydman',
    ],
  },
  {
    label: 'Ruotsalainen eduskuntaryhmä',
    color: governmentGroups[2].color,
    members: ['Anders Adlercreutz', 'Joakim Strand'],
  },
  {
    label: 'Kristillisdemokraattinen eduskuntaryhmä',
    color: governmentGroups[3].color,
    members: ['Sari Essayah', 'Mika Poutala'],
  },
] as const;

export const ministerRows = ministersByGroup.map((group) => ({
  label: group.label,
  value: group.members.length,
  color: group.color,
}));

export const ministerTotal = ministerRows.reduce((total, row) => total + row.value, 0);
