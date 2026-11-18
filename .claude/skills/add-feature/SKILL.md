---
name: add-feature
description: Add a feature to The Best App the way this project does it. Use when asked to add or change what the app does (a new action, filter, field or setting).
---

# Add a feature

Work in this order. Each step is small and checkable before the next.

1. **Branch.** `git switch -c feature/<short-name>` from an up-to-date `main`.
2. **Decide where it lives** (see `docs/architecture.md`). Most features touch all three layers:
   a rule in `src/core/`, maybe a storage change, then the UI.
3. **Rule first, with its test.** Write the pure function in `src/core/todos.ts` and its test in
   `tests/unit/todos.test.ts`. Run `npm test` and see it pass.
4. **Storage, only if the `Todo` shape changes.** Add the field as optional when loading, so data
   saved by older versions still loads, and add a test for the old shape.
5. **UI.** Draw it in `src/ui/`, wire it in `src/main.ts`, style it in `src/styles/main.css`.
   User text goes in with `textContent`, never `innerHTML`.
6. **Browser test** for the user's path through the feature in `tests/e2e/app.spec.ts`.
7. **Record it.** A line in `CHANGELOG.md` under "Unreleased". If you made a choice someone
   might question later, add a short decision in `docs/decisions/`.
8. **Check and open a pull request.** `npm run check` and `npm run test:e2e` must pass. The PR
   template asks what changed and how it was tested.

If a step turns up a problem outside the feature, add it to `docs/backlog.md` and carry on.
