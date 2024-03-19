import { taskCreate, taskUpdate } from "../interfaces/tasks.interfaces";
import { prisma } from "../database/prisma";
import { taskCreateSchema } from "../schemas/tasks.schemas";

export class TaskService {
  public create = async (data: taskCreate) => {
    return await prisma.task.create({ data });
  };

  public findMany = async (name?: string) => {
    if (name) {
      return await prisma.task.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          finished: true,
          category: true,
        },
        where: { category: { name } },
      });
    }

    return await prisma.task.findMany({ include: { category: true } });
  };

  public findById = async (id: number) => {
    return await prisma.task.findFirst({
      where: { id },
      include: { category: true },
    });
  };

  public update = async (id: number, data: taskUpdate) => {
    return await prisma.task.update({ where: { id }, data });
  };

  public delete = async (id: number) => {
    return await prisma.task.delete({ where: { id } });
  };
}
