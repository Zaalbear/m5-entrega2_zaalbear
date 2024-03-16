import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { prisma } from "../database/prisma";

class ValidateTask {
  public validateTaskBody =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
      req.body = schema.parse(req.body);

      if (!req.body.categoryId){
        return res.status(400).json({ massage: "Category has been not declared"})
      }
  
      return next();
    };

  public validateId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const foundTask = await prisma.task.findFirst({
      where: { id: Number(id) },
    });

    if (!foundTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    return next();
  };

  public validateCategoryId = async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.body;

    const foundCategory = await prisma.category.findFirst({
      where: { id: Number(categoryId) },
    });

    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return next();

  }

  public validateTaskUpdateBody =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);

    if (req.body.categoryId){
      const foundCategory = await prisma.category.findFirst({ where: { id: req.body.categoryId}})

      if (!foundCategory){
        return res.status(404).json({ massage: "Category not found"})
      }
    }

    return next();
  };
}

export const validate = new ValidateTask();
