import { defineConfig } from "vitest/config";

export default defineConfig({
  // Relative paths, so the build works on GitHub Pages under /todo-app/.
  base: "./",
  test: {
    environment: "jsdom",
    include: ["tests/unit/**/*.test.ts"],
    coverage: { include: ["src/core/**", "src/storage/**"] },
  },
});
