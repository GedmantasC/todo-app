# 0001. TypeScript and Vite instead of plain files

Date: 2026-11-18 · Status: replaced by 0004

## Context

v1 was three files (`index.html`, `app.js`, `style.css`) opened straight in the browser. That
was the right start. As features arrived, `app.js` mixed rules, storage and drawing, and a
typo in a property name only showed up when someone clicked the right button.

## Decision

Write the app in TypeScript, split into modules, and build it with Vite. `npm run dev` gives a
live-reloading server; `npm run build` produces the plain files in `dist/` that GitHub Pages
serves.

## Consequences

- Mistakes like a wrong property name or a missing element show up in the editor and in CI.
- The app now needs `npm install` before it runs, and Node 22 or later.
- The output is still plain HTML, CSS and JavaScript: no server, no runtime cost.
