# The Best App

A small to-do app, built in the first sprints of the BAI programme and then organised the way
a real project is.

## Run it

```bash
npm install
npm run dev     # creates local.db and opens http://localhost:3000
```

`npm test` runs the tests.

## What's where

```
todo-app/
├── src/
│   ├── app/                  the pages: layout.tsx, page.tsx, globals.css
│   ├── features/
│   │   ├── todos/
│   │   │   ├── components/   the React UI
│   │   │   ├── actions.ts    add, tick, delete (runs on the server)
│   │   │   ├── queries.ts    read the tasks
│   │   │   └── rules.ts      filter and count, plain functions
│   │   └── theme/            light and dark mode
│   └── db/                   the database table and connection
├── drizzle/                  database migrations
├── tests/                    tests for rules.ts
├── .claude/                  Claude Code: permissions, add-feature skill, reviewer agent
├── .vscode/                  shared editor settings
├── .github/workflows/        CI: tests and build on every push
├── AGENTS.md                 instructions for AI agents (CLAUDE.md points here)
└── .env.example              settings you can change
```

The older versions are git tags: `v1-before-reorg` (3 plain files) and `v2-vite`.
