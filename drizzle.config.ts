import { defineConfig } from "drizzle-kit";

// `npm run db:generate` writes a migration from src/db/schema.ts into drizzle/.
// `npm run db:migrate` applies the migrations to the database.
export default defineConfig({
  dialect: "turso",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL ?? "file:local.db" },
});
