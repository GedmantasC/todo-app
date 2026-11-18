/**
 * Drawing the list. These functions read state and write DOM; they never change
 * state themselves. User actions go back to main.ts through the handlers.
 */
import type { Filter, Todo } from "../core/types";

export interface ListHandlers {
  onToggle(id: string): void;
  onDelete(id: string): void;
}

const EMPTY_MESSAGES: Record<Filter, string> = {
  all: "No tasks yet. Add one above!",
  active: "Nothing left to do.",
  completed: "No completed tasks yet.",
};

export function renderList(
  list: HTMLUListElement,
  todos: readonly Todo[],
  filter: Filter,
  handlers: ListHandlers,
): void {
  list.replaceChildren();

  if (todos.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-message";
    empty.textContent = EMPTY_MESSAGES[filter];
    list.append(empty);
    return;
  }

  for (const todo of todos) {
    list.append(renderItem(todo, handlers));
  }
}

function renderItem(todo: Todo, { onToggle, onDelete }: ListHandlers): HTMLLIElement {
  const item = document.createElement("li");
  item.className = "todo-item" + (todo.completed ? " completed" : "");
  item.dataset.id = todo.id;

  const label = document.createElement("label");
  label.className = "todo-label";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => onToggle(todo.id));

  const text = document.createElement("span");
  text.className = "todo-text";
  text.textContent = todo.text; // textContent, never innerHTML: user text is not HTML

  label.append(checkbox, text);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "✕";
  deleteBtn.setAttribute("aria-label", `Delete "${todo.text}"`);
  deleteBtn.addEventListener("click", () => onDelete(todo.id));

  item.append(label, deleteBtn);
  return item;
}

export function renderFooter(
  count: HTMLElement,
  filterButtons: NodeListOf<HTMLButtonElement>,
  activeCount: number,
  filter: Filter,
): void {
  count.textContent = `${activeCount} ${activeCount === 1 ? "task" : "tasks"} left`;
  for (const button of filterButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
  }
}
