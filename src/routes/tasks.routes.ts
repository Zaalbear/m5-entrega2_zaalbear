import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

export const taskRouter = Router()
const taskController = new TaskController();

taskRouter.post("", taskController.create)