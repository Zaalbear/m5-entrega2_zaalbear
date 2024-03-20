import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class ValidateToken {
  public validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    const secret = process.env.JWT_SECRET;

    if (token && secret) {
      const isValid = jwt.verify(token, secret);
      res.locals.token = jwt.decode(token);

      if (isValid){
        return next();
      }
      return res.status(401).json({ message: "Invalid Token" });
    }

    return res.status(401).json({ message: "Token is required" });
  };
}

export const validateToken = new ValidateToken();
