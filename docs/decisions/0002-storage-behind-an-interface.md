# 0002. Storage behind an interface, old data keeps loading

Date: 2026-11-18 · Status: replaced by 0005

## Context

v1 read and wrote `localStorage` from everywhere in `app.js`. People already have tasks saved
under the key `todos`, without a `createdAt` field.

## Decision

All saving and loading goes through the `TodoStore` interface in `src/storage/`. The
localStorage store keeps the key `todos`, checks every item it loads, and fills in fields that
older versions did not save. Corrupt or blocked storage gives an empty list, never a crash.

## Consequences

- Existing users keep their tasks after the upgrade (tested in `tests/unit/local-storage.test.ts`).
- A server-backed store later means one new file, not a rewrite.
- Every change to the `Todo` shape needs a matching "old data still loads" test.
