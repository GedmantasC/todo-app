// Reading data for pages. Runs on the server only.
import { asc } from "drizzle-orm";
import { db } from "@/db/client";
import { todos } from "@/db/schema";

export function getTodos() {
  return db.select().from(todos).orderBy(asc(todos.createdAt));
}
