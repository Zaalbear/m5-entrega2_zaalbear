import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

class ValidateUser {
  public validateUserBody =
    (schema: AnyZodObject) =>
    (req: Request, _: Response, next: NextFunction) => {
      req.body = schema.parse(req.body);

      return next();
    };
}

export const validate = new ValidateUser();
