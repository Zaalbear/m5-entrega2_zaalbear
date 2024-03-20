import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(3).max(255),
  email: z.string(),
  password: z.string().min(3),
});

export const userCreateSchema = userSchema.omit({ id: true });
export const userLoginSchema = userSchema.omit({ id: true }).partial({ name: true });
