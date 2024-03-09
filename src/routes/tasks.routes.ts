import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

export const taskRouter = Router()
const taskController = new TaskController();

taskRouter.post("", taskController.create)
taskRouter.get("", taskController.findMany)
taskRouter.get("/:id", taskController.findById)
taskRouter.patch("/:id", taskController.update)
taskRouter.delete('/:id', taskController.delete)