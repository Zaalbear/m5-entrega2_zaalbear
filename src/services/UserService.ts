import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { userCreate, userLogin } from "../interfaces/user.interfaces";
import { userCreateSchema } from "../schemas/user.schemas";

export class UserService {
  public create = async (data: userCreate) => {
    const newUser = await prisma.user.create({ data });
    return userCreateSchema.parse(newUser);
  };

  public login = async (data: userLogin) => {
    return await prisma.user.findFirst({ where: { email: data.email }})
  }

  public get = async (data: userLogin) => {
    return await prisma.user.findFirst({ where: { email: data.email } });
  };
}
