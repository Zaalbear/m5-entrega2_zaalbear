import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService = new UserService();

  public create = async (req: Request, res: Response) => {
    const response = await this.userService.create(req.body);

    if (response) {
      return res.status(201).json(response);
    }

    return res
      .status(409)
      .json({ message: "This email is already registered" });
  };

  public login = async (req: Request, res: Response) => {
    const response = await this.userService.login(req.body);
    const message = response.message
    const status = response.status

    if(response){
      return res.status(status).json(message);
    }
    
    return res.status(status).json({ message: message });
  };

  public get = async (req: Request, res: Response) => {
    const token = req.headers.authorization

    if (token){
      const response = await this.userService.get(token)
      if (response){
        return res.status(200).json(response)
      }

      return res.status(401).json({ message: "token is invalid"})
    }

    return res.status(401).json({message: "token is required"})
  }
}
