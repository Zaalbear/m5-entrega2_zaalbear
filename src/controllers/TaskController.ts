import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
  private taskService = new TaskService();

  public create = async (req: Request, res: Response) => {
    const newTask = await this.taskService.create(req.body);
    return res.status(201).json(newTask);
  };

  public findMany = async ({ query }: Request, res: Response) => {
    const queryParms = query.category ? String(query.category) : undefined;
    const taskList = await this.taskService.findMany(queryParms);
    return res.status(200).json({taskList});
  };

  public findById = async (req: Request, res: Response) => {
    const taskId = Number(req.params.id)
    const findTask = await this.taskService.findById(taskId)
    return res.status(200).json(findTask)
  }

  public update = async (req: Request, res: Response) => {
    const taskId = Number(req.params.id)
    const taskBody = req.body
    const task = await this.taskService.update(taskId, taskBody)

    return res.status(200).json(task)

  }

  public delete = async (req: Request, res: Response) => {
    const taskId = Number(req.params.id)
    await this.taskService.delete(taskId)

    return res.status(204).json()
  }
}
