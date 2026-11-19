import { describe, expect, it } from "vitest";
import type { Todo } from "../src/db/schema";
import { cleanText, countActive, filterTodos, parseFilter } from "../src/features/todos/rules";

const todo = (text: string, completed: boolean): Todo => ({
  id: text,
  text,
  completed,
  createdAt: new Date(),
});

const list = [todo("Buy milk", false), todo("Call mum", true), todo("Walk dog", false)];

describe("rules", () => {
  it("cleans the text", () => {
    expect(cleanText("  buy   milk ")).toBe("buy milk");
  });

  it("filters the list", () => {
    expect(filterTodos(list, "all")).toHaveLength(3);
    expect(filterTodos(list, "active")).toHaveLength(2);
    expect(filterTodos(list, "completed")).toHaveLength(1);
  });

  it("counts tasks left", () => {
    expect(countActive(list)).toBe(2);
  });

  it("turns anything in the URL into a filter", () => {
    expect(parseFilter("active")).toBe("active");
    expect(parseFilter("nonsense")).toBe("all");
    expect(parseFilter(undefined)).toBe("all");
  });
});
