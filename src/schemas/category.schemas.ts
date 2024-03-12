import { z } from "zod";

export const categorySchema = z.object({
    id: z.number().positive(),
    name: z.string().min(3).max(255)

})

export const categoryCreateSchema = categorySchema.omit({ id: true })