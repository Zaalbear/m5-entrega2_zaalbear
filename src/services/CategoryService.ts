import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { categoryCreate } from "../interfaces/category.instefaces";

export class CategoryServices {
  public create = async (data: categoryCreate) => {
    return await prisma.category.create({ data });
  };

  public delete = async (id: number, userId: number) => {
    const findCategory = await prisma.category.findFirst({ where: { id, userId } });

    if (findCategory) {
        await prisma.category.delete({ where: { id } });
        return true; // Ou uma mensagem de sucesso, se preferir
    } 
    
    return null;
  };
}
