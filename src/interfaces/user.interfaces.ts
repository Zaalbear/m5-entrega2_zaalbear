import { z } from "zod";
import { userCreateSchema, userLoginSchema } from "../schemas/user.schemas";

export type userCreate = z.infer<typeof userCreateSchema>;
export type userLogin = z.infer<typeof userLoginSchema>;
