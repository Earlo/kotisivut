import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { clientIpFromHeaders } from '../lib/ip.ts';

void describe('clientIpFromHeaders', () => {
  void it('ignores forwarding headers unless a deployment proxy is trusted', () => {
    const headers = new Headers({
      'x-forwarded-for': '203.0.113.7',
      'x-real-ip': '198.51.100.9',
    });
    assert.equal(clientIpFromHeaders(headers), undefined);
  });

  void it('reads only the configured proxy header', () => {
    const headers = new Headers({
      'x-vercel-forwarded-for': '198.51.100.9',
      'x-forwarded-for': '203.0.113.7',
      'cf-connecting-ip': '203.0.113.8',
    });
    assert.equal(clientIpFromHeaders(headers, 'x-vercel-forwarded-for'), '198.51.100.9');
  });

  for (const invalid of ['visapollari.fi', 'unknown', '999.1.2.3', '203.0.113.7, 198.51.100.9', 'fe80::1%eth0']) {
    void it(`rejects invalid or ambiguous address ${invalid}`, () => {
      assert.equal(clientIpFromHeaders(new Headers({ 'x-real-ip': invalid }), 'x-real-ip'), undefined);
    });
  }

  void it('normalizes IPv6 so equivalent spellings have one rate-limit identity', () => {
    assert.equal(
      clientIpFromHeaders(new Headers({ 'x-real-ip': '2001:0DB8:0000:0000:0000:0000:0000:0001' }), 'x-real-ip'),
      '2001:db8::1',
    );
    assert.equal(clientIpFromHeaders(new Headers({ 'x-real-ip': '::ffff:198.51.100.9' }), 'x-real-ip'), '198.51.100.9');
  });

  const privateRangeBoundaries: ReadonlyArray<readonly [string, string | undefined]> = [
    ['0.0.0.0', undefined],
    ['10.0.0.1', undefined],
    ['127.0.0.1', undefined],
    ['169.254.10.2', undefined],
    ['172.15.255.255', '172.15.255.255'],
    ['172.16.0.0', undefined],
    ['172.31.255.255', undefined],
    ['172.32.0.0', '172.32.0.0'],
    ['192.168.1.1', undefined],
    ['100.64.0.1', undefined],
    ['224.0.0.1', undefined],
    ['::', undefined],
    ['::1', undefined],
    ['fc00::1', undefined],
    ['fd00::1', undefined],
    ['fe80::1', undefined],
    ['febf::1', undefined],
    ['fec0::1', 'fec0::1'],
    ['ff02::1', undefined],
    ['::ffff:127.0.0.1', undefined],
    ['::ffff:c0a8:101', undefined],
  ];

  for (const [address, expected] of privateRangeBoundaries) {
    void it(`classifies address ${address}`, () => {
      assert.equal(clientIpFromHeaders(new Headers({ 'x-real-ip': address }), 'x-real-ip'), expected);
    });
  }
});
