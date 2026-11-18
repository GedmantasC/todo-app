# Architecture

A Next.js App Router app. Routes are thin; each feature owns its folder; data goes
through one repository; the browser changes data only through Server Actions.

```
 browser                               │  server
                                       │
 components/TodoApp  (client)          │  app/page.tsx            reads ?filter, loads todos
   useOptimistic ── domain/rules ──┐   │    └─ server/queries.ts  getTodos() ─┐
   click ─────────────────────────────▶│  server/actions.ts       Zod-check   │
                                       │    └─ server/repository.ts ◀─────────┘
                                       │         └─ db/ (Drizzle) ─▶ SQLite / Turso
```

## Folders

```
src/
├── app/                    routes only: layout, page, loading, error
├── features/
│   ├── todos/
│   │   ├── domain/         types, Zod schemas, pure rules       (no React, no database)
│   │   ├── server/         repository, queries, Server Actions  (server-only)
│   │   └── components/     React components                     (client where needed)
│   └── theme/              the light/dark switch
├── db/                     Drizzle schema and client
└── env.ts                  every environment variable, validated
drizzle/                    migrations, generated from src/db/schema.ts
```

**Why features, not file types?** A folder called `components/` across the whole app grows
until nobody can find anything. A feature folder holds everything one person needs to change
one thing, and deleting a feature is deleting a folder.

## The rules that keep it apart

| Rule                                                       | Enforced by                                 |
| ---------------------------------------------------------- | ------------------------------------------- |
| `domain/` imports nothing from React, Next or the database | review, and the unit tests run without them |
| Components and routes never import `@/db` or a repository  | ESLint (`no-restricted-imports`)            |
| Server code never reaches the browser bundle               | `import "server-only"` in every server file |
| Every Server Action validates its input                    | the `reviewer` agent and code review        |
| The schema and migrations match                            | CI ("Migrations match the schema")          |

## How one click flows

1. The user ticks a checkbox. `TodoApp` applies `toggleTodo` from `domain/rules.ts` to its
   optimistic copy, so the tick shows at once.
2. In the same transition it calls the Server Action `toggleTodoAction(id)`, which checks the id
   with Zod and calls `repository.toggle(id)`.
3. The action calls `revalidatePath("/")`. Next.js re-renders the page on the server with fresh
   data from `getTodos()`, and React swaps the optimistic copy for the real one.
4. If the action fails, the optimistic change disappears and the real data shows.

The filter lives in the URL (`/?filter=active`), not in state: it survives a reload, can be
shared, and the Back button works.

## Data

Locally the database is a file (`local.db`, from `DATABASE_URL`). In production it is a Turso
database: same SQLite, same queries, a different URL and a token. See decision 0005.

## Tests

| What                        | Where                           | How                                            |
| --------------------------- | ------------------------------- | ---------------------------------------------- |
| Rules and schemas           | `tests/unit/rules.test.ts`      | pure functions, milliseconds                   |
| Real queries and migrations | `tests/unit/repository.test.ts` | in-memory SQLite per test                      |
| The whole app               | `tests/e2e/`                    | Playwright on a production build, own `e2e.db` |
