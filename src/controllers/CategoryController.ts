import { Request, Response } from "express";
import { CategoryServices } from "../services/CategoryService";

export class CategoryController {
    private categoryService = new CategoryServices();

    public create = async (req: Request, res: Response) => {
        const newCategory = await this.categoryService.create(req.body)
        return res.status(201).json(newCategory)
    }

    public delete = async (req: Request, res: Response) => {
        const taskId = Number(req.params.id)
        await this.categoryService.delete(taskId)
    
        return res.status(200).json()
      }
}