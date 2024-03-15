import express, { json } from "express";
import helmet from "helmet";
import { taskRouter } from "./routes/tasks.routes";
import { categoryRouter } from "./routes/category.routes";
import { handleErrors } from "./middlewares/handleErros.middlware";

export const app = express();

app.use(helmet());
app.use(json());

app.use("/tasks", taskRouter)
app.use("/categories", categoryRouter)

app.use(handleErrors);

