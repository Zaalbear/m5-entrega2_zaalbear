import { taskCreate, taskUpdate } from "../interfaces/tasks.interfaces";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class TaskService {
  public create = async (
    data: taskCreate,
    userId: number,
    categoryId?: number
  ) => {
    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      return null;
    }

    if (!categoryId) {
      const taskData = { ...data, userId: user.id };
      return await prisma.task.create({ data: taskData });
    }

    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId: user.id,
      },
    });

    if (!category) {
      return null;
    }

    const taskData = { ...data, userId: user.id, categoryId: category.id };
    return await prisma.task.create({ data: taskData });
  };

  public findMany = async (userId: number, name?: string) => {
    if (name) {
      const category = await prisma.category.findFirst({ where: { name } });
      if (!category) {
        return null;
      }

      return await prisma.task.findMany({
        include: { category: true },
        where: { userId: userId, category: { name } },
      });
    }

    if (userId) {
      return await prisma.task.findMany({
        where: { userId },
        include: { category: true },
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
      return null;
    }

    return response;
  };

  public update = async (id: number, data: taskUpdate, userId: number) => {
    const findUser = await prisma.task.findFirst({ where: { id, userId } });

    if (findUser) {
      return await prisma.task.update({ where: { id }, data });
    }

    return null;
  };

  public delete = async (id: number, userId: number) => {
    const findTask = await prisma.task.findFirst({ where: { id, userId } });

    if (findTask) {
      return await prisma.task.delete({ where: { id } });
    }

    return null;
  };
}
