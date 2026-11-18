import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * The database tables. Change this file, then run `npm run db:generate` to write a
 * migration into drizzle/, and commit both. Never edit the database by hand.
 */
export const todos = sqliteTable("todos", {
  id: text("id").primaryKey(),
  text: text("text").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export type TodoRow = typeof todos.$inferSelect;
