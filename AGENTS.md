# The Best App: instructions for AI agents

A to-do app in Next.js (App Router), React 19 and TypeScript, with a SQLite database through
Drizzle. This file is read by Claude Code, Codex, Copilot and other agents before they work
here. Humans: start with `README.md`.

## Read first

- `docs/architecture.md`: the layers, the folder rules and how one click flows.
- `docs/decisions/`: why things are the way they are. Don't undo a decision without a new one.
- `docs/backlog.md`: known problems and ideas. Add to it instead of fixing things out of scope.

## Commands

| What                                           | Command                                           |
| ---------------------------------------------- | ------------------------------------------------- |
| Run the app (applies migrations first)         | `npm run dev`                                     |
| Everything CI runs                             | `npm run check` (types, lint, format, unit tests) |
| Unit tests                                     | `npm test`                                        |
| Browser tests (own database, production build) | `npm run test:e2e`                                |
| New migration after editing `src/db/schema.ts` | `npm run db:generate -- --name <what>`            |
| Look at the data                               | `npm run db:studio`                               |

Run `npm run check` before you say a change is done. If it fails, say so and show the output.

## Where things go

- `src/app/`: routes only. A `page.tsx` reads the request, loads data, renders a feature. Keep it thin.
- `src/features/<feature>/`: everything for one feature, in three folders:
  - `domain/`: types, Zod schemas and pure rules. No React, no database. Unit-tested.
  - `server/`: `repository.ts` (all queries), `queries.ts` (reads for pages), `actions.ts`
    (Server Actions: the only way the browser changes data). Server-only.
  - `components/`: React components. Client components say `"use client"` at the top.
- `src/db/`: the Drizzle schema and client. `src/env.ts`: every environment variable, checked.
- A new feature gets a new folder in `src/features/`. Shared UI goes in `src/components/` only
  when two features need it.

## Rules

- Components never import `@/db` or a repository; ESLint enforces it. They call Server Actions.
- Every Server Action validates its input with the domain's Zod schema. It is a public endpoint.
- Database changes go through a migration (`npm run db:generate`), committed with the schema.
  Never edit `drizzle/` by hand.
- No `dangerouslySetInnerHTML`. ESLint enforces it.
- New environment variables go in `src/env.ts` and `.env.example`. Never commit `.env*` files.
- One feature per branch and pull request, with a line in `CHANGELOG.md` under "Unreleased".
- To add a feature, follow the `add-feature` skill (`.claude/skills/add-feature/SKILL.md`).
