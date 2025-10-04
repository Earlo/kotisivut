//components/generic/footer/Footer.tsx
import IconLink from './IconLink';

export default function Footer() {
  return (
    <footer className="mt-0 flex w-full flex-row items-center justify-around bg-black py-10">
      <IconLink href="https://twitter.com/VisaPollari" name="Twitter" />
      <IconLink href="https://www.linkedin.com/in/visapollari" name="LinkedIn" />
      <IconLink href="https://github.com/Earlo" name="GitHub" />
      <IconLink href="https://bsky.app/profile/visapollari.bsky.social" name="Bluesky" />
      <IconLink href="https://www.threads.net/@visapollari" name="Threads" />
      <IconLink href="https://suomi.social/@visapollari" name="Mastodon" />
      <IconLink href="https://t.me/visapollari" name="Telegram" />
    </footer>
  );
}
