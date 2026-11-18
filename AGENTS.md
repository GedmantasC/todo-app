# The Best App: instructions for AI agents

A small to-do app in TypeScript, built with Vite. This file is read by Claude Code, Codex,
Copilot and other agents before they work here. Humans: start with `README.md`.

## Read first

- `docs/architecture.md`: the three layers and the one rule that keeps them apart.
- `docs/decisions/`: why things are the way they are. Don't undo a decision without a new one.
- `docs/backlog.md`: known problems and ideas. Add to it instead of fixing things out of scope.

## Commands

| What               | Command                                                     |
| ------------------ | ----------------------------------------------------------- |
| Run the app        | `npm run dev`                                               |
| Everything CI runs | `npm run check` (typecheck, lint, format check, unit tests) |
| Unit tests         | `npm test`                                                  |
| Browser tests      | `npm run test:e2e` (builds first)                           |
| Format             | `npm run format`                                            |

Run `npm run check` before you say a change is done. If it fails, say so and show the output.

## Where things go

- **A rule about tasks** (what adding, filtering or clearing does): `src/core/`, as a pure function,
  with a test in `tests/unit/`. No DOM, no `localStorage`, no `Date.now()` without a parameter.
- **Saving and loading:** `src/storage/`, behind the `TodoStore` interface.
- **What the user sees:** `src/ui/` and `index.html`; styles in `src/styles/main.css`.
- **Wiring:** `src/main.ts` holds the state and connects the three. Keep it short.

## Rules

- User text is never put into `innerHTML`; use `textContent`. ESLint enforces it.
- Old saved data must keep loading. If you change the `Todo` shape, handle the old shape in
  `src/storage/local-storage.ts` and add a test like "reads data saved by v1".
- One feature per branch and pull request. Add a line to `CHANGELOG.md` under "Unreleased".
- To add a feature, follow the `add-feature` skill (`.claude/skills/add-feature/SKILL.md`).
- Never commit `.env`, `node_modules/` or `dist/`.
