import { TodoApp } from "@/features/todos/components/TodoApp";
import { getTodos } from "@/features/todos/queries";
import { parseFilter } from "@/features/todos/rules";

// The home page: read the filter from the URL, load the tasks, show the app.
export default async function HomePage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const { filter } = await searchParams;
  const todos = await getTodos();
  return <TodoApp todos={todos} filter={parseFilter(filter)} />;
}
