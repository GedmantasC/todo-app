import "server-only";
import { asc, eq, not } from "drizzle-orm";
import type { Db } from "@/db/client";
import { todos as table, type TodoRow } from "@/db/schema";
import { cleanText } from "../domain/rules";
import type { Todo } from "../domain/types";

/**
 * Every database query for tasks, in one place. Server Actions and pages call these
 * functions; nothing else imports the table. The database is passed in, so tests run
 * the real queries against an in-memory database (tests/unit/repository.test.ts).
 */
export function createTodoRepository(db: Db) {
  return {
    async list(): Promise<Todo[]> {
      const rows = await db.select().from(table).orderBy(asc(table.createdAt));
      return rows.map(toTodo);
    },

    async add(text: string, { id = crypto.randomUUID(), now = new Date() } = {}): Promise<Todo> {
      const [row] = await db
        .insert(table)
        .values({ id, text: cleanText(text), createdAt: now })
        .returning();
      return toTodo(row!);
    },

    async toggle(id: string): Promise<void> {
      await db
        .update(table)
        .set({ completed: not(table.completed) })
        .where(eq(table.id, id));
    },

    async remove(id: string): Promise<void> {
      await db.delete(table).where(eq(table.id, id));
    },

    async clearCompleted(): Promise<void> {
      await db.delete(table).where(eq(table.completed, true));
    },
  };
}

export type TodoRepository = ReturnType<typeof createTodoRepository>;

/** Database rows become plain objects: a Date can't be a React key or JSON, a number can. */
function toTodo(row: TodoRow): Todo {
  return { id: row.id, text: row.text, completed: row.completed, createdAt: row.createdAt.getTime() };
}
