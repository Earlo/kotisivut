import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { SubmissionError } from '../lib/request.ts';
import { createSubmissionLimiter, enforceSubmissionLimit } from '../lib/submissionLimit.ts';

const trustedHeader = 'x-vercel-forwarded-for';
const headers = new Headers({ [trustedHeader]: '198.51.100.9' });

function rateLimited(retryAfter: number) {
  return (error: unknown) =>
    error instanceof SubmissionError && error.status === 429 && error.retryAfter === retryAfter;
}

void describe('submission limits', () => {
  void it('allows 30 submissions per address and gives the remaining retry time', () => {
    let timestamp = 0;
    const limiter = createSubmissionLimiter({ now: () => timestamp });
    for (let i = 0; i < 30; i++) {
      assert.equal(enforceSubmissionLimit(headers, 'votes', { trustedHeader, limiter }), '198.51.100.9');
    }
    timestamp = 12_100;
    assert.throws(() => enforceSubmissionLimit(headers, 'votes', { trustedHeader, limiter }), rateLimited(48));
    timestamp = 59_999;
    assert.throws(() => enforceSubmissionLimit(headers, 'votes', { trustedHeader, limiter }), rateLimited(1));
    timestamp = 60_000;
    assert.equal(enforceSubmissionLimit(headers, 'votes', { trustedHeader, limiter }), '198.51.100.9');
  });

  void it('keeps addresses and endpoint windows separate', () => {
    const limiter = createSubmissionLimiter({ limit: 1, now: () => 0 });
    limiter.consume('votes', '198.51.100.9');
    limiter.consume('comments', '198.51.100.9');
    limiter.consume('tierlist', '198.51.100.9');
    limiter.consume('votes', '198.51.100.10');
    assert.throws(() => limiter.consume('votes', '198.51.100.9'), rateLimited(60));
    assert.equal(limiter.bucketCount, 4);
  });

  void it('shares one unknown-address bucket without fabricating an IP or failing in production', () => {
    const limiter = createSubmissionLimiter({ limit: 2, now: () => 0 });
    assert.equal(enforceSubmissionLimit(new Headers(), 'votes', { trustedHeader, limiter }), undefined);
    assert.equal(
      enforceSubmissionLimit(new Headers({ 'x-forwarded-for': '198.51.100.20' }), 'votes', { trustedHeader, limiter }),
      undefined,
    );
    assert.throws(
      () =>
        enforceSubmissionLimit(new Headers({ [trustedHeader]: 'invalid.example' }), 'votes', {
          trustedHeader,
          limiter,
        }),
      rateLimited(60),
    );
    assert.equal(enforceSubmissionLimit(new Headers(), 'comments', { trustedHeader, limiter }), undefined);
    assert.equal(limiter.bucketCount, 2);
  });

  void it('bounds memory and uses shared buckets at capacity without evicting active limits', () => {
    const limiter = createSubmissionLimiter({ limit: 2, maxAddressBuckets: 2, now: () => 0 });
    limiter.consume('votes', '198.51.100.1');
    limiter.consume('votes', '198.51.100.2');
    limiter.consume('votes', '198.51.100.3');
    limiter.consume('votes', '198.51.100.4');
    assert.throws(() => limiter.consume('votes', '198.51.100.5'), rateLimited(60));
    for (let i = 6; i < 1000; i++) {
      assert.throws(() => limiter.consume('votes', `address-${i}`), rateLimited(60));
    }
    limiter.consume('votes', '198.51.100.1');
    assert.throws(() => limiter.consume('votes', '198.51.100.1'), rateLimited(60));
    limiter.consume('comments', undefined);
    limiter.consume('tierlist', undefined);
    assert.equal(limiter.bucketCount, 5);
  });

  void it('cleans expired buckets so fresh addresses can get independent windows', () => {
    let timestamp = 0;
    const limiter = createSubmissionLimiter({ limit: 1, maxAddressBuckets: 1, now: () => timestamp });
    limiter.consume('votes', '198.51.100.1');
    limiter.consume('votes', undefined);
    timestamp = 60_000;
    limiter.consume('votes', '198.51.100.2');
    limiter.consume('votes', '198.51.100.3');
    assert.equal(limiter.bucketCount, 2);
    assert.throws(() => limiter.consume('votes', '198.51.100.2'), rateLimited(60));
    assert.throws(() => limiter.consume('votes', undefined), rateLimited(60));
  });
});
