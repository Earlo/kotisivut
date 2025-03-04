'use client';
import * as cheerio from 'cheerio';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Telegram Post Component
const TelegramPost = ({ post }: { post: string }) => {
  const $ = cheerio.load(post);
  const messageText = $('.tgme_widget_message_text').last().html() || '';
  const authorName = $('.tgme_widget_message_owner_name').text();
  const messageDate = $('.tgme_widget_message_date time').attr('datetime');
  const profilePicUrl = $('.tgme_widget_message_user_photo img').attr('src');
  const embeddedPicUrl = $('.tgme_widget_message_photo_wrap')
    .css('background-image')
    ?.replace(/url\((['"])?(.*?)\1\)/gi, '$2')
    .split(',')[0];
  const viewCount = $('.tgme_widget_message_views').text();
  const linkPreview = $('.tgme_widget_message_link_preview').attr('href');
  const previewTitle = $('.link_preview_site_name').text();
  const previewDescription = $('.link_preview_description').text();
  const linkPreviewRightImage = $('.link_preview_right_image')
    .css('background-image')
    ?.replace(/url\((['"])?(.*?)\1\)/gi, '$2')
    .split(',')[0];

  return (
    <div className="mb-4 w-full max-w-80 break-words rounded-sm bg-gray-100 px-4 py-2 shadow-sm">
      <div className="flex items-center">
        {profilePicUrl && (
          <Image
            className="rounded-full"
            src={profilePicUrl}
            alt={authorName}
            width={32}
            height={32}
          />
        )}
        <p className="font-bold">{authorName}</p>
      </div>
      <p dangerouslySetInnerHTML={{ __html: messageText }} />
      {embeddedPicUrl && (
        <Image
          className="mt-2 rounded-sm"
          src={embeddedPicUrl}
          alt=""
          layout="responsive"
          width={500}
          height={300}
        />
      )}
      {linkPreview && (
        <a
          href={linkPreview}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center break-words rounded-sm border bg-blue-50 p-2 transition-colors duration-200 hover:bg-blue-100"
        >
          {linkPreviewRightImage && (
            <div className="mr-2">
              <Image
                className="rounded-sm"
                src={linkPreviewRightImage}
                alt={previewTitle}
                layout="responsive"
                width={100}
                height={100}
              />
            </div>
          )}

          <div className="mr-2">
            <p className="font-bold text-blue-600">{previewTitle}</p>
            <p className="text-blue-800">{previewDescription}</p>
          </div>
        </a>
      )}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {new Date(messageDate!).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">Views: {viewCount}</p>
      </div>
    </div>
  );
};

// Telegram Component
export const Telegram = () => {
  const [tgPosts, setTgPosts] = useState<string[]>([]);
  useEffect(() => {
    fetch('/api/telegram')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // Reverse the array and take the first 5 posts
        const latestPosts = data.reverse().slice(0, 5);
        setTgPosts(latestPosts);
      });
  }, []);
  return (
    <section className="flex w-full flex-col items-center p-4 md:p-10">
      <h2 className="mb-4 text-2xl font-bold">Latest Telegram Posts</h2>
      {tgPosts.map((post, index) => (
        <TelegramPost key={index} post={post} />
      ))}
    </section>
  );
};
