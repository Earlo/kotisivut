type AnswerIdentity = {
  election: string;
  year: number;
  source: string;
};

// FNV-1a keeps fragment IDs short. Only the question and its election identity
// affect these links, so edits to answers or translations do not break them.
function identityHash(identity: string): string {
  let hash = 0xcbf29ce484222325n;
  for (let index = 0; index < identity.length; index += 1) {
    hash ^= BigInt(identity.charCodeAt(index));
    hash = BigInt.asUintN(64, hash * 0x100000001b3n);
  }
  return hash.toString(16).padStart(16, '0');
}

export function questionAnchorId(question: string): string {
  return `kysymys-${identityHash(question)}`;
}

export function answerAnchorId(question: string, answer: AnswerIdentity): string {
  return `vastaus-${identityHash(JSON.stringify([question, answer.election, answer.year, answer.source]))}`;
}

export function explanationAnchorId(answerId: string, language: string): string {
  return `${answerId}-${language}`;
}
