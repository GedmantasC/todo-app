# Backlog

Known problems and ideas that are out of scope for the current change. Add a line with the
date when you find one; move it to an issue when someone picks it up.

## Problems

- **2026-11-18 · `npm audit` reports a high-severity issue in `picomatch`**, a file-matching
  library that ESLint's TypeScript parser pulls in. It is a development tool only and never
  ships in `dist/`. The only fix npm offers is a forced breaking downgrade, so we wait for the
  upstream release; Dependabot will open the pull request.

## Ideas

- Edit a task's text by double-clicking it.
- Drag to reorder tasks.
- Due dates, with overdue tasks shown first (needs a `Todo` shape change: see decision 0002).
- Sync between devices (a server-backed `TodoStore`).
