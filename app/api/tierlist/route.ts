import { getRankingGuesses } from '@/lib/rankings';
import { readBoundedJson, SubmissionError } from '@/lib/request';
import { enforceSubmissionLimit } from '@/lib/submissionLimit';
import { noStoreJson, submissionFailure } from '@/lib/submissionResponse';
import { validateRankingSubmission } from '@/lib/submissionValidation';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const ip = enforceSubmissionLimit(request.headers, 'tierlist');
    const body = validateRankingSubmission(await readBoundedJson(request, 8192));
    if (!body) {
      throw new SubmissionError(400, 'INVALID_BODY', 'Aseta 1–80 merkin nimi ja valitse kaikki ehdokkaat kerran.');
    }
    const { error } = await supabase()
      .from('rankings')
      .insert([{ ...(ip ? { ip } : {}), ranking: body.ranking, made_by: body.name }]);
    if (error) throw error;

    return noStoreJson({ ok: true }, 201);
  } catch (error) {
    return submissionFailure(error, 'Unable to save ranking', 'Veikkauksen lähettäminen epäonnistui.');
  }
}

export async function GET() {
  try {
    const data = await getRankingGuesses();

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' },
    });
  } catch (error) {
    return submissionFailure(error, 'Unable to load rankings', 'Veikkausten lataaminen epäonnistui.');
  }
}
