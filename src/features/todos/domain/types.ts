import { z } from "zod";
import { MAX_TEXT_LENGTH } from "./rules";

/** One task, as the UI sees it. Plain data, so it can cross from server to client. */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  /** Milliseconds since the epoch. */
  createdAt: number;
}

/** Which tasks the list shows. Lives in the URL: /?filter=active */
export type Filter = "all" | "active" | "completed";

export const FILTERS: readonly Filter[] = ["all", "active", "completed"];

/** Anything from the URL becomes a valid filter; unknown values fall back to "all". */
export function parseFilter(value: unknown): Filter {
  return FILTERS.includes(value as Filter) ? (value as Filter) : "all";
}

/**
 * What a client may send to create a task. The server checks it again, whatever
 * the browser did: the form's maxlength is a hint, this is the rule.
 */
export const newTodoSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Write something first.")
    .max(MAX_TEXT_LENGTH, `Keep it under ${MAX_TEXT_LENGTH} characters.`),
});

export const todoIdSchema = z.uuid();
