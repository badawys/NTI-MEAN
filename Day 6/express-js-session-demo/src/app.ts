import express, {
  type Request,
  type Response
} from "express";
import coursesRouter from "./routes/courses.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());

app.use("/api/courses", coursesRouter);

app.get("/api/health", (_request: Request, response: Response) => {
  response.json({
    success: true,
    message: "API is running"
  });
});

app.use(errorHandler);

export default app;