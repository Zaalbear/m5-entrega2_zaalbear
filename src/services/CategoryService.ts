import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { categoryCreate } from "../interfaces/category.instefaces";

export class CategoryServices {
  public create = async (data: categoryCreate) => {
    return await prisma.category.create({ data });
  };

  public delete = async (id: number, userId: number) => {
    const findTask = await prisma.category.findFirst({ where: { id, userId } });

    if (findTask) {
      return await prisma.category.delete({ where: { id } });
    }

    throw new AppError("This user is not the task owner", 403);
  };
}
