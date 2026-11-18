import { expect, test } from "@playwright/test";

// Tests share one database (e2e.db, fresh for each run) and run in order.

test("add, complete, filter and clear tasks", async ({ page }) => {
  await page.goto("/");
  const input = page.getByLabel("New task");

  await input.fill("Write the workshop notes");
  await input.press("Enter");
  await expect(page.getByText("Write the workshop notes")).toBeVisible();
  await input.fill("Book the room");
  await page.getByRole("button", { name: "Add" }).click();

  await expect(page.locator(".todo-item")).toHaveCount(2);
  await expect(page.locator("#todo-count")).toHaveText("2 tasks left");

  await page.getByRole("checkbox").first().check();
  await expect(page.locator("#todo-count")).toHaveText("1 task left");

  await page.getByRole("link", { name: "Done" }).click();
  await expect(page).toHaveURL(/filter=completed/);
  await expect(page.locator(".todo-text")).toHaveText(["Write the workshop notes"]);

  await page.getByRole("button", { name: "Clear completed" }).click();
  await expect(page.getByText("No completed tasks yet.")).toBeVisible();
});

test("tasks are saved on the server", async ({ page, browser }) => {
  await page.goto("/");
  await page.getByLabel("New task").fill("Saved in the database");
  await page.getByLabel("New task").press("Enter");
  await expect(page.getByText("Saved in the database")).toBeVisible();

  // A brand-new browser, with no cookies or local storage, sees the same task.
  const other = await browser.newPage();
  await other.goto("/");
  await expect(other.getByText("Saved in the database")).toBeVisible();
});

test("the server rejects a blank task with a message", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("New task").fill("   ");
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.locator("#todo-error")).toHaveText("Write something first.");
});

test("user text is shown as text, not run as HTML", async ({ page }) => {
  const evil = "<img src=x onerror=\"document.title='hacked'\">";
  await page.goto("/");
  await page.getByLabel("New task").fill(evil);
  await page.getByLabel("New task").press("Enter");
  await expect(page.getByText(evil)).toBeVisible();
  await expect(page).toHaveTitle("The Best App");
});

test("the theme choice is kept by the server", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /switch to (dark|light) mode/i }).click();
  const theme = await page.locator("html").getAttribute("data-theme");
  // Navigate away at once: the choice must survive even a quick click-and-go.
  await page.goto("/?filter=active");
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme!);
});
