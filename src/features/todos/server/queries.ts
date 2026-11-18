import "server-only";
import { cache } from "react";
import { db } from "@/db/client";
import { createTodoRepository } from "./repository";

const repo = createTodoRepository(db);

/** Read the tasks for a page render. cache() means one query per request, however many callers. */
export const getTodos = cache(() => repo.list());
