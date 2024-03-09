import { Task } from "@prisma/client";

export type taskCreate = Omit<Task, "id" | "finished">
export type taskUpdate = Omit<Task, "id">