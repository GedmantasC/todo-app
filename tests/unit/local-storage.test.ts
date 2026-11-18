import { beforeEach, describe, expect, it } from "vitest";
import { STORAGE_KEY, createLocalStorageStore } from "../../src/storage/local-storage";

describe("createLocalStorageStore", () => {
  beforeEach(() => localStorage.clear());

  it("saves and loads tasks", () => {
    const store = createLocalStorageStore();
    const todos = [{ id: "a", text: "one", completed: false, createdAt: 1 }];
    store.save(todos);
    expect(store.load()).toEqual(todos);
  });

  it("reads data saved by v1 of the app, which had no createdAt", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ id: "a", text: "old", completed: true }]));
    expect(createLocalStorageStore().load()).toEqual([
      { id: "a", text: "old", completed: true, createdAt: 0 },
    ]);
  });

  it("starts empty when the saved data is corrupt", () => {
    localStorage.setItem(STORAGE_KEY, "{not json");
    expect(createLocalStorageStore().load()).toEqual([]);
  });

  it("drops items that are not tasks", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([null, 3, { text: "no id" }, { id: "a", text: "ok" }]));
    expect(
      createLocalStorageStore()
        .load()
        .map((t) => t.id),
    ).toEqual(["a"]);
  });
});
