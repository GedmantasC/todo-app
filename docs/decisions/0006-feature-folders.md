# 0006. Feature folders, thin routes

Date: 2026-11-18 · Status: accepted

## Context

Next.js lets you put anything inside `app/`. Projects that do end up with database calls in
page files, components that query directly, and logic spread across `components/`, `lib/` and
`utils/`.

## Decision

`src/app/` holds routes only. Everything else for a feature lives in
`src/features/<feature>/` with `domain/`, `server/` and `components/`. Components reach data
only through Server Actions and `server/queries.ts`; ESLint blocks direct database imports.

## Consequences

- A new teammate or agent finds everything for "todos" in one folder.
- A second feature (projects, tags, users) is a second folder with the same shape.
- A little more structure than a tiny app strictly needs. That is the point of this repo.
