# 0003. No UI framework (yet)

Date: 2026-11-18 · Status: accepted

## Context

React, Vue or Svelte would be normal choices. The app has one screen, one list and a footer.

## Decision

Draw the UI with plain DOM functions in `src/ui/`, which only read state and call handlers.
The rules in `src/core/` know nothing about the UI, so a framework could replace `src/ui/`
later without touching them.

## Consequences

- Nothing to learn beyond TypeScript and the DOM; the whole app is about 4 KB of JavaScript.
- `render()` redraws the whole list on each change. Fine for hundreds of tasks; revisit if
  the list ever gets long or the UI gets several screens.
