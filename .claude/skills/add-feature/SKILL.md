---
name: add-feature
description: Add a feature to The Best App the way this project does it. Use when asked to add or change what the app does (a new action, field, filter, page or setting).
---

# Add a feature

Work in this order. Each step is small and checkable before the next.

1. **Branch.** `git switch -c feature/<short-name>` from an up-to-date `main`.
2. **Decide where it lives** (`docs/architecture.md`). A change to tasks goes in
   `src/features/todos/`; a new area of the app gets its own `src/features/<name>/`.
3. **Domain first, with its test.** Types, the Zod schema for any new input, and pure rules in
   `domain/`. Tests in `tests/unit/`. Run `npm test`.
4. **Database, only if the data changes.** Edit `src/db/schema.ts`, then
   `npm run db:generate -- --name <what-changed>`. New columns need a default or must be
   nullable, so existing rows still work. Add the query to `server/repository.ts` and a test in
   `tests/unit/repository.test.ts` (it runs against an in-memory database with the real migrations).
5. **Server Action.** In `server/actions.ts`: validate with the schema, call the repository,
   `revalidatePath`. Never trust the client's input.
6. **UI.** Components in `components/`. For instant feedback, add the change to the optimistic
   reducer in `TodoApp.tsx`, reusing the domain rule. Routes in `src/app/` stay thin.
7. **Browser test** for the user's path in `tests/e2e/app.spec.ts`.
8. **Record it.** A line in `CHANGELOG.md` under "Unreleased". A short decision in
   `docs/decisions/` if you chose something someone might question.
9. **Check and open a pull request.** `npm run check` and `npm run test:e2e` must pass. Ask the
   `reviewer` agent to look first. The PR template asks what changed and how it was tested.

If a step turns up a problem outside the feature, add it to `docs/backlog.md` and carry on.
