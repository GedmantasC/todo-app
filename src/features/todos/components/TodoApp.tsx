"use client";

import { useOptimistic, useState, useTransition } from "react";
import { addTodo, clearCompleted, countActive, deleteTodo, filterTodos, toggleTodo } from "../domain/rules";
import type { Filter, Todo } from "../domain/types";
import { addTodoAction, clearCompletedAction, deleteTodoAction, toggleTodoAction } from "../server/actions";
import { TodoFilters } from "./TodoFilters";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";

type Change =
  | { type: "add"; id: string; text: string }
  | { type: "toggle"; id: string }
  | { type: "delete"; id: string }
  | { type: "clear" };

/** The same pure rules the server uses, applied early so the UI never waits for the network. */
function applyChange(todos: Todo[], change: Change): Todo[] {
  switch (change.type) {
    case "add":
      return addTodo(todos, change.text, { id: change.id });
    case "toggle":
      return toggleTodo(todos, change.id);
    case "delete":
      return deleteTodo(todos, change.id);
    case "clear":
      return clearCompleted(todos);
  }
}

const EMPTY: Record<Filter, string> = {
  all: "No tasks yet. Add one above!",
  active: "Nothing left to do.",
  completed: "No completed tasks yet.",
};

export function TodoApp({ todos, filter }: { todos: Todo[]; filter: Filter }) {
  const [optimistic, applyOptimistic] = useOptimistic(todos, applyChange);
  const [error, setError] = useState<string>();
  const [, startTransition] = useTransition();

  // The form is cleared at once, so the next task can be typed while this one saves.
  // (A form `action` would clear it only when the server answers, wiping what was typed since:
  // the "add, complete, filter" browser test caught exactly that.)
  function add(text: string): Promise<string | undefined> {
    const id = crypto.randomUUID();
    const formData = new FormData();
    formData.set("id", id);
    formData.set("text", text);
    return new Promise((resolve) => {
      startTransition(async () => {
        applyOptimistic({ type: "add", id, text });
        const result = await addTodoAction(formData);
        setError(result.error);
        resolve(result.error);
      });
    });
  }

  function run(change: Change, action: () => Promise<void>) {
    startTransition(async () => {
      applyOptimistic(change);
      await action();
    });
  }

  const visible = filterTodos(optimistic, filter);
  const left = countActive(optimistic);

  return (
    <>
      <TodoForm onAdd={add} error={error} />

      <ul id="todo-list" aria-live="polite">
        {visible.length === 0 ? (
          <li className="empty-message">{EMPTY[filter]}</li>
        ) : (
          visible.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => run({ type: "toggle", id: todo.id }, () => toggleTodoAction(todo.id))}
              onDelete={() => run({ type: "delete", id: todo.id }, () => deleteTodoAction(todo.id))}
            />
          ))
        )}
      </ul>

      <footer className="app-footer">
        <span id="todo-count">
          {left} {left === 1 ? "task" : "tasks"} left
        </span>
        <TodoFilters current={filter} />
      </footer>

      {left < optimistic.length && (
        <button
          type="button"
          id="clear-completed"
          onClick={() => run({ type: "clear" }, clearCompletedAction)}
        >
          Clear completed
        </button>
      )}
    </>
  );
}
