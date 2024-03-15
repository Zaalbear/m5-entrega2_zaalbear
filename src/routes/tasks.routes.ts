import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { validate } from "../middlewares/validateTask.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/tasks.schemas";

export const taskRouter = Router()
const taskController = new TaskController();

taskRouter.post("", validate.validateTaskBody(taskCreateSchema), validate.validateCategoryId, taskController.create)
taskRouter.get("", taskController.findMany)
taskRouter.get("/:id", validate.validateId, taskController.findById)
taskRouter.patch("/:id", validate.validateId, validate.validateTaskBody(taskCreateSchema), taskController.update)
taskRouter.delete('/:id', validate.validateId, taskController.delete)