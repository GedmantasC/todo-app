import Link from "next/link";
import { FILTERS, type Filter } from "../rules";

const LABELS: Record<Filter, string> = { all: "All", active: "Active", completed: "Done" };

// Filters are links, so the filter lives in the URL: /?filter=active
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
