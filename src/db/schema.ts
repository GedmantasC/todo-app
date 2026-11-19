import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// The todos table. After changing it, run `npm run db:generate` to write a migration into drizzle/.
export const todos = sqliteTable("todos", {
  id: text("id").primaryKey(),
  text: text("text").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export type Todo = typeof todos.$inferSelect;
