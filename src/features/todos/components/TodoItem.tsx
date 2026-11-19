"use client";

import type { Todo } from "@/db/schema";
import { deleteTodo, toggleTodo } from "../actions";

export function TodoItem({ todo }: { todo: Todo }) {
  return (
    <li className={todo.completed ? "todo-item completed" : "todo-item"}>
      <label className="todo-label">
        <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
        <span className="todo-text">{todo.text}</span>
      </label>
      <button
        type="button"
        className="delete-btn"
        aria-label={`Delete "${todo.text}"`}
        onClick={() => deleteTodo(todo.id)}
      >
        ✕
      </button>
    </li>
  );
}
