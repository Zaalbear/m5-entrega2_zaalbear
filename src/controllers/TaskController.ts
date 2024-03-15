import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { prisma } from "../database/prisma";

export class TaskController {
  private taskService = new TaskService();

  public create = async (req: Request, res: Response) => {
    await this.taskService.create(req.body);

    const response = await prisma.task.findFirst({ where: { id: res.locals.id }})
    return res.status(201).json(response);
  };

  public findMany = async ({ query }: Request, res: Response) => {
    const queryParams = query.category ? String(query.category) : undefined;
    const taskList = await this.taskService.findMany(queryParams);

    if (queryParams){
      const foundCategory = await prisma.task.findFirst({
        where: { category: { name: String(queryParams) } },
      });
      
      if (!foundCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
    }
    
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
