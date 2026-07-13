import { getTelegramPosts, type TelegramPost } from '@/lib/telegram';
import Image from 'next/image';

const formatter = new Intl.DateTimeFormat('fi-FI', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Europe/Helsinki',
});

function Post({ post }: { post: TelegramPost }) {
  return (
    <article className="mb-4 w-full max-w-2xl rounded-sm bg-gray-100 px-4 py-3 wrap-break-word shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        {post.profilePicUrl ? (
          <Image
            className="h-8 w-8 rounded-full object-cover"
            src={post.profilePicUrl}
            alt={post.authorName}
            width={32}
            height={32}
            unoptimized
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-300" aria-hidden />
        )}
        <p className="font-bold">{post.authorName}</p>
      </div>

      <p className="whitespace-pre-line">{post.messageText}</p>

      {post.embeddedPicUrl && (
        <Image
          className="mt-2 h-auto w-full rounded-sm"
          src={post.embeddedPicUrl}
          alt="Telegram-julkaisun kuva"
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, 800px"
          unoptimized
        />
      )}

      {post.linkPreview && (
        <a
          href={post.linkPreview}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-3 rounded-sm border bg-blue-50 p-2 transition-colors hover:bg-blue-100"
        >
          {post.linkPreviewRightImage && (
            <Image
              className="h-24 w-24 shrink-0 rounded-sm object-cover"
              src={post.linkPreviewRightImage}
              alt=""
              width={96}
              height={96}
              unoptimized
            />
          )}
          <span className="min-w-0">
            {post.previewTitle && <strong className="block text-blue-700">{post.previewTitle}</strong>}
            {post.previewDescription && (
              <span className="line-clamp-3 block text-blue-900">{post.previewDescription}</span>
            )}
          </span>
        </a>
      )}

      <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
        {post.messageDate ? (
          <a href={post.postUrl} target="_blank" rel="noopener noreferrer">
            <time dateTime={post.messageDate}>{formatter.format(new Date(post.messageDate))}</time>
          </a>
        ) : (
          <span />
        )}
        <span>{post.viewCount ? `Näytöt: ${post.viewCount}` : ''}</span>
      </div>
    </article>
  );
}

export async function Telegram() {
  let posts: TelegramPost[];

  try {
    posts = await getTelegramPosts();
  } catch {
    return null;
  }

  if (!posts.length) return null;

  return (
    <section className="flex w-full flex-col items-center p-4 md:p-10">
      <h2 className="mb-4 text-2xl font-bold">Uusimmat Telegram-julkaisut</h2>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
}

export default Telegram;
