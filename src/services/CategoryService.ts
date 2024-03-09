import { prisma } from "../database/prisma";
import { categoryCreate } from "../interfaces/category.instefaces";

export class CategoryServices {
    public create = async (data: categoryCreate) => {
        return await prisma.category.create({ data })
    }

    public delete = async (id: number) => {
        return await prisma.category.delete({ where: { id } });
      };
}