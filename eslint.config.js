import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "coverage", "playwright-report", "test-results"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // The one rule this project cares most about: user text never goes into innerHTML.
      "no-restricted-properties": [
        "error",
        { property: "innerHTML", message: "Use textContent or DOM methods: user text is not HTML." },
      ],
    },
  },
  {
    // Config files and the Claude Code hook run in Node, not the browser.
    files: ["*.config.{js,ts}", ".claude/**/*.mjs"],
    languageOptions: { globals: { process: "readonly", console: "readonly" } },
  },
);
