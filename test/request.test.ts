import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readBoundedJson, SubmissionError } from '../lib/request.ts';

function request(body: string, headers: HeadersInit = {}) {
  const requestHeaders = new Headers(headers);
  if (!requestHeaders.has('Content-Type')) requestHeaders.set('Content-Type', 'application/json');
  return new Request('https://example.test/api/votes', {
    method: 'POST',
    headers: requestHeaders,
    body,
  });
}

function hasStatus(status: number) {
  return (error: unknown) => error instanceof SubmissionError && error.status === status;
}

void describe('readBoundedJson', () => {
  void it('accepts valid JSON at the exact byte limit', async () => {
    assert.deepEqual(await readBoundedJson(request('[1]'), 3), [1]);
  });

  void it('rejects bodies beyond the limit with no Content-Length', async () => {
    await assert.rejects(readBoundedJson(request('[12]'), 3), hasStatus(413));
  });

  void it('measures UTF-8 bytes rather than JavaScript character count', async () => {
    await assert.rejects(readBoundedJson(request('"€"'), 4), hasStatus(413));
    assert.equal(await readBoundedJson(request('"€"'), 5), '€');
  });

  void it('rejects oversized streaming bodies even when Content-Length understates their size', async () => {
    let cancelled = false;
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('[1,'));
        controller.enqueue(new TextEncoder().encode('2,3]'));
      },
      cancel() {
        cancelled = true;
      },
    });
    const init: RequestInit & { duplex: 'half' } = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': '1' },
      body: stream,
      duplex: 'half',
    };
    await assert.rejects(readBoundedJson(new Request('https://example.test', init), 5), hasStatus(413));
    assert.equal(cancelled, true);
  });

  void it('rejects malformed JSON and unsupported media types', async () => {
    await assert.rejects(readBoundedJson(request('{broken'), 20), hasStatus(400));
    await assert.rejects(readBoundedJson(request('{}', { 'Content-Type': 'text/plain' }), 20), hasStatus(415));
  });
});
