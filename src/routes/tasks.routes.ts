import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { validate } from "../middlewares/validateTask.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/tasks.schemas";
import { validateToken } from "../middlewares/validateToken.middleware";

export const taskRouter = Router();
const taskController = new TaskController();

taskRouter.post(
  "",
  validateToken.validateToken,
  validate.validateTaskBody(taskCreateSchema),
  taskController.create
);
taskRouter.get("", validateToken.validateToken, taskController.findMany);
taskRouter.get(
  "/:id",
  validateToken.validateToken,
  validate.validateId,
  taskController.findById
);
taskRouter.patch(
  "/:id",
  validateToken.validateToken,
  validate.validateId,
  validate.validateTaskUpdateBody(taskUpdateSchema),
  taskController.update
);
taskRouter.delete(
  "/:id",
  validateToken.validateToken,
  validate.validateId,
  taskController.delete
);
