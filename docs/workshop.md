# Workshop: organising a project

A guided tour of this repo, in the order that makes the most sense when you start a new
project. Each stop says what to show and the one idea to take away. About 60 minutes.

## 0. Before and after (5 min)

Show the two versions side by side:

```bash
git switch --detach v1-before-reorg   # four files in one folder
git switch main                       # the same app, organised
```

Or compare on GitHub: `v1-before-reorg...main`. The app does almost the same thing. Ask: which
one would you rather hand to a new colleague, or to an AI agent?

**Idea:** organisation is not for the computer. It's for the next person who opens the folder,
and today that person is often an agent.

## 1. Start with the files nobody runs (10 min)

`README.md`, `AGENTS.md` (and `CLAUDE.md`, one line pointing to it), `.gitignore`,
`.editorconfig`, `.gitattributes`, `.nvmrc`.

- README answers "how do I run it, and what's where?" in under a minute.
- AGENTS.md is the same for agents: commands, where things go, rules. Show that Claude Code
  reads it automatically, then ask it "where would a due-date feature go?"
- `.gitignore` before the first commit: `node_modules/`, `dist/`, `.env` never enter history.

**Idea:** write these first, on day one, while they are short.

## 2. Folders by responsibility (10 min)

Open `docs/architecture.md`, then `src/`. Compare `src/core/todos.ts` with the old `app.js`.

- `core/` has no DOM and no storage, so it is tested in milliseconds.
- `storage/` hides `localStorage` behind an interface; old saved data still loads.
- `ui/` only draws. `main.ts` is the only place that holds state.

**Idea:** a folder should answer "what is this for?", not "what type of file is this?".

## 3. Let tools hold the rules (10 min)

`.vscode/` (format on save, recommended extensions, Ctrl+Shift+B, F5), `eslint.config.js`
(the `innerHTML` rule), `tsconfig.json` (`strict`), `.prettierrc.json`.

Live demo: type `list.innerHTML = text` in `src/ui/render.ts` and watch the red underline.

**Idea:** a rule a tool enforces is a rule nobody has to remember, human or agent.

## 4. Tests as a safety net (8 min)

Run `npm run test:watch` in one terminal and break `toggleTodo` on purpose. Then run
`npm run test:e2e` and show the "user text is shown as text" test.

**Idea:** unit tests for rules, a few browser tests for the paths users take.

## 5. Make the agent part of the team (10 min)

`.claude/settings.json`: allowed commands (no prompts for `npm test`), denied ones
(`.env`, force push), and a hook that formats every file the agent edits.
`.claude/skills/add-feature/`: the team's way of adding a feature, as steps.
`.claude/agents/reviewer.md`: a reviewer that checks a change against the architecture.

Live demo: ask Claude Code to "add a double-click to edit a task" (it's in the backlog) and
watch it follow the skill: branch, rule plus test, UI, changelog.

**Idea:** what you would tell a new colleague, write down once; the agent reads it every time.

## 6. Memory outside your head (5 min)

`docs/decisions/` (why), `docs/backlog.md` (later), `CHANGELOG.md` (what changed for users).

**Idea:** the repo remembers, so you and the agent don't have to.

## 7. GitHub does the boring checks (5 min)

`.github/workflows/ci.yml` runs every check on each pull request; `deploy.yml` publishes to
Pages after CI passes; Dependabot opens update pull requests; the PR template is the checklist.

**Idea:** protect `main` (Settings > Branches: require the CI check), and "it works on my
machine" stops being an argument.

## Starting your next project: the checklist

1. `git init`, `.gitignore`, `.editorconfig`, README with "run it" and "what's where".
2. `AGENTS.md` with commands, folder rules and two or three hard rules.
3. Formatter, linter and strict types, set to run on save.
4. Folders by responsibility; keep the rules free of DOM and storage.
5. One unit test and one browser test before the second feature.
6. CI on pull requests; protect `main`.
7. `docs/decisions/` and `docs/backlog.md` from the first decision you make.
