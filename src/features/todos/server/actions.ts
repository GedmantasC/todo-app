"use server";

/**
 * Server Actions: the only way the browser changes tasks. Each one checks its input with
 * the domain's Zod schema, writes through the repository, and refreshes the page data.
 * Never trust what the client sends: a Server Action is a public endpoint.
 */
import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { newTodoSchema, todoIdSchema } from "../domain/types";
import { createTodoRepository } from "./repository";

const repo = createTodoRepository(db);

export type AddTodoResult = { error?: string; ok?: boolean };

export async function addTodoAction(formData: FormData): Promise<AddTodoResult> {
  const parsed = newTodoSchema.safeParse({ text: formData.get("text") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "That task can't be saved." };
  }
  await repo.add(parsed.data.text, { id: idFrom(formData) });
  revalidatePath("/");
  return { ok: true };
}

export async function toggleTodoAction(id: string): Promise<void> {
  await repo.toggle(todoIdSchema.parse(id));
  revalidatePath("/");
}

export async function deleteTodoAction(id: string): Promise<void> {
  await repo.remove(todoIdSchema.parse(id));
  revalidatePath("/");
}

export async function clearCompletedAction(): Promise<void> {
  await repo.clearCompleted();
  revalidatePath("/");
}

/** The client picks the id, so its optimistic item and the saved one match. */
function idFrom(formData: FormData): string | undefined {
  const parsed = todoIdSchema.safeParse(formData.get("id"));
  return parsed.success ? parsed.data : undefined;
}
