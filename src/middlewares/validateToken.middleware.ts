import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class ValidateToken {
  public validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET;

    if (token && secret) {
      const isValid = jwt.verify(token, secret);
      if (isValid) {
        res.locals.token = jwt.decode(token);
        return next();
      }
      return res.status(401).json({messsage: "Token is required"})
    }
    return res.status(401).json({messsage: "Token is required"})
  };
}

export const validateToken = new ValidateToken();
