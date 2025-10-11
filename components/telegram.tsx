'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type ParsedPost = {
  authorName: string;
  messageHtml: string;
  messageDate?: string;
  profilePicUrl?: string;
  embeddedPicUrl?: string;
  viewCount?: string;
  linkPreview?: string;
  previewTitle?: string;
  previewDescription?: string;
  linkPreviewRightImage?: string;
};

function extractUrlFromStyle(style?: string | null): string | undefined {
  if (!style) return;
  const m = /background-image\s*:\s*url\((['"])?(.*?)\1\)/i.exec(style);
  const raw = m?.[2];
  if (!raw) return;
  const cleaned = raw.replace(/^['"]|['"]$/g, '').replace(/&amp;/g, '&');
  return cleaned.startsWith('//') ? `https:${cleaned}` : cleaned;
}

function parseTelegramHtml(postHtml: string): ParsedPost {
  const doc = new DOMParser().parseFromString(postHtml, 'text/html');

  const authorName = doc.querySelector('.tgme_widget_message_owner_name')?.textContent?.trim() || 'Telegram';

  const messageNode = doc.querySelector('.tgme_widget_message_text');
  const messageHtml = messageNode ? messageNode.innerHTML : '';

  const messageDate = doc.querySelector('.tgme_widget_message_date time')?.getAttribute('datetime') || undefined;

  const profilePicUrl = (doc.querySelector('.tgme_widget_message_user_photo img') as HTMLImageElement | null)?.src;

  const photoWrap =
    doc.querySelector('.tgme_widget_message_photo_wrap') ||
    doc.querySelector('.tgme_widget_message_video_thumb') ||
    doc.querySelector('.tgme_widget_message_roundvideo_thumb') ||
    doc.querySelector('.tgme_widget_message_document_thumb');

  const embeddedPicUrl = extractUrlFromStyle(photoWrap?.getAttribute('style'));

  const viewCount = doc.querySelector('.tgme_widget_message_views')?.textContent?.trim() || undefined;

  const linkPreviewAnchor = doc.querySelector(
    '.tgme_widget_message_link_preview, .tgme_widget_message_webpage',
  ) as HTMLAnchorElement | null;

  const linkPreview = linkPreviewAnchor?.href;

  const previewTitle =
    doc.querySelector('.link_preview_site_name, .webpage_site_name')?.textContent?.trim() || undefined;

  const previewDescription =
    doc.querySelector('.link_preview_description, .webpage_description')?.textContent?.trim() || undefined;

  const rightImgEl = doc.querySelector('.link_preview_right_image, .webpage_right_image') as HTMLElement | null;

  const linkPreviewRightImage = extractUrlFromStyle(rightImgEl?.getAttribute('style'));

  return {
    authorName,
    messageHtml,
    messageDate,
    profilePicUrl,
    embeddedPicUrl,
    viewCount,
    linkPreview,
    previewTitle,
    previewDescription,
    linkPreviewRightImage,
  };
}

const TelegramPost = ({ post }: { post: string }) => {
  const parsed = useMemo(() => parseTelegramHtml(post), [post]);

  return (
    <article className="mb-4 w-full max-w-2xl rounded-sm bg-gray-100 px-4 py-3 break-words shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        {parsed.profilePicUrl ? (
          <Image className="rounded-full" src={parsed.profilePicUrl} alt={parsed.authorName} width={32} height={32} />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-300" aria-hidden />
        )}
        <p className="font-bold">{parsed.authorName}</p>
      </div>

      <div className="prose prose-sm max-w-none break-words" dangerouslySetInnerHTML={{ __html: parsed.messageHtml }} />

      {parsed.embeddedPicUrl && (
        <div className="mt-2">
          <Image
            className="rounded-sm"
            src={parsed.embeddedPicUrl}
            alt=""
            width={1200}
            height={800}
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}

      {parsed.linkPreview && (
        <a
          href={parsed.linkPreview}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-3 rounded-sm border bg-blue-50 p-2 transition-colors hover:bg-blue-100"
        >
          {parsed.linkPreviewRightImage && (
            <div className="w-24 shrink-0">
              <Image
                className="rounded-sm"
                src={parsed.linkPreviewRightImage}
                alt={parsed.previewTitle || 'Linkin esikatselu'}
                width={100}
                height={100}
              />
            </div>
          )}
          <div className="min-w-0">
            {parsed.previewTitle && <p className="truncate font-bold text-blue-700">{parsed.previewTitle}</p>}
            {parsed.previewDescription && <p className="line-clamp-3 text-blue-900">{parsed.previewDescription}</p>}
          </div>
        </a>
      )}

      <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
        <time dateTime={parsed.messageDate}>
          {parsed.messageDate ? new Date(parsed.messageDate).toLocaleString() : ''}
        </time>
        <span>{parsed.viewCount ? `Näytöt: ${parsed.viewCount}` : ''}</span>
      </div>
    </article>
  );
};

export const Telegram = () => {
  const [tgPosts, setTgPosts] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/telegram')
      .then((res) => res.json())
      .then((data: string[]) => setTgPosts(data.slice(-5).reverse()))
      .catch(() => setTgPosts([]));
  }, []);

  if (!tgPosts.length) return null;

  return (
    <section className="flex w-full flex-col items-center p-4 md:p-10">
      <h2 className="mb-4 text-2xl font-bold">Latest Telegram Posts</h2>
      {tgPosts.map((post, index) => (
        <TelegramPost key={index} post={post} />
      ))}
    </section>
  );
};

export default Telegram;
