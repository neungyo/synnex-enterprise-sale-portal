# SYNNEX Enterprise Sales Portal

Executive-focused sales operations workspace built with Next.js, TypeScript and Tailwind CSS. All visible records and financial values are sample data only.

## Run locally

1. Copy `.env.example` to `.env.local` and add your Supabase public URL and anonymous key.
2. Run `npm install`, then `npm run dev`.
3. Open `http://localhost:3000`.

## Supabase setup

Create a Supabase project, then apply `supabase/migrations/202609290001_initial_schema.sql` in its SQL editor or with the Supabase CLI. Apply `supabase/seed.sql` only to a non-production database. Create a private `documents` Storage bucket before enabling document uploads.

## Quality checks

Run `npm run lint` and `npm run build`. The starter is deliberately data-provider agnostic at the UI boundary; wire server-side queries and mutations after adding Supabase credentials.

See [PROJECT_SPEC.md](PROJECT_SPEC.md) for requirements and [AGENTS.md](AGENTS.md) for contribution guidance.
