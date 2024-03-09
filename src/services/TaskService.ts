import { taskCreate, taskUpdate } from "../interfaces/tasks.interfaces";
import { prisma } from "../database/prisma";

export class TaskService {
  public create = async (data: taskCreate) => {
    return await prisma.task.create({ data });
  };

  public findMany = async (title?: string) => {
    if (title) {
      return await prisma.task.findMany({
        where: { title /*mode: "insensitive"*/ },
        include: { category: true },
      });

      // Por algum motivo o mode: "insensitive" está gritando um erro e eu não sei o motivo.
    }

    return await prisma.task.findMany({ include: { category: true } });
  };

  public findById = async (id: number) => {
    return await prisma.task.findFirst({ where: { id } });
  };

  public update = async (id: number, data: taskUpdate) => {
    return await prisma.task.update({ where: { id }, data });
  };

  public delete = async (id: number) => {
    return await prisma.task.delete({ where: { id } });
  };
}
