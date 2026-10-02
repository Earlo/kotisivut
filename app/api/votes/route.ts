import { readBoundedJson, SubmissionError } from '@/lib/request';
import { enforceSubmissionLimit } from '@/lib/submissionLimit';
import { noStoreJson, submissionFailure } from '@/lib/submissionResponse';
import { validVote } from '@/lib/submissionValidation';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const ip = enforceSubmissionLimit(request.headers, 'votes');
    const vote = await readBoundedJson(request, 2048);
    if (!validVote(vote)) {
      throw new SubmissionError(400, 'INVALID_BODY', 'Valitse 1–9 eri ehdokasta listalta.');
    }
    const { error } = await supabase()
      .from('siirtoäänet')
      .insert([{ ...(ip ? { ip } : {}), vote }]);
    if (error) throw error;

    return noStoreJson({ ok: true }, 201);
  } catch (error) {
    return submissionFailure(error, 'Unable to save vote', 'Äänen lähettäminen epäonnistui.');
  }
}
