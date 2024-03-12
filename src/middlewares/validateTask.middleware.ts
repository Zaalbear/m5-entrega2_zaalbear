import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { prisma } from "../database/prisma";

class ValidateTask {
  public validateTaskBody =
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
    const { taskId } = req.params;
    const foundTask = await prisma.task.findFirst({
      where: { id: Number(taskId) },
    });

    if (!foundTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    return next();
  };
}

export const validate = new ValidateTask();
