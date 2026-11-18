import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("add, complete, filter and clear a task", async ({ page }) => {
  const input = page.getByLabel("New task");
  await input.fill("Write the workshop notes");
  await input.press("Enter");
  await input.fill("Book the room");
  await page.getByRole("button", { name: "Add" }).click();

  await expect(page.locator(".todo-item")).toHaveCount(2);
  await expect(page.locator("#todo-count")).toHaveText("2 tasks left");

  await page.getByRole("checkbox").first().check();
  await expect(page.locator("#todo-count")).toHaveText("1 task left");

  await page.getByRole("button", { name: "Done" }).click();
  await expect(page.locator(".todo-item")).toHaveText(["Write the workshop notes✕"]);

  await page.getByRole("button", { name: "Clear completed" }).click();
  await expect(page.getByText("No completed tasks yet.")).toBeVisible();
});

test("tasks survive a reload", async ({ page }) => {
  await page.getByLabel("New task").fill("Still here after reload");
  await page.getByLabel("New task").press("Enter");
  await page.reload();
  await expect(page.getByText("Still here after reload")).toBeVisible();
});

test("user text is shown as text, not run as HTML", async ({ page }) => {
  await page.getByLabel("New task").fill("<img src=x onerror=\"document.title='hacked'\">");
  await page.getByLabel("New task").press("Enter");
  await expect(page.locator(".todo-text")).toHaveText("<img src=x onerror=\"document.title='hacked'\">");
  await expect(page).toHaveTitle("The Best App");
});
