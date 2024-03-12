import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { validate } from "../middlewares/validateCategory.middleware";
import { categoryCreateSchema, categorySchema } from "../schemas/category.schemas";

export const categoryRouter = Router()
const categoryController = new CategoryController();

categoryRouter.post("", validate.validateCategoryBody(categoryCreateSchema), categoryController.create)
categoryRouter.delete("/:id", validate.validateId, categoryController.delete)