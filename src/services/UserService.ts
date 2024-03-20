import { prisma } from "../database/prisma";
import { userCreate, userLogin } from "../interfaces/user.interfaces";
import bcrypt, { compare } from "bcrypt";
import jwt, { decode, sign } from "jsonwebtoken";

export class UserService {
  public create = async (data: userCreate) => {
    const validEmail = await prisma.user.findFirst({ where: { email: data.email  }})
    
    if (!validEmail) {
      const hashPassword = await bcrypt.hash(data.password, 10);
      const newBody = { ...data, password: hashPassword };

      const response = await prisma.user.create({ data: newBody,
        select: { id: true, name: true, email: true },
      });

      return response
    }

  };

  public login = async (data: userLogin) => {
    const user = await prisma.user.findFirst({ where: { email: data.email } });
    const hashPassword = user?.password
    
    if(!hashPassword){
      return { status: 401, message: { message: "Email and password doesn't match" } }
    }
    
    const verify = await compare(data.password, hashPassword)
    if (!verify){
      return { status: 401, message: { message: "Email and password doesn't match" }}
    }

    const secret = process.env.JWT_SECRET;
    const userData = await prisma.user.findFirst({where: { id: user.id }, select: { id: true, name: true, email: true }})
  
    if (userData && secret){
      const token = sign({ id: user.id }, secret)
      return { status: 200, message: { accessToken: token, user: userData }};
    }

    return { status: 404, message: { message: "User not exists" }}
  };

  public get = async (token: string) => {
    console.log(token);
    
    const accessToken = decode(token)

    if (accessToken && typeof accessToken !== 'string') {
      const id = accessToken.id;
      return await prisma.user.findFirst({where: { id }, select: { id: true, name: true, email: true }});
    }
  };
}
