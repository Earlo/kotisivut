type CaseIdentity = {
  nimi: string;
  vaalit: string;
  rahoittaja: string;
};

export function getCaseId(tapaus: CaseIdentity): string {
  const slug = `${tapaus.nimi}-${tapaus.vaalit}-${tapaus.rahoittaja}`
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return `tapaus-${slug}`;
}
