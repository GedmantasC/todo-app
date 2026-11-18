/**
 * The app's rules, as pure functions.
 *
 * Nothing in this file touches the DOM, localStorage or the clock directly:
 * every function takes a list and returns a new one. That is what makes the
 * rules easy to test (tests/unit/todos.test.ts) and safe to change.
 */
import type { Filter, Todo } from "./types";

export const MAX_TEXT_LENGTH = 200;

export function makeId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/** Trim the text and cap its length. Returns "" for text that is only spaces. */
export function cleanText(text: string): string {
  return text.trim().replace(/\s+/g, " ").slice(0, MAX_TEXT_LENGTH);
}

export function addTodo(
  todos: readonly Todo[],
  text: string,
  { id = makeId(), now = Date.now() }: { id?: string; now?: number } = {},
): Todo[] {
  const clean = cleanText(text);
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
