/** One task in the list. Stored as JSON, so only plain data lives here. */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  /** Milliseconds since the epoch. Older saved data has none; storage fills it in. */
  createdAt: number;
}

/** Which tasks the list shows. */
export type Filter = "all" | "active" | "completed";

export const FILTERS: readonly Filter[] = ["all", "active", "completed"];
