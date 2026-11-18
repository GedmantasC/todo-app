import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  { ignores: [".next", "next-env.d.ts", "coverage", "playwright-report", "test-results", "drizzle"] },
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // User text is rendered by React, which escapes it. This is the one way around that.
      "react/no-danger": "error",
    },
  },
  {
    // The boundary that keeps the layers apart (docs/architecture.md):
    // UI code may not reach the database directly; it goes through Server Actions.
    files: ["src/**/components/**", "src/app/**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/db/*", "**/server/repository"],
              message: "Go through a Server Action or a query in server/.",
            },
          ],
        },
      ],
    },
  },
];

export default config;
