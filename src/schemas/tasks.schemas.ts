import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(3).max(255),
  content: z.string().min(3).max(255),
  finished: z.boolean(),
  categoryId: z.number().nullish(),
});

export const taskCreateSchema = taskSchema.omit({ id: true, finished: true })

export const taskUpdateSchema = taskSchema.partial()
