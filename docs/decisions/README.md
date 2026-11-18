# Decisions

One short file per decision that someone might question later, numbered in order. Each says
what we decided, why, and what we gave up. A later decision can replace an earlier one;
then mark the old one "Replaced by NNNN" instead of deleting it.

Template:

```markdown
# NNNN. Title in a few words

Date: YYYY-MM-DD · Status: accepted

## Context

What made us decide.

## Decision

What we do now.

## Consequences

What gets easier, what gets harder, what we gave up.
```

| #                                           | Decision                                            | Status           |
| ------------------------------------------- | --------------------------------------------------- | ---------------- |
| [0001](0001-typescript-and-vite.md)         | TypeScript and Vite instead of plain files          | replaced by 0004 |
| [0002](0002-storage-behind-an-interface.md) | Storage behind an interface, old data keeps loading | replaced by 0005 |
| [0003](0003-no-framework.md)                | No UI framework (yet)                               | replaced by 0004 |
| [0004](0004-nextjs-app-router.md)           | Next.js with the App Router                         | accepted         |
| [0005](0005-drizzle-and-sqlite.md)          | Drizzle with SQLite locally, Turso in production    | accepted         |
| [0006](0006-feature-folders.md)             | Feature folders, thin routes                        | accepted         |
