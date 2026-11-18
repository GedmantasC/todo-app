import { describe, expect, it } from "vitest";
import {
  MAX_TEXT_LENGTH,
  addTodo,
  cleanText,
  clearCompleted,
  countActive,
  deleteTodo,
  filterTodos,
  toggleTodo,
} from "../../src/core/todos";
import type { Todo } from "../../src/core/types";

const todo = (id: string, completed = false): Todo => ({ id, text: `task ${id}`, completed, createdAt: 0 });

describe("addTodo", () => {
  it("adds a trimmed task at the end", () => {
    const result = addTodo([todo("a")], "  buy milk  ", { id: "b", now: 42 });
    expect(result).toEqual([todo("a"), { id: "b", text: "buy milk", completed: false, createdAt: 42 }]);
  });

  it("ignores text that is only spaces", () => {
    expect(addTodo([todo("a")], "   ")).toEqual([todo("a")]);
  });

  it("does not change the list it was given", () => {
    const before = [todo("a")];
    addTodo(before, "new");
    expect(before).toEqual([todo("a")]);
  });
});

describe("cleanText", () => {
  it("collapses inner spaces and caps the length", () => {
    expect(cleanText("a   b")).toBe("a b");
    expect(cleanText("x".repeat(500))).toHaveLength(MAX_TEXT_LENGTH);
  });
});

describe("toggle, delete, clear", () => {
  const list = [todo("a"), todo("b", true), todo("c")];

  it("toggles only the matching task", () => {
    expect(toggleTodo(list, "a").map((t) => t.completed)).toEqual([true, true, false]);
  });

  it("deletes only the matching task", () => {
    expect(deleteTodo(list, "b").map((t) => t.id)).toEqual(["a", "c"]);
  });

  it("clears completed tasks", () => {
    expect(clearCompleted(list).map((t) => t.id)).toEqual(["a", "c"]);
  });
});

describe("filterTodos and countActive", () => {
  const list = [todo("a"), todo("b", true)];

  it.each([
    ["all", ["a", "b"]],
    ["active", ["a"]],
    ["completed", ["b"]],
  ] as const)("filter %s", (filter, ids) => {
    expect(filterTodos(list, filter).map((t) => t.id)).toEqual(ids);
  });

  it("counts tasks not done", () => {
    expect(countActive(list)).toBe(1);
  });
});
