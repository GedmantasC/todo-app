# The Best App

A small to-do app, built in the first sprints of the BAI programme for learning purposes, and
then reorganised the way a real project is: clear folders, tests, CI, and instructions that
both people and AI agents follow.

**Live:** https://gedmantasc.github.io/todo-app/ · **The original version:** tag
[`v1-before-reorg`](https://github.com/GedmantasC/todo-app/tree/v1-before-reorg)

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

In VS Code: install the recommended extensions when asked, then **F5** opens the app in Chrome
with breakpoints, and **Ctrl+Shift+B** runs every check.

## What's where

```
todo-app/
├── index.html              the page
├── src/
│   ├── main.ts             wires everything together; holds the state
│   ├── core/               what the app does: pure rules, no DOM
│   ├── storage/            where tasks are kept: behind one interface
│   ├── ui/                 how it looks: draws state, sends clicks back
│   └── styles/
├── tests/
│   ├── unit/               the rules, in milliseconds (Vitest)
│   └── e2e/                the real app in a real browser (Playwright)
├── docs/
│   ├── architecture.md     the three layers and the one rule
│   ├── decisions/          why things are the way they are
│   ├── backlog.md          known problems and ideas
│   └── workshop.md         a guided tour of this repo
├── AGENTS.md               instructions for AI agents (CLAUDE.md points here)
├── .claude/                Claude Code: permissions, a format hook, a skill, a reviewer agent
├── .vscode/                shared editor settings, tasks, debugger, extensions
├── .github/                CI, deploy to Pages, Dependabot, PR and issue templates
└── CHANGELOG.md            what changed for users
```

## Scripts

| Command                           | What it does                                            |
| --------------------------------- | ------------------------------------------------------- |
| `npm run dev`                     | Live-reloading dev server                               |
| `npm run check`                   | Typecheck, lint, format check, unit tests: what CI runs |
| `npm test` / `npm run test:watch` | Unit tests, once or on every save                       |
| `npm run test:e2e`                | Browser tests against the production build              |
| `npm run build`                   | Production files in `dist/`                             |
| `npm run format`                  | Format every file with Prettier                         |

## Contributing

One feature per branch and pull request. The steps are in
[`.claude/skills/add-feature/SKILL.md`](.claude/skills/add-feature/SKILL.md), and they work the
same whether you or an agent does the work. CI must be green before merging.
