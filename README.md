# The Best App

A small to-do app, built in the first sprints of the BAI programme for learning purposes, and
then grown the way a real project grows: clear folders, a database, tests, CI, and
instructions that both people and AI agents follow.

The same app at three stages, each a git tag:

| Tag                                                                              | Stack                              | What it shows                                       |
| -------------------------------------------------------------------------------- | ---------------------------------- | --------------------------------------------------- |
| [`v1-before-reorg`](https://github.com/GedmantasC/todo-app/tree/v1-before-reorg) | 3 files, plain JavaScript          | where most projects start                           |
| [`v2-vite`](https://github.com/GedmantasC/todo-app/tree/v2-vite)                 | Vite, TypeScript                   | layers, tests, tooling, agent setup                 |
| `main`                                                                           | Next.js, React 19, Drizzle, SQLite | feature folders, server and client, a real database |

## Run it

```bash
npm install
npm run dev        # creates local.db, applies migrations, opens http://localhost:3000
```

Nothing else to set up: the database is a local file. To change settings, copy `.env.example`
to `.env.local`.

In VS Code: install the recommended extensions when asked. **F5** starts the app with
breakpoints on both server and client; **Ctrl+Shift+B** runs every check.

## What's where

```
todo-app/
├── src/
│   ├── app/                    routes only: layout, page, loading, error
│   ├── features/
│   │   ├── todos/
│   │   │   ├── domain/         types, Zod schemas, pure rules
│   │   │   ├── server/         queries, repository, Server Actions
│   │   │   └── components/     the React UI
│   │   └── theme/              light and dark mode
│   ├── db/                     Drizzle schema and client
│   └── env.ts                  environment variables, validated at startup
├── drizzle/                    database migrations (generated, committed)
├── tests/
│   ├── unit/                   rules, and real queries on an in-memory database (Vitest)
│   └── e2e/                    the built app in a real browser (Playwright)
├── docs/
│   ├── architecture.md         the layers, the rules, how one click flows
│   ├── decisions/              why things are the way they are
│   ├── backlog.md              known problems and ideas
│   └── workshop.md             a guided tour of this repo
├── AGENTS.md                   instructions for AI agents (CLAUDE.md points here)
├── .claude/                    Claude Code: permissions, format hook, skill, reviewer agent
├── .vscode/                    shared settings, tasks, full-stack debugger, extensions
├── .github/                    CI, Dependabot, PR and issue templates
└── CHANGELOG.md                what changed for users
```

## Scripts

| Command                                | What it does                                                |
| -------------------------------------- | ----------------------------------------------------------- |
| `npm run dev`                          | Migrate the local database and start the dev server         |
| `npm run check`                        | Types, lint, format check, unit tests: what CI runs         |
| `npm test` / `npm run test:watch`      | Unit tests, once or on every save                           |
| `npm run test:e2e`                     | Browser tests on a production build with their own database |
| `npm run db:generate -- --name <what>` | Write a migration after changing `src/db/schema.ts`         |
| `npm run db:migrate`                   | Apply migrations to `DATABASE_URL`                          |
| `npm run db:studio`                    | Browse the data in Drizzle Studio                           |
| `npm run build` / `npm start`          | Production build and server                                 |

## Deploy

Vercel plus a free Turso database: set `DATABASE_URL` (`libsql://…`) and `DATABASE_AUTH_TOKEN`
in the Vercel project, and run `npm run db:migrate` against it once. Note that there are no
accounts yet, so everyone with the link shares one list (see `docs/backlog.md`).

## Contributing

One feature per branch and pull request. The steps are in
[`.claude/skills/add-feature/SKILL.md`](.claude/skills/add-feature/SKILL.md), and they work the
same whether you or an agent does the work. CI must be green before merging.
