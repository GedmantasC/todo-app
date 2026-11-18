import { TodoApp } from "@/features/todos/components/TodoApp";
import { parseFilter } from "@/features/todos/domain/types";
import { getTodos } from "@/features/todos/server/queries";

/**
 * A route file stays thin: read the request, load data, hand it to the feature.
 * The feature (src/features/todos) holds everything else.
 */
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ filter }, todos] = await Promise.all([searchParams, getTodos()]);
  return <TodoApp todos={todos} filter={parseFilter(filter)} />;
}
