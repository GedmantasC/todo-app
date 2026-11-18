# Workshop: organising a project

A guided tour of this repo, in the order that matters when you start a new project. Each stop
says what to show, a live demo, and the one idea to take away. About 75 minutes.

## 0. One app, three stages (5 min)

```bash
git switch --detach v1-before-reorg   # 3 files in one folder
git switch --detach v2-vite           # layers, tests, tooling
git switch main                       # Next.js, feature folders, a database
```

On GitHub: compare `v1-before-reorg...v2-vite` and `v2-vite...main`. Ask: which would you hand
to a new colleague, or to an AI agent? And which stage is your current project at?

**Idea:** a project's structure should grow with it. Don't start at stage 3, but don't stay at
stage 1 once a second person (or an agent) works on it.

## 1. The files nobody runs (8 min)

`README.md`, `AGENTS.md` (+ `CLAUDE.md`, one line), `.gitignore`, `.editorconfig`,
`.gitattributes`, `.nvmrc`, `.env.example`.

- README: "how do I run it, and what's where?" in under a minute.
- AGENTS.md: the same for agents: commands, where things go, hard rules.
- `.gitignore` before the first commit: `node_modules/`, `.next/`, `.env*`, `*.db` never enter
  history. `.env.example` documents every variable without any secret.

**Demo:** in Claude Code, ask "where would a due-date feature go?" and watch it answer from
AGENTS.md without searching.

## 2. Feature folders, thin routes (12 min)

Open `docs/architecture.md`, then `src/`. Walk `src/app/page.tsx` (16 lines) into
`src/features/todos/`.

- `app/` holds routes only. Everything for "todos" is in one folder.
- `domain/`: types, Zod schemas and rules. No React, no database. The same `toggleTodo` runs on
  the server and in the optimistic UI. It came over unchanged from v2.
- `server/`: one repository holds every query; Server Actions are the only way in.
- `components/`: only `TodoApp` and its children are client components.

**Demo:** add `import { db } from "@/db/client"` to `TodoItem.tsx` and watch ESLint refuse it.

**Idea:** a folder should answer "what is this for?", not "what kind of file is this?".

## 3. The server/client line (10 min)

- `import "server-only"` in every server file: a mistake becomes a build error, not a leaked secret.
- `src/env.ts`: every variable checked with Zod at startup. Delete `.env.local`'s URL and show the default.
- `actions.ts`: each Server Action is a public endpoint, so each one validates with Zod.
- The filter lives in the URL (`/?filter=active`), not in state.

**Demo:** type spaces and press Add. The message comes from the server, not the browser.

**Idea:** decide where each piece runs, on purpose, and make the boundary loud.

## 4. A database you can review (8 min)

`src/db/schema.ts` → `npm run db:generate` → `drizzle/0000_create_todos.sql`. Migrations are
code: committed, reviewed, and checked in CI ("Migrations match the schema").

**Demo:** `npm run db:studio` to browse the data. Then add a column to the schema, run
`db:generate`, and read the SQL it wrote.

**Idea:** never change a database by hand; change the schema and commit the migration.

## 5. Tests as a safety net (10 min)

- `tests/unit/rules.test.ts`: pure rules, milliseconds.
- `tests/unit/repository.test.ts`: the real queries and migrations on an in-memory database.
- `tests/e2e/`: the production build in Chrome, with its own database.

**Story to tell:** the browser test "add, complete, filter" caught a real bug while this
version was built. The form cleared itself when the server answered, wiping a task the user
had already started typing. The fix and the reason are in `TodoForm.tsx` and `TodoApp.tsx`.

**Idea:** unit tests for rules, real-database tests for queries, a few browser tests for the
paths users take.

## 6. Tools hold the rules (7 min)

`.vscode/`: format on save, recommended extensions, Ctrl+Shift+B, **F5 debugs server and
client at once** (set a breakpoint in `actions.ts` and in `TodoApp.tsx`).
`eslint.config.js`: Next's rules plus our two (no `dangerouslySetInnerHTML`, no database in
components). `tsconfig.json`: `strict`; `typedRoutes` makes a broken link a type error.

**Idea:** a rule a tool enforces is a rule nobody has to remember, human or agent.

## 7. Make the agent part of the team (10 min)

`.claude/settings.json`: allowed commands (no prompts for `npm test`), denied ones (`.env.local`,
editing `drizzle/` by hand, force push), and a hook that formats every file the agent edits.
`.claude/skills/add-feature/`: the team's way of adding a feature, step by step.
`.claude/agents/reviewer.md`: checks a change against the architecture before a PR.

**Demo:** ask Claude Code to "add a double-click to edit a task" (it's in the backlog). Watch it
follow the skill: branch, schema and test, Server Action, optimistic UI, browser test,
changelog. Then run the reviewer on its branch.

**Idea:** what you'd tell a new colleague, write down once; the agent reads it every time.

## 8. Memory and automation (5 min)

`docs/decisions/` (0001 to 0003 are marked "replaced": the history of the thinking stays),
`docs/backlog.md`, `CHANGELOG.md`. On GitHub: CI on every pull request, Dependabot's
update PRs, the PR checklist, and branch protection on `main`.

**Idea:** the repo remembers and checks, so you and the agent don't have to.

## Starting your next project: the checklist

1. `git init`, `.gitignore`, `.editorconfig`, `.env.example`, README with "run it" and "what's where".
2. `AGENTS.md` with commands, folder rules and two or three hard rules.
3. `src/app/` for routes only; `src/features/<name>/` with `domain/`, `server/`, `components/`.
4. Validate env vars and every Server Action input with Zod; `server-only` on server files.
5. Schema in code, migrations committed, a check in CI.
6. One unit test, one real-database test and one browser test before the second feature.
7. Formatter, linter, strict types; CI on pull requests; protect `main`.
8. `docs/decisions/` and `docs/backlog.md` from the first decision you make.
