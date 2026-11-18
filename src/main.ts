/**
 * Entry point: holds the state and wires the pieces together.
 *
 *   user action → core (pure rules) → store.save → render
 *
 * core/     what the app does      (no DOM, fully unit-tested)
 * storage/  where tasks are kept   (behind the TodoStore interface)
 * ui/       how it looks           (reads state, writes DOM)
 */
import "./styles/main.css";
import { FILTERS, type Filter, type Todo } from "./core/types";
import { addTodo, clearCompleted, countActive, deleteTodo, filterTodos, toggleTodo } from "./core/todos";
import { createLocalStorageStore } from "./storage/local-storage";
import { renderFooter, renderList } from "./ui/render";
import { setupThemeToggle } from "./ui/theme";

function $<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}

const form = $<HTMLFormElement>("#todo-form");
const input = $<HTMLInputElement>("#todo-input");
const list = $<HTMLUListElement>("#todo-list");
const count = $<HTMLElement>("#todo-count");
const clearBtn = $<HTMLButtonElement>("#clear-completed");
const filterButtons = document.querySelectorAll<HTMLButtonElement>("[data-filter]");

const store = createLocalStorageStore();
let todos: Todo[] = store.load();
let filter: Filter = "all";

function update(next: Todo[]): void {
  todos = next;
  store.save(todos);
  render();
}

function render(): void {
  renderList(list, filterTodos(todos, filter), filter, {
    onToggle: (id) => update(toggleTodo(todos, id)),
    onDelete: (id) => update(deleteTodo(todos, id)),
  });
  renderFooter(count, filterButtons, countActive(todos), filter);
  clearBtn.hidden = todos.length === countActive(todos);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  update(addTodo(todos, input.value));
  input.value = "";
  input.focus();
});

clearBtn.addEventListener("click", () => update(clearCompleted(todos)));

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const value = button.dataset.filter as Filter;
    if (FILTERS.includes(value)) {
      filter = value;
      render();
    }
  });
}

setupThemeToggle($<HTMLButtonElement>("#theme-toggle"));
render();
