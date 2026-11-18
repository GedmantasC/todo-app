import Link from "next/link";
import { FILTERS, type Filter } from "../domain/types";

const LABELS: Record<Filter, string> = { all: "All", active: "Active", completed: "Done" };

/** Filters are links, not state: the URL is shareable and Back works. */
export function TodoFilters({ current }: { current: Filter }) {
  return (
    <nav className="filters" aria-label="Filter tasks">
      {FILTERS.map((filter) => (
        <Link
          key={filter}
          href={filter === "all" ? "/" : `/?filter=${filter}`}
          aria-current={filter === current ? "page" : undefined}
          scroll={false}
        >
          {LABELS[filter]}
        </Link>
      ))}
    </nav>
  );
}
