import { taskUpdate } from "../interfaces/tasks.interfaces";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class TaskService {
  public create = async (data: any) => {
    return await prisma.task.create({ data });
  };

  public findMany = async (userId: number, name?: string) => {
    if (userId) {
      return await prisma.task.findMany({ where: { userId } });
    }
    if (name) {
      return await prisma.task.findMany({
        include: { category: true },
        where: { category: { name } },
      });
    }

    return await prisma.task.findMany({ include: { category: true } });
  };

  public findById = async (id: number, userId: number) => {
    const response = await prisma.task.findFirst({
      where: { id, userId },
      include: { category: true },
    });

    if (!response) {
      throw new AppError("This user is not the task owner", 403);
    }

    return response;
  };

  public update = async (id: number, data: taskUpdate, userId: number) => {
    const findTask = await prisma.task.findFirst({ where: { id, userId } });

    if (findTask) {
      return await prisma.task.update({ where: { id }, data });
    }

    throw new AppError("This user is not the task owner", 403);
  };

  public delete = async (id: number, userId: number) => {
    const findTask = await prisma.task.findFirst({ where: { id, userId } });

    if (findTask) {
      return await prisma.task.delete({ where: { id } });
    }

    throw new AppError("This user is not the task owner", 403);
  };
}
