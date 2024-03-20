import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { prisma } from "../database/prisma";

export class TaskController {
  private taskService = new TaskService();

  public create = async (req: Request, res: Response) => {
    const body = { ...req.body, userId: res.locals.token.id };

    const category = await prisma.category.findFirst({
      where: { id: body.categoryId },
    });

    if (category?.userId === body.userId) {
      const response = await this.taskService.create(body);

      return res.status(201).json(response);
    }

    console.log(category);

    return res
      .status(404)
      .json({ message: "This user is not the category owner" });
  };

  public findMany = async ({ query }: Request, res: Response) => {
    const queryParams = query.category ? String(query.category) : undefined;
    const userId = res.locals.token.id;
    const taskList = await this.taskService.findMany(userId, queryParams);

    if (queryParams) {
      const foundCategory = await prisma.task.findFirst({
        where: { category: { name: String(queryParams) } },
      });

      if (!foundCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    return res.status(200).json({ taskList });
  };

  public findById = async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    const userId = res.locals.token.id;
    const findTask = await this.taskService.findById(taskId, userId);
    return res.status(200).json(findTask);
  };

  public update = async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    const userId = res.locals.token.id;

    const taskBody = req.body;
    const task = await this.taskService.update(taskId, taskBody, userId);

    return res.status(200).json(task);
  };

  public delete = async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    const userId = res.locals.token.id;

    await this.taskService.delete(taskId, userId);

    return res.status(204).json();
  };
}
