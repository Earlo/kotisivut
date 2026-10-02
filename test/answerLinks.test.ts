import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import answerData from '../data/vaalikonevastaukset.json' with { type: 'json' };
import { answerAnchorId, explanationAnchorId, questionAnchorId } from '../lib/answerLinks.ts';

type QuestionGroup = {
  question: string;
  responses: {
    election: string;
    year: number;
    source: string;
    response: string;
    explanations: Partial<Record<string, string>>;
  }[];
};

const questions: QuestionGroup[] = answerData;

const links = (groups: QuestionGroup[]) =>
  groups.flatMap((group) => group.responses.map((response) => answerAnchorId(group.question, response))).toSorted();

void describe('election answer citation links', () => {
  void it('keeps every question, answer and translation fragment unique in the published data', () => {
    const ids: string[] = [];
    for (const group of questions) {
      ids.push(questionAnchorId(group.question));
      for (const answer of group.responses) {
        const answerId = answerAnchorId(group.question, answer);
        ids.push(answerId);
        for (const language of Object.keys(answer.explanations)) {
          if (answer.explanations[language]) ids.push(explanationAnchorId(answerId, language));
        }
      }
    }
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(ids.every((id) => /^[a-z0-9-]+$/.test(id)));
  });

  void it('keeps published links stable when answer wording, explanations or dataset order change', () => {
    const question = 'Työmarkkinoilla tulee edistää sopimusvapautta';
    const answer = {
      election: 'TEKin valtuustovaalit 2026',
      year: 2026,
      source: 'TEK',
      response: 'täysin samaa mieltä',
      explanations: { fi: 'Perustelu' },
    };
    const answerId = answerAnchorId(question, answer);
    assert.equal(questionAnchorId(question), 'kysymys-3bc71d6b58942f14');
    const editedAnswer = { ...answer, response: 'samaa mieltä', explanations: { fi: 'Uusi perustelu' } };
    assert.equal(answerAnchorId(question, editedAnswer), answerId);
    assert.equal(explanationAnchorId(answerId, 'fi'), `${answerId}-fi`);

    assert.deepEqual(links(questions.toReversed()), links(questions));
  });

  void it('distinguishes the same question across election, year and source identities', () => {
    const question = 'Kysymys';
    const answer = { election: 'Eduskuntavaalit', year: 2023, source: 'Yle' };
    const ids = [
      answerAnchorId(question, answer),
      answerAnchorId(question, { ...answer, election: 'Eurovaalit' }),
      answerAnchorId(question, { ...answer, year: 2024 }),
      answerAnchorId(question, { ...answer, source: 'Helsingin Sanomat' }),
      answerAnchorId('Eri kysymys', answer),
    ];
    assert.equal(new Set(ids).size, ids.length);
  });
});
