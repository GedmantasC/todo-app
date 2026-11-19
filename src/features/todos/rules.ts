// The app's rules as plain functions: no React, no database. Tested in tests/rules.test.ts.
import type { Todo } from "@/db/schema";

export const MAX_TEXT_LENGTH = 200;

export type Filter = "all" | "active" | "completed";
export const FILTERS: Filter[] = ["all", "active", "completed"];

/** Anything in the URL becomes a valid filter. Unknown values mean "all". */
export function parseFilter(value: string | undefined): Filter {
  return FILTERS.includes(value as Filter) ? (value as Filter) : "all";
}

/** Trim the text and collapse inner spaces. */
export function cleanText(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

export function filterTodos(todos: Todo[], filter: Filter): Todo[] {
  if (filter === "active") return todos.filter((t) => !t.completed);
  if (filter === "completed") return todos.filter((t) => t.completed);
  return todos;
}

export function countActive(todos: Todo[]): number {
  return todos.filter((t) => !t.completed).length;
}
