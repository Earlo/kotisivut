import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { clientIpFromHeaders } from '../lib/ip.ts';

void describe('clientIpFromHeaders', () => {
  void it('returns the first non-private address after private proxy hops', () => {
    const headers = new Headers({
      'x-forwarded-for': '10.0.0.2, 192.168.1.4, 203.0.113.7',
    });

    assert.equal(clientIpFromHeaders(headers), '203.0.113.7');
  });

  void it('falls back to another supported forwarding header', () => {
    const headers = new Headers({ 'cf-connecting-ip': '198.51.100.9' });

    assert.equal(clientIpFromHeaders(headers), '198.51.100.9');
  });

  void it('returns undefined when every reported address is private', () => {
    const headers = new Headers({
      'x-forwarded-for': '127.0.0.1, 172.16.0.2, 192.168.1.3',
    });

    assert.equal(clientIpFromHeaders(headers), undefined);
  });

  const privateRangeBoundaries: ReadonlyArray<readonly [string, string | undefined]> = [
    ['172.15.255.255', '172.15.255.255'],
    ['172.16.0.0', undefined],
    ['172.31.255.255', undefined],
    ['172.32.0.0', '172.32.0.0'],
  ];

  for (const [address, expected] of privateRangeBoundaries) {
    void it(`classifies ${address} at the 172.16/12 boundary`, () => {
      assert.equal(clientIpFromHeaders(new Headers({ 'x-real-ip': address })), expected);
    });
  }
});
