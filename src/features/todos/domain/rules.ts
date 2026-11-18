/**
 * The app's rules, as pure functions.
 *
 * Nothing here touches React, the database or the clock directly: every function takes a
 * list and returns a new one. The same rules run on the server and in the browser, where
 * the optimistic UI uses them to show a change before the server confirms it.
 * Tests: tests/unit/rules.test.ts.
 */
import type { Filter, Todo } from "./types";

export const MAX_TEXT_LENGTH = 200;

/** Trim the text and collapse inner spaces. Returns "" for text that is only spaces. */
export function cleanText(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

export function addTodo(
  todos: readonly Todo[],
  text: string,
  { id = crypto.randomUUID(), now = Date.now() }: { id?: string; now?: number } = {},
): Todo[] {
  const clean = cleanText(text).slice(0, MAX_TEXT_LENGTH);
  if (!clean) return [...todos];
  return [...todos, { id, text: clean, completed: false, createdAt: now }];
}

export function toggleTodo(todos: readonly Todo[], id: string): Todo[] {
  return todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
}

export function deleteTodo(todos: readonly Todo[], id: string): Todo[] {
  return todos.filter((t) => t.id !== id);
}

export function clearCompleted(todos: readonly Todo[]): Todo[] {
  return todos.filter((t) => !t.completed);
}

export function filterTodos(todos: readonly Todo[], filter: Filter): Todo[] {
  switch (filter) {
    case "active":
      return todos.filter((t) => !t.completed);
    case "completed":
      return todos.filter((t) => t.completed);
    case "all":
      return [...todos];
  }
}

export function countActive(todos: readonly Todo[]): number {
  return todos.filter((t) => !t.completed).length;
}
