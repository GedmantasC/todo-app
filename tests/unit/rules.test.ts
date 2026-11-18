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
} from "@/features/todos/domain/rules";
import { newTodoSchema, parseFilter, type Todo } from "@/features/todos/domain/types";

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
  it("collapses inner spaces", () => {
    expect(cleanText("  a   b ")).toBe("a b");
  });

  it("addTodo caps the length for the optimistic copy", () => {
    expect(addTodo([], "x".repeat(500), { id: "a" })[0]?.text).toHaveLength(MAX_TEXT_LENGTH);
  });
});

describe("what the server accepts", () => {
  it("rejects blank and over-long text with a message for the user", () => {
    expect(newTodoSchema.safeParse({ text: "   " }).error?.issues[0]?.message).toBe("Write something first.");
    expect(newTodoSchema.safeParse({ text: "x".repeat(201) }).success).toBe(false);
  });

  it("accepts and trims normal text", () => {
    expect(newTodoSchema.parse({ text: "  call the bank " }).text).toBe("call the bank");
  });

  it("turns any URL value into a valid filter", () => {
    expect(parseFilter("active")).toBe("active");
    expect(parseFilter("<script>")).toBe("all");
    expect(parseFilter(["active", "completed"])).toBe("all");
    expect(parseFilter(undefined)).toBe("all");
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
