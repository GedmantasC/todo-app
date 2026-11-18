/**
 * Saving and loading tasks. The rest of the app only knows the TodoStore
 * interface, so swapping localStorage for a server later touches this folder only
 * (see docs/decisions/0002-storage-behind-an-interface.md).
 */
import type { Todo } from "../core/types";

export interface TodoStore {
  load(): Todo[];
  save(todos: readonly Todo[]): void;
}

/** The key v1 of the app used. Keeping it means existing users keep their tasks. */
export const STORAGE_KEY = "todos";

export function createLocalStorageStore(
  storage: Storage = window.localStorage,
  key: string = STORAGE_KEY,
): TodoStore {
  return {
    load() {
      try {
        const raw = storage.getItem(key);
        if (!raw) return [];
        const data: unknown = JSON.parse(raw);
        return Array.isArray(data) ? data.flatMap(toTodo) : [];
      } catch {
        // Corrupt data or storage blocked (private mode): start empty rather than crash.
        return [];
      }
    },
    save(todos) {
      try {
        storage.setItem(key, JSON.stringify(todos));
      } catch {
        // Storage full or blocked: the app keeps working for this session.
      }
    },
  };
}

/** Accept only well-formed items; fill in fields that v1 did not store. */
function toTodo(item: unknown): Todo[] {
  if (typeof item !== "object" || item === null) return [];
  const { id, text, completed, createdAt } = item as Record<string, unknown>;
  if (typeof id !== "string" || typeof text !== "string") return [];
  return [
    {
      id,
      text,
      completed: completed === true,
      createdAt: typeof createdAt === "number" ? createdAt : 0,
    },
  ];
}
