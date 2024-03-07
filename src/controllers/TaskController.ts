import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
    private taskService = new TaskService();

    public create = async (req: Request, res: Response) => {
        const newTask = await this.taskService.create(req.body);
        return res.status(201).json(newTask)
    }
}