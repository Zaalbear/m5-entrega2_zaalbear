import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { validate } from "../middlewares/validateCategory.middleware";
import { categoryCreateSchema } from "../schemas/category.schemas";
import { validateToken } from "../middlewares/validateToken.middleware";

export const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post(
  "",
  validateToken.validateToken,
  validate.validateCategoryBody(categoryCreateSchema),
  categoryController.create
);
categoryRouter.delete(
  "/:id",
  validateToken.validateToken,
  validate.validateId,
  categoryController.delete
);
