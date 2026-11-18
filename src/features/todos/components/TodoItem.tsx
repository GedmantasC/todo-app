"use client";

import type { Todo } from "../domain/types";

export function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <li className={todo.completed ? "todo-item completed" : "todo-item"}>
      <label className="todo-label">
        <input type="checkbox" checked={todo.completed} onChange={onToggle} />
        {/* React escapes text by default: user text is never treated as HTML. */}
        <span className="todo-text">{todo.text}</span>
      </label>
      <button type="button" className="delete-btn" aria-label={`Delete "${todo.text}"`} onClick={onDelete}>
        ✕
      </button>
    </li>
  );
}
