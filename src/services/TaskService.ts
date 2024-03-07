import { Prisma } from "@prisma/client";
import { taskCreate } from "../interfaces/tasks.interfaces";
import { prisma } from "../database/prisma";

export class TaskService {

    public create = async (data: taskCreate) => {
        return await prisma.task.create({ data })
    }

    public findMany = async () => {
        return await prisma.task.findMany()
    }

}