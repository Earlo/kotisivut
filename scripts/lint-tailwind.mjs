/* oxlint-disable typescript/no-unsafe-argument, typescript/no-unsafe-assignment, typescript/no-unsafe-call, typescript/no-unsafe-member-access, typescript/no-unsafe-return */
import { readFileSync } from 'node:fs';

let report;
try {
  report = JSON.parse(readFileSync(0, 'utf8'));
} catch (error) {
  console.error(`Unable to read Tailwind lint report: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}

if (!report || typeof report.ok !== 'boolean' || !Array.isArray(report.files)) {
  console.error('Tailwind lint returned an invalid report.');
  process.exit(1);
}

const diagnostics = report.files.flatMap((file) => {
  const selectedDiagnostics = file.diagnostics.filter(
    ({ code, severity }) => severity === 'error' || code === 'suggestCanonicalClasses',
  );
  for (const diagnostic of selectedDiagnostics) diagnostic.path = file.path;
  return selectedDiagnostics;
});

for (const diagnostic of diagnostics) {
  console.error(`${diagnostic.path}:${diagnostic.line}:${diagnostic.column} ${diagnostic.message}`);
}

const errorCount = Math.max(
  report.summary?.errors ?? 0,
  diagnostics.filter(({ severity }) => severity === 'error').length,
);
const canonicalCount = diagnostics.filter(({ code }) => code === 'suggestCanonicalClasses').length;
const failed = report.ok === false || Boolean(report.error) || errorCount > 0;

if (failed) {
  if (report.error) console.error(report.error);
  console.error(
    `Tailwind lint failed${errorCount > 0 ? ` with ${errorCount} error${errorCount === 1 ? '' : 's'}` : ''}.`,
  );
}

if (canonicalCount > 0) {
  console.error(`\nFound ${canonicalCount} non-canonical Tailwind class${canonicalCount === 1 ? '' : 'es'}.`);
}

if (failed || canonicalCount > 0) {
  process.exitCode = 1;
}
