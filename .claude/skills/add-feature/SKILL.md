---
name: add-feature
description: Add a feature to The Best App the way this project does it. Use when asked to add or change what the app does (a new action, field, filter, page or setting).
---

# Add a feature

Work in this order. Each step is small and can be checked before the next.

1. **Branch.** `git switch -c feature/<short-name>` from an up-to-date `main`.
2. **Decide where it lives.** A change to tasks goes in `src/features/todos/`. A new area of
   the app gets its own `src/features/<name>/`.
3. **Rules first, with a test.** Plain functions in `rules.ts`, tests in `tests/`. Run `npm test`.
4. **Database, only if the data changes.** Edit `src/db/schema.ts`, then run
   `npm run db:generate`. New columns need a default, so existing tasks still work.
5. **Server Action.** In `actions.ts`: check the input, write to the database, call
   `revalidatePath("/")`.
6. **UI.** Components in `components/`. Pages in `src/app/` stay short.
7. **Check and open a pull request.** `npm test` and `npm run build` must pass. Ask the
   `reviewer` agent to look first.
