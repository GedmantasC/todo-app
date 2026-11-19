import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

// The database is a local file, local.db. Set DATABASE_URL in .env.local to use another one.
export const db = drizzle(createClient({ url: process.env.DATABASE_URL ?? "file:local.db" }));
