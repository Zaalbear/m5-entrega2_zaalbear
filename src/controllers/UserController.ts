import jwt from "jsonwebtoken";
import bcrypt, { compare } from "bcrypt";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { prisma } from "../database/prisma";

export class UserController {
  private userService = new UserService();

  public create = async (req: Request, res: Response) => {
    const usedEmail = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (!usedEmail) {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const body = { ...req.body, password: hashPassword };

      await this.userService.create(body);

      const response = await prisma.user.findFirst({
        where: { email: req.body.email },
        select: { id: true, name: true, email: true },
      });
      return res.status(201).json(response);
    }

    return res
      .status(409)
      .json({ message: "This email is already registered" });
  };

  public login = async (req: Request, res: Response) => {
    const user = await this.userService.login(req.body);

    if (user) {
      const hash = user.password;
      const data = req.body.password;
      const verify = await compare(data, hash);

      if (verify) {
        if (process.env.JWT_SECRET && user.id) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
          });
          return res.status(200).json({
            accessToken: token,
            user: { id: user.id, name: user.name, email: user.email },
          });
        }
      }

      return res
        .status(401)
        .json({ massage: "Email and password doesn't match" });
    }

    return res.status(404).json({ massage: "User not exists" });
  };

  public get = async (req: Request, res: Response) => {
    const user = await this.userService.get(req.body);
    if (user) {
      const token = req.headers.authorization;
      const secret = process.env.JWT_SECRET;

      if (token && secret) {
        jwt.verify(token, secret);
        res.locals.token = jwt.decode(token);

        return res.status(200).json(user)

      }
      return res.status(401).json({ message: "Token is required"})
    }
    return res.status(404).json({ message: "User not exists" });
  };
}
