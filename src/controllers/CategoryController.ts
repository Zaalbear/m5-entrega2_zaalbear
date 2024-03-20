import { Request, Response } from "express";
import { CategoryServices } from "../services/CategoryService";

export class CategoryController {
  private categoryService = new CategoryServices();

  public create = async (req: Request, res: Response) => {
    const body = { ...req.body, userId: res.locals.token.id };
    const newCategory = await this.categoryService.create(body);
    return res.status(201).json(newCategory);
  };

  public delete = async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    const userId = res.locals.token.id;

    await this.categoryService.delete(taskId, userId);

    return res.status(204).json();
  };
}
