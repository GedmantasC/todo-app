import "server-only";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "@/env";
import * as schema from "./schema";

export function createDb(url: string, authToken?: string) {
  return drizzle(createClient({ url, authToken }), { schema });
}

export type Db = ReturnType<typeof createDb>;

/** The app's one database connection. Tests make their own with createDb(":memory:"). */
export const db = createDb(env.DATABASE_URL, env.DATABASE_AUTH_TOKEN);
