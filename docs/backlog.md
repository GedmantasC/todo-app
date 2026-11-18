# Backlog

Known problems and ideas that are out of scope for the current change. Add a line with the
date when you find one; move it to an issue when someone picks it up.

## Problems

- **2026-11-18 · `npm audit` reports a high-severity issue in `picomatch`**, a file-matching
  library pulled in by development tools (ESLint's TypeScript parser). It never ships to users.
  The only fix npm offers is a forced breaking downgrade, so we wait for the upstream release;
  Dependabot will open the pull request.
- **2026-11-18 · npm 11 held back `esbuild`'s install scripts** (`npm install-scripts ls`).
  Nothing here needs them: drizzle-kit and Vitest work without. Approve them only if a tool
  starts failing (`npm install-scripts approve esbuild`).
- **2026-11-18 · Everyone shares one list.** There are no accounts yet, so every visitor of a
  deployed app sees and edits the same tasks. Fine for a demo; see "Accounts" below before
  sharing a public link.

## Ideas

- **Accounts** (Auth.js or Clerk): a `users` table, `userId` on `todos`, and every repository
  query filtered by the signed-in user. A good second feature folder: `src/features/auth/`.
- Edit a task's text by double-clicking it.
- Drag to reorder tasks (needs a `position` column and a migration).
- Due dates, with overdue tasks first.
- Deploy: Vercel plus a free Turso database (`DATABASE_URL`, `DATABASE_AUTH_TOKEN`).
