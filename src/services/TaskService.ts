import { taskCreate, taskUpdate } from "../interfaces/tasks.interfaces";
import { prisma } from "../database/prisma";
import { taskCreateSchema } from "../schemas/tasks.schemas";

export class TaskService {
  public create = async (data: taskCreate) => {
    const newTask = await prisma.task.create({ data });
    return taskCreateSchema.parse(newTask)
  };

  public findMany = async (name?: string) => {
    if (name) {
      return await prisma.task.findMany({
        include: { category: true },
        where: { category: { name } /*mode: "insensitive"*/ }
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
