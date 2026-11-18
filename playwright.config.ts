import { defineConfig, devices } from "@playwright/test";

// Browser tests run against a production build with their own database file,
// so they never touch your local tasks.
const env = { DATABASE_URL: "file:e2e.db" };

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  workers: 1,
  use: { baseURL: "http://localhost:3100" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command:
      "node -e \"require('fs').rmSync('e2e.db',{force:true})\" && npm run db:migrate && npm run build && npm run start -- --port 3100",
    url: "http://localhost:3100",
    env,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
