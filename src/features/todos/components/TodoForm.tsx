import { addTodo } from "../actions";
import { MAX_TEXT_LENGTH } from "../rules";

export function TodoForm() {
  return (
    <form id="todo-form" action={addTodo}>
      <label htmlFor="todo-input" className="visually-hidden">
        New task
      </label>
      <input
        id="todo-input"
        name="text"
        type="text"
        placeholder="Add a new task..."
        autoComplete="off"
        required
        maxLength={MAX_TEXT_LENGTH}
      />
      <button type="submit">Add</button>
    </form>
  );
}
