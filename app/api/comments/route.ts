import { readBoundedJson, SubmissionError } from '@/lib/request';
import { enforceSubmissionLimit } from '@/lib/submissionLimit';
import { noStoreJson, submissionFailure } from '@/lib/submissionResponse';
import { isRecord, validCommentPage } from '@/lib/submissionValidation';
import { supabase } from '@/lib/supabase';

const AUTHOR_MAX_LENGTH = 80;
const BODY_MAX_LENGTH = 2000;

function cleanText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function GET(request: Request) {
  const page = new URL(request.url).searchParams.get('page');
  if (!validCommentPage(page)) return noStoreJson({ message: 'Virheellinen sivu.' }, 400);

  try {
    const { data, error } = await supabase()
      .from('comments')
      .select('id, author, body, created_at')
      .eq('page_path', page)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return noStoreJson(data ?? []);
  } catch (error) {
    return submissionFailure(error, 'Unable to load comments', 'Kommenttien lataaminen epäonnistui.');
  }
}

export async function POST(request: Request) {
  try {
    enforceSubmissionLimit(request.headers, 'comments');
    const input = await readBoundedJson(request, 16384);
    if (!isRecord(input)) throw new SubmissionError(400, 'INVALID_BODY', 'Virheellinen pyyntö.');
    const page = input.page;
    const author = cleanText(input.author);
    const body = cleanText(input.body);
    if (!validCommentPage(page)) throw new SubmissionError(400, 'INVALID_PAGE', 'Virheellinen sivu.');
    if (author.length < 2 || author.length > AUTHOR_MAX_LENGTH) {
      throw new SubmissionError(400, 'INVALID_AUTHOR', 'Nimen pitää olla 2–80 merkkiä.');
    }
    if (body.length < 2 || body.length > BODY_MAX_LENGTH) {
      throw new SubmissionError(400, 'INVALID_COMMENT', 'Kommentin pitää olla 2–2000 merkkiä.');
    }
    // Silently accept bot submissions caught by the honeypot without storing them.
    if (cleanText(input.website)) {
      return noStoreJson({ id: crypto.randomUUID(), author, body, created_at: new Date().toISOString() });
    }

    const { data, error } = await supabase()
      .from('comments')
      .insert({ page_path: page, author, body })
      .select('id, author, body, created_at')
      .single();

    if (error) throw error;
    return noStoreJson(data, 201);
  } catch (error) {
    return submissionFailure(error, 'Unable to save comment', 'Kommentin lähettäminen epäonnistui.');
  }
}
