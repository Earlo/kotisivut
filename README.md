# visapollari.fi

The source for [visapollari.fi](https://visapollari.fi), Visa Pollari's Finnish-language personal website. It contains the main profile, articles, election material, and interactive voting and budget tools.

## Technology

- Next.js App Router and React
- TypeScript
- Tailwind CSS
- Supabase for database-backed features

## Local development

Requirements:

- Node.js 24 (see `.node-version`)
- npm 11.19.0 or newer within the npm 11 release line

Install the locked dependencies and start the development server:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Most content works without database credentials, but the database-backed API routes require the environment variables below.

## Environment variables

Copy `.env.example` to `.env.local` and provide:

| Variable       | Purpose                                             |
| -------------- | --------------------------------------------------- |
| `SUPABASE_URL` | Supabase project URL used by the server-side client |
| `SUPABASE_KEY` | Supabase key used by the server-side client         |

Do not commit real credentials or expose the key through a `NEXT_PUBLIC_` variable.

## Scripts

| Command                | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the local development server              |
| `npm run build`        | Create a production build                       |
| `npm start`            | Run the production server after a build         |
| `npm run format`       | Format the repository with Prettier             |
| `npm run format:check` | Check formatting without changing files         |
| `npm run lint`         | Run Oxlint and reject warnings                  |
| `npm run lint:fix`     | Apply safe lint fixes                           |
| `npm test`             | Run the Node.js test suite                      |
| `npm run typecheck`    | Generate Next.js route types and run TypeScript |
| `npm run check`        | Check formatting, lint, types, and tests        |

Before opening a pull request, run:

```bash
npm run check
npm run build
```

The same commands run in GitHub Actions for every pull request and every push to `main`.

## Project structure

- `app/` contains App Router pages, metadata, and route handlers.
- `components/` contains shared UI and interactive features.
- `lib/` contains data access, schemas, and other server-side utilities.
- `public/` contains static images and public files.
- `styles/` contains the global Tailwind stylesheet.

## Deployment

The application can be deployed to any Node.js platform that supports Next.js. Install with `npm ci`, build with `npm run build`, and start with `npm start`. Configure `SUPABASE_URL` and `SUPABASE_KEY` in the deployment environment for database-backed routes.
