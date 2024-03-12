import { z } from "zod";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/tasks.schemas";

export type taskCreate = z.infer<typeof taskCreateSchema>
export type taskUpdate = z.infer<typeof taskUpdateSchema>