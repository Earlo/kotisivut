import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { closeSync, mkdtempSync, openSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const wrapperPath = fileURLToPath(new URL('../scripts/lint-tailwind.mjs', import.meta.url));

type Diagnostic = {
  code: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  source: string;
  line: number;
  column: number;
  endLine: number;
  endColumn: number;
};

type TailwindReport = {
  ok: boolean;
  summary: { errors: number; warnings: number; fixed: number; filesWithIssues: number; totalFilesProcessed: number };
  config: { cwd: string; configPath: string | null; autoDiscover: boolean; fix: boolean; patterns: string[] };
  files: { path: string; fixed: boolean; fixedCount: number; diagnostics: Diagnostic[] }[];
  skippedFiles: string[];
};

type WrapperResult = { status: number | null; stdout: string; stderr: string };

function report(): TailwindReport {
  return {
    ok: true,
    summary: { errors: 0, warnings: 0, fixed: 0, filesWithIssues: 0, totalFilesProcessed: 1 },
    config: { cwd: '/tmp', configPath: null, autoDiscover: true, fix: false, patterns: [] },
    files: [],
    skippedFiles: [],
  };
}

function diagnosticReport(code: string, severity: Diagnostic['severity'], message: string): TailwindReport {
  return {
    ...report(),
    ok: severity !== 'error',
    summary: {
      errors: severity === 'error' ? 1 : 0,
      warnings: severity === 'warning' ? 1 : 0,
      fixed: 0,
      filesWithIssues: 1,
      totalFilesProcessed: 1,
    },
    files: [
      {
        path: '/tmp/tailwind-fixture.css',
        fixed: false,
        fixedCount: 0,
        diagnostics: [
          { code, severity, message, source: 'tailwindcss', line: 2, column: 3, endLine: 2, endColumn: 15 },
        ],
      },
    ],
  };
}

async function runWrapper(input: string): Promise<WrapperResult> {
  const directory = mkdtempSync(join(tmpdir(), 'tailwind-wrapper-test-'));
  const inputPath = join(directory, 'stdin');
  const stdoutPath = join(directory, 'stdout');
  const stderrPath = join(directory, 'stderr');
  writeFileSync(inputPath, input);
  // File descriptors keep CLI output capture reliable in restricted execution environments.
  const descriptors = [openSync(inputPath, 'r'), openSync(stdoutPath, 'w'), openSync(stderrPath, 'w')];
  try {
    return await new Promise<WrapperResult>((resolve, reject) => {
      const child = spawn(process.execPath, [wrapperPath], { stdio: descriptors, timeout: 5000 });
      child.on('error', reject);
      child.on('close', (status, signal) => {
        if (signal) reject(new Error(`Tailwind wrapper was terminated by ${signal}.`));
        else resolve({ status, stdout: readFileSync(stdoutPath, 'utf8'), stderr: readFileSync(stderrPath, 'utf8') });
      });
    });
  } finally {
    for (const descriptor of descriptors) closeSync(descriptor);
    rmSync(directory, { recursive: true, force: true });
  }
}

void describe('Tailwind lint wrapper', () => {
  void it('accepts a clean report', async () => {
    const result = await runWrapper(JSON.stringify(report()));
    assert.equal(result.status, 0);
    assert.equal(result.stdout, '');
    assert.equal(result.stderr, '');
  });

  void it('rejects and prints canonical-class warnings', async () => {
    const result = await runWrapper(
      JSON.stringify(diagnosticReport('suggestCanonicalClasses', 'warning', 'Use the canonical class.')),
    );
    assert.equal(result.status, 1);
    assert.match(result.stderr, /tailwind-fixture\.css:2:3 Use the canonical class\./);
  });

  void it('continues to ignore other warnings', async () => {
    const result = await runWrapper(JSON.stringify(diagnosticReport('cssConflict', 'warning', 'Conflicting classes.')));
    assert.equal(result.status, 0);
    assert.equal(result.stdout, '');
    assert.equal(result.stderr, '');
  });

  void it('rejects and prints error diagnostics even when the summary misses them', async () => {
    const input = diagnosticReport('invalidApply', 'error', 'Cannot apply unknown utility.');
    input.ok = true;
    input.summary.errors = 0;
    const result = await runWrapper(JSON.stringify(input));
    assert.equal(result.status, 1);
    assert.match(result.stderr, /tailwind-fixture\.css:2:3 Cannot apply unknown utility\./);
  });

  void it('rejects summary errors even without individual diagnostics', async () => {
    const input = report();
    input.summary.errors = 1;
    const result = await runWrapper(JSON.stringify(input));
    assert.equal(result.status, 1);
    assert.notEqual(result.stderr.trim(), '');
  });

  void it('rejects operational failures with zero summary errors and no diagnostics', async () => {
    const input = { ...report(), ok: false, error: 'Unable to load Tailwind configuration.' };
    input.summary.totalFilesProcessed = 0;
    const result = await runWrapper(JSON.stringify(input));
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Unable to load Tailwind configuration\./);
  });

  void it('rejects malformed JSON', async () => {
    const result = await runWrapper('{invalid JSON');
    assert.equal(result.status, 1);
    assert.notEqual(result.stderr.trim(), '');
  });
});
