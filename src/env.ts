import "server-only";
import { z } from "zod";

/**
 * Every environment variable the server reads, checked once at startup.
 * A missing or malformed value fails here with a clear message, not deep inside a query.
 * Copy .env.example to .env.local to change them; nothing secret is ever committed.
 */
const schema = z.object({
  // A local SQLite file by default; a Turso URL (libsql://…) in production.
  DATABASE_URL: z.string().min(1).default("file:local.db"),
  DATABASE_AUTH_TOKEN: z.string().optional(),
});

export const env = schema.parse(process.env);
