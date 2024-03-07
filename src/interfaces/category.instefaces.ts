import { Category } from "@prisma/client";

export type categoryCreate = Omit<Category, "id">