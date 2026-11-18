# 0004. Next.js with the App Router

Date: 2026-11-18 · Status: accepted · Replaces 0001 and 0003

## Context

Tasks lived in one browser's localStorage, so they were gone on another device. Saving them on
a server needs a backend, and the team already knows Next.js from the programme.

## Decision

Rebuild on Next.js (App Router) with React 19. Pages are Server Components that load data on
the server; the browser changes data only through Server Actions; one client component holds
the interactive list.

## Consequences

- One codebase and one deploy for the page, the API and the server logic.
- The app needs a Node server (Vercel or any Node host), not static hosting like GitHub Pages.
- The pure rules from v2 (`domain/rules.ts`) carried over unchanged and now run on both sides.
- "Server" and "client" are a new line to keep in mind: see `docs/architecture.md`.
