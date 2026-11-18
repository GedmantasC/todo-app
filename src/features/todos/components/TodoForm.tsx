"use client";

import type { FormEvent } from "react";
import { MAX_TEXT_LENGTH } from "../domain/rules";

export function TodoForm({
  onAdd,
  error,
}: {
  /** Resolves with the server's error message, if any. */
  onAdd: (text: string) => Promise<string | undefined>;
  error?: string;
}) {
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem("text") as HTMLInputElement;
    const text = input.value;
    input.value = "";
    input.focus();
    const failed = await onAdd(text);
    // Give the text back if the server said no, unless the user has started a new task.
    if (failed && input.value === "") input.value = text;
  }

  return (
    <form id="todo-form" onSubmit={submit}>
      <label htmlFor="todo-input" className="visually-hidden">
        New task
      </label>
      <input
        id="todo-input"
        name="text"
        type="text"
        placeholder="Add a new task..."
        autoComplete="off"
        maxLength={MAX_TEXT_LENGTH}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "todo-error" : undefined}
      />
      <button type="submit">Add</button>
      {error && (
        <p id="todo-error" className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
