# Architecture

The app has three layers and one place that wires them together.

```
               ┌──────────────────────── src/main.ts ────────────────────────┐
  user action ─▶  core: new list  ─▶  storage: save  ─▶  ui: draw the list   │
               └──────────────────────────────────────────────────────────────┘

  src/core/      what the app does     pure functions, no DOM, no storage
  src/storage/   where tasks are kept  behind the TodoStore interface
  src/ui/        how it looks          reads state, writes DOM, never changes state
```

## The one rule

**Dependencies point inwards.** `ui/` and `storage/` may import from `core/`; `core/` imports
from nothing. That is why the rules can be tested in milliseconds without a browser
(`tests/unit/`), and why changing how tasks are saved never touches a rule.

## How one click flows

1. The user ticks a checkbox. `ui/render.ts` calls the `onToggle(id)` handler it was given.
2. `main.ts` asks `core/todos.ts` for a new list: `toggleTodo(todos, id)`.
3. `main.ts` saves it with `store.save()` and calls `render()`.
4. `render()` draws the filtered list and the footer from the new state.

State lives in exactly one place: the `todos` and `filter` variables in `main.ts`.

## Tests

| Layer         | Test                                               | Speed     |
| ------------- | -------------------------------------------------- | --------- |
| core, storage | `tests/unit/` (Vitest, jsdom)                      | about 2 s |
| the whole app | `tests/e2e/` (Playwright, on the production build) | about 6 s |

## When to change this

If the app grows a server, add `src/storage/api-store.ts` implementing `TodoStore` and pick
the store in `main.ts`. If state gets complex (undo, sync), consider a small store module
before reaching for a framework. Record either choice in `docs/decisions/`.
