import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { prisma } from "../database/prisma";

export class TaskController {
  private taskService = new TaskService();

  public create = async (req: Request, res: Response) => {
    const body = req.body;
    const userId = req.body.userId;
    const categoryId = req.body.categoryId;

    if (!categoryId) {
      const response = await this.taskService.create(body, userId);
      if (response) {
        return res.status(200).json(response);
      }

      return res
        .status(403)
        .json({ message: "This user is not the task owner" });
    }

    if (categoryId) {
      const category = await prisma.category.findFirst({ where: { userId } });

      if (category) {
        const response = await this.taskService.create(
          body,
          userId,
          categoryId
        );

        if (response) {
          return res.status(200).json(response);
        }

        return res
          .status(403)
          .json({ message: "This user is not the category owner" });
      }

      return res.status(404).json({ message: "Category not found" });
    } else {
      const response = await this.taskService.create(body, userId);

      if (response) {
        return res.status(200).json(response);
      }

      return res
        .status(403)
        .json({ message: "This user is not the category owner" });
    }
  };

  public findMany = async ({ query }: Request, res: Response) => {
    const queryParams = query.category ? String(query.category) : undefined;
    const userId = res.locals.token.id;
    const taskList = await this.taskService.findMany(userId, queryParams);

    if (!taskList) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(taskList);
  };

  public findById = async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    const userId = res.locals.token.id;
    const findTask = await this.taskService.findById(taskId, userId);

    if (!findTask){
      return res.status(403).json({ message: "User is not the task owner" })
    }
    return res.status(200).json(findTask);
  };

  public update = async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    const userId = res.locals.token.id;

    const taskBody = req.body;
    const response = await this.taskService.update(taskId, taskBody, userId);

    if (!response){
      return res.status(403).json({ message: "User is not the task owner" })
    }
    return res.status(200).json(response);
  };

  public delete = async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    const userId = res.locals.token.id;

    const response = await this.taskService.delete(taskId, userId);

    if (!response){
      return res.status(403).json({ message: "User is not the task owner" })
    }

    return res.status(204).json();
  };
}
