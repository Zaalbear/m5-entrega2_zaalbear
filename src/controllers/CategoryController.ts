import { Request, Response } from "express";
import { CategoryServices } from "../services/CategoryService";

export class CategoryController {
  private categoryService = new CategoryServices();

  public create = async (req: Request, res: Response) => {
    const newCategory = await this.categoryService.create(req.body);
    return res.status(201).json(newCategory);
  };

  public delete = async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    const userId = res.locals.token.id;

    const response = await this.categoryService.delete(taskId, userId);

    if (response){
      return res.status(204).json();
    }

    return res.status(403).json({ message: "This user is not the category owner" })

  };
}
