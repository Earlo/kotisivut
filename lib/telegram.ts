export type TelegramPost = {
  id: string;
  authorName: string;
  messageText: string;
  messageDate?: string;
  postUrl: string;
  profilePicUrl?: string;
  embeddedPicUrl?: string;
  viewCount?: string;
  linkPreview?: string;
  previewTitle?: string;
  previewDescription?: string;
  linkPreviewRightImage?: string;
};

const MESSAGE_BLOCK_RE =
  /<div class="tgme_widget_message (?!wrap\b)[^"]*"[^>]*data-post="[^"]+"[\s\S]*?(?=<div class="tgme_widget_message_wrap\b|<\/section>)/g;

function capture(html: string, pattern: RegExp): string | undefined {
  return pattern.exec(html)?.[1];
}

function decodeHtml(value: string): string {
  return value
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .trim();
}

function imageFromStyle(html: string, className: string): string | undefined {
  const style = capture(
    html,
    new RegExp(`class="[^"]*${className}[^"]*"[^>]*style="[^"]*background-image:url\\(['"]?([^'")]+)`, 'i'),
  );
  return style?.startsWith('//') ? `https:${style}` : style;
}

function parseTelegramPost(block: string): TelegramPost | null {
  const id = capture(block, /data-post="([^"]+)"/);
  if (!id) return null;

  const messageHtml = capture(block, /class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ?? '';
  const authorHtml = capture(block, /class="tgme_widget_message_owner_name[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
  const profilePicUrl = capture(block, /class="tgme_widget_message_user_photo[^"]*"[\s\S]*?<img[^>]+src="([^"]+)"/i);
  const linkPreview = capture(block, /class="tgme_widget_message_link_preview[^"]*"[^>]+href="([^"]+)"/i);

  return {
    id,
    authorName: decodeHtml(authorHtml ?? 'Visa Pollari'),
    messageText: decodeHtml(messageHtml),
    messageDate: capture(block, /<time[^>]+datetime="([^"]+)"/i),
    postUrl: `https://t.me/${id}`,
    profilePicUrl,
    embeddedPicUrl: imageFromStyle(block, 'tgme_widget_message_photo_wrap'),
    viewCount: capture(block, /class="tgme_widget_message_views"[^>]*>([^<]+)</i)?.trim(),
    linkPreview,
    previewTitle: decodeHtml(
      capture(block, /class="(?:link_preview_title|webpage_title)[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ?? '',
    ),
    previewDescription: decodeHtml(
      capture(block, /class="(?:link_preview_description|webpage_description)[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ?? '',
    ),
    linkPreviewRightImage: imageFromStyle(block, '(?:link_preview_right_image|webpage_right_image)'),
  };
}

export async function getTelegramPosts(): Promise<TelegramPost[]> {
  const res = await fetch('https://t.me/s/visapollari', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; visapollari.fi/1.0)',
      Accept: 'text/html',
    },
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`Telegram returned ${res.status}`);
  }

  const blocks = (await res.text()).match(MESSAGE_BLOCK_RE) ?? [];
  return blocks
    .map(parseTelegramPost)
    .filter((post): post is TelegramPost => post !== null)
    .slice(-5)
    .reverse();
}
