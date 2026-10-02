import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { candidates } from '../app/blogi/eurovaalit/candidates.ts';
import {
  normalizeStoredRanking,
  presidentialCandidates,
  validateRankingSubmission,
  validCommentPage,
  validVote,
} from '../lib/submissionValidation.ts';

const ranking = candidates.map(({ name }) => name);

void describe('submission validation', () => {
  void it('accepts nonempty partial and complete presidential rankings', () => {
    assert.equal(validVote(['Li Andersson']), true);
    assert.equal(validVote(presidentialCandidates.map(({ name }) => name)), true);
  });

  for (const invalid of [null, {}, [], [''], ['Unknown'], ['Li Andersson', 'Li Andersson'], ['Li Andersson', 2]]) {
    void it(`rejects invalid presidential ranking ${JSON.stringify(invalid)}`, () => {
      assert.equal(validVote(invalid), false);
    });
  }

  void it('requires the complete unique European candidate list and trims the name', () => {
    assert.deepEqual(validateRankingSubmission({ ranking, name: '  Visa  ' }), { ranking, name: 'Visa' });
    assert.equal(validateRankingSubmission({ ranking: ranking.slice(1), name: 'Visa' }), undefined);
    assert.equal(validateRankingSubmission({ ranking: [...ranking.slice(1), ranking[1]], name: 'Visa' }), undefined);
    assert.equal(validateRankingSubmission({ ranking: [...ranking, ranking[0]], name: 'Visa' }), undefined);
    assert.equal(validateRankingSubmission({ ranking: [...ranking.slice(1), 'Unknown'], name: 'Visa' }), undefined);
  });

  void it('rejects missing, blank, and oversized names', () => {
    for (const name of [undefined, null, 1, '', '  ', 'x'.repeat(81)]) {
      assert.equal(validateRankingSubmission({ ranking, name }), undefined);
    }
    assert.ok(validateRankingSubmission({ ranking, name: 'x'.repeat(80) }));
  });

  void it('accepts comments only for existing pages', () => {
    assert.equal(validCommentPage('/'), true);
    assert.equal(validCommentPage('/blogi/stv'), true);
    assert.equal(validCommentPage('/blogi/eurovaalit/results'), true);
    for (const path of ['/blogi', '/blogi/nonexistent', '/blogi/../api/votes', '/blogi/stv?x=1', null]) {
      assert.equal(validCommentPage(path), false);
    }
  });

  void it('normalizes legacy text and JSON arrays without crashing on corrupt rows', () => {
    const input = [ranking[0], '', ranking[1], ranking[0], 'Unknown', null];
    assert.deepEqual(normalizeStoredRanking(input), ranking.slice(0, 2));
    assert.deepEqual(normalizeStoredRanking(JSON.stringify(input)), ranking.slice(0, 2));
    for (const corrupt of [null, {}, 'not JSON', '{}']) assert.deepEqual(normalizeStoredRanking(corrupt), []);
  });
});
