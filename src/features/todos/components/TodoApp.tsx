import type { Todo } from "@/db/schema";
import { clearCompleted } from "../actions";
import { countActive, filterTodos, type Filter } from "../rules";
import { TodoFilters } from "./TodoFilters";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";

const EMPTY: Record<Filter, string> = {
  all: "No tasks yet. Add one above!",
  active: "Nothing left to do.",
  completed: "No completed tasks yet.",
};

export function TodoApp({ todos, filter }: { todos: Todo[]; filter: Filter }) {
  const visible = filterTodos(todos, filter);
  const left = countActive(todos);

  return (
    <>
      <TodoForm />

      <ul id="todo-list">
        {visible.length === 0 ? (
          <li className="empty-message">{EMPTY[filter]}</li>
        ) : (
          visible.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </ul>

      <footer className="app-footer">
        <span id="todo-count">
          {left} {left === 1 ? "task" : "tasks"} left
        </span>
        <TodoFilters current={filter} />
      </footer>

      {left < todos.length && (
        <form action={clearCompleted}>
          <button type="submit" id="clear-completed">
            Clear completed
          </button>
        </form>
      )}
    </>
  );
}
