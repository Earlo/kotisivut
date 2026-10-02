import { NextResponse } from 'next/server';
import { SubmissionError } from './request';

export function noStoreJson(body: unknown, status = 200, extraHeaders?: HeadersInit) {
  const headers = new Headers(extraHeaders);
  headers.set('Cache-Control', 'no-store');
  return NextResponse.json(body, { status, headers });
}

export function submissionFailure(error: unknown, logMessage: string, publicMessage: string) {
  if (error instanceof SubmissionError) {
    if (error.status >= 500) console.error(logMessage, error);
    return noStoreJson(
      { error: error.code, message: error.message },
      error.status,
      error.retryAfter ? { 'Retry-After': String(error.retryAfter) } : undefined,
    );
  }
  console.error(logMessage, error);
  return noStoreJson({ error: 'INTERNAL_ERROR', message: publicMessage }, 500);
}
