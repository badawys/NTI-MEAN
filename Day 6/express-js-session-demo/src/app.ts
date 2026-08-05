import express, {
  type Request,
  type Response
} from "express";
import coursesRouter from "./routes/courses.routes";


const app = express();
app.use("/api/courses", coursesRouter);

app.get("/api/health", (_request: Request, response: Response) => {
  response.json({
    success: true,
    message: "API is running"
  });
});

export default app;