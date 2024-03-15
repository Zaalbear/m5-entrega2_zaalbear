import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { prisma } from "../database/prisma";

class ValidateCategory {
    public validateCategoryBody =
      (schema: AnyZodObject) =>
      (req: Request, _: Response, next: NextFunction) => {
        req.body = schema.parse(req.body);
  
        return next();
      };
  
    public validateId = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params;
      const foundCategory = await prisma.category.findFirst({
        where: { id: Number(id) },
      });
  
      if (!foundCategory) {
        return res.status(404).json({ message: "Category not found." });
      }
  
      return next();
    };
  }
  
  export const validate = new ValidateCategory();
  