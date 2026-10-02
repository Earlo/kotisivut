export class SubmissionError extends Error {
  readonly status: number;
  readonly code: string;
  readonly retryAfter: number | undefined;

  constructor(status: number, code: string, message: string, retryAfter?: number, options?: ErrorOptions) {
    super(message, options);
    this.name = 'SubmissionError';
    this.status = status;
    this.code = code;
    this.retryAfter = retryAfter;
  }
}

/** Bound the bytes read from the stream even when Content-Length is absent or false. */
export async function readBoundedJson(request: Request, maxBytes: number): Promise<unknown> {
  if (request.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase() !== 'application/json') {
    throw new SubmissionError(415, 'UNSUPPORTED_MEDIA_TYPE', 'Lähetä pyyntö JSON-muodossa.');
  }
  const statedLength = Number(request.headers.get('content-length'));
  if (statedLength > maxBytes) {
    await request.body?.cancel().catch(() => undefined);
    throw new SubmissionError(413, 'BODY_TOO_LARGE', 'Pyyntö on liian suuri.');
  }
  const reader = request.body?.getReader();
  if (!reader) throw new SubmissionError(400, 'BAD_JSON', 'Virheellinen pyyntö.');

  const chunks: Uint8Array[] = [];
  let byteLength = 0;
  try {
    while (true) {
      // eslint-disable-next-line no-await-in-loop -- Read sequentially to enforce the byte limit before the next chunk.
      const { done, value } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > maxBytes) {
        // eslint-disable-next-line no-await-in-loop -- Stop the bounded stream before rejecting this request.
        await reader.cancel().catch(() => undefined);
        throw new SubmissionError(413, 'BODY_TOO_LARGE', 'Pyyntö on liian suuri.');
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(byteLength);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)) as unknown;
  } catch (error) {
    if (error instanceof SubmissionError) throw error;
    throw new SubmissionError(400, 'BAD_JSON', 'Virheellinen pyyntö.');
  } finally {
    reader.releaseLock();
  }
}
