# SYNNEX Enterprise Sales Portal

Executive-focused sales operations workspace built with Next.js, TypeScript and Tailwind CSS. All visible records and financial values are sample data only.

## Run locally

1. Copy `.env.example` to `.env.local` and add the Neon pooled connection string.
2. Run `npm install`, then `npm run dev`.
3. Open `http://localhost:3000`.

## Neon setup

In the Neon SQL Editor, run `db/migrations/001_initial_schema.sql`. Run `db/seed.sql` only on a development branch. The application will use an external object-storage provider for document files; Neon retains document metadata only.

## Quality checks

Run `npm run lint` and `npm run build`. Wire server-side queries and mutations after adding the Neon connection string and chosen authentication provider.

See [PROJECT_SPEC.md](PROJECT_SPEC.md) for requirements and [AGENTS.md](AGENTS.md) for contribution guidance.
