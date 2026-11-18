# 0005. Drizzle with SQLite locally and Turso in production

Date: 2026-11-18 · Status: accepted · Replaces 0002

## Context

We need a database that costs nothing to start, runs on a laptop without Docker, and works in
production. We want typed queries and migrations in git.

## Decision

Drizzle ORM over libSQL. Locally `DATABASE_URL=file:local.db` (a SQLite file); in production a
Turso URL and token. The schema lives in `src/db/schema.ts`; `drizzle-kit` generates SQL
migrations into `drizzle/`, which are committed and reviewed like code. All queries live in
`features/<feature>/server/repository.ts`, which takes the database as a parameter.

## Consequences

- `npm run dev` creates and migrates the local database: no setup for a new teammate.
- Tests run the real queries and real migrations on an in-memory database.
- Moving to Postgres later means a new schema dialect and client in `src/db/`; the repository
  functions keep their shape.
- CI checks that the committed migrations match the schema.
- v2's localStorage tasks are not imported; for a demo app that is acceptable.
