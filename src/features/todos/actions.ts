"use server";

// Server Actions: the browser calls these like functions, but they run on the server.
// Anyone can call them, so check what comes in.
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { todos } from "@/db/schema";
import { cleanText, MAX_TEXT_LENGTH } from "./rules";

export async function addTodo(formData: FormData) {
  const text = cleanText(String(formData.get("text") ?? ""));
  if (!text || text.length > MAX_TEXT_LENGTH) return;
  await db.insert(todos).values({ id: crypto.randomUUID(), text, createdAt: new Date() });
  revalidatePath("/");
}

export async function toggleTodo(id: string) {
  await db.update(todos).set({ completed: not(todos.completed) }).where(eq(todos.id, id));
  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath("/");
}

export async function clearCompleted() {
  await db.delete(todos).where(eq(todos.completed, true));
  revalidatePath("/");
}
