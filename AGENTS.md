# The Best App: instructions for AI agents

A to-do app in Next.js, React and TypeScript, with a SQLite database through Drizzle.
Claude Code, Codex, Copilot and other agents read this file before they work here.

## Commands

- `npm run dev`: start the app on http://localhost:3000
- `npm test`: run the tests. Run them before you say a change is done.
- `npm run db:generate`: write a migration after changing `src/db/schema.ts`

## Where things go

- `src/app/`: pages only. Keep them short: load data, show a feature.
- `src/features/<feature>/`: everything for one feature.
  - `components/`: the React UI
  - `actions.ts`: Server Actions, the only way the browser changes data
  - `queries.ts`: reading data for pages
  - `rules.ts`: plain functions with no React and no database, tested in `tests/`
- `src/db/`: the database table and connection.

## Rules

- Components don't talk to the database. They call Server Actions.
- Change the database only through a migration. Never edit `drizzle/` by hand.
- Never commit `.env` files.
- To add a feature, follow the `add-feature` skill. Before a pull request, ask the `reviewer` agent.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
