/* oxlint-disable typescript/no-unsafe-argument, typescript/no-unsafe-assignment, typescript/no-unsafe-call, typescript/no-unsafe-member-access, typescript/no-unsafe-return */
import { readFileSync } from 'node:fs';

const report = JSON.parse(readFileSync(0, 'utf8'));
const diagnostics = report.files.flatMap((file) => {
  const canonicalDiagnostics = file.diagnostics.filter(({ code }) => code === 'suggestCanonicalClasses');
  for (const diagnostic of canonicalDiagnostics) diagnostic.path = file.path;
  return canonicalDiagnostics;
});

for (const diagnostic of diagnostics) {
  console.error(`${diagnostic.path}:${diagnostic.line}:${diagnostic.column} ${diagnostic.message}`);
}

if (diagnostics.length > 0) {
  console.error(`\nFound ${diagnostics.length} non-canonical Tailwind class${diagnostics.length === 1 ? '' : 'es'}.`);
  process.exitCode = 1;
}
