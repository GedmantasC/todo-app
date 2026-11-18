import { migrate } from "drizzle-orm/libsql/migrator";
import { beforeEach, describe, expect, it } from "vitest";
import { createDb } from "@/db/client";
import { createTodoRepository, type TodoRepository } from "@/features/todos/server/repository";

// The real queries and the real migrations, against a fresh in-memory database per test.
let repo: TodoRepository;

beforeEach(async () => {
  const db = createDb(":memory:");
  await migrate(db, { migrationsFolder: "drizzle" });
  repo = createTodoRepository(db);
});

const ID_A = "00000000-0000-4000-8000-00000000000a";
const ID_B = "00000000-0000-4000-8000-00000000000b";

describe("todo repository", () => {
  it("adds tasks and lists them oldest first", async () => {
    await repo.add("second", { id: ID_B, now: new Date(2000) });
    await repo.add("  first  ", { id: ID_A, now: new Date(1000) });
    expect(await repo.list()).toEqual([
      { id: ID_A, text: "first", completed: false, createdAt: 1000 },
      { id: ID_B, text: "second", completed: false, createdAt: 2000 },
    ]);
  });

  it("toggles a task in the database, both ways", async () => {
    await repo.add("task", { id: ID_A });
    await repo.toggle(ID_A);
    expect((await repo.list())[0]?.completed).toBe(true);
    await repo.toggle(ID_A);
    expect((await repo.list())[0]?.completed).toBe(false);
  });

  it("removes one task and clears completed ones", async () => {
    await repo.add("keep", { id: ID_A });
    await repo.add("done", { id: ID_B });
    await repo.toggle(ID_B);
    await repo.clearCompleted();
    expect((await repo.list()).map((t) => t.text)).toEqual(["keep"]);
    await repo.remove(ID_A);
    expect(await repo.list()).toEqual([]);
  });
});
