import { defineConfig } from "drizzle-kit";

// Used by `npm run db:generate` (write a migration from src/db/schema.ts)
// and `npm run db:migrate` (apply migrations to DATABASE_URL).
export default defineConfig({
  dialect: "turso",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "file:local.db",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
});
