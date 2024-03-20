import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validate } from "../middlewares/validateUser.middleware";
import { userCreateSchema, userLoginSchema } from "../schemas/user.schemas";
import { validateToken } from "../middlewares/validateToken.middleware";

export const userRouter = Router();
const userControler = new UserController();

userRouter.post(
  "",
  validate.validateUserBody(userCreateSchema),
  userControler.create
);
userRouter.post(
  "/login",
  validate.validateUserBody(userLoginSchema),
  userControler.login
);
userRouter.get("/profile", userControler.get);
