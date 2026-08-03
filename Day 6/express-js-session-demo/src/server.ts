import express, {
  type Request,
  type Response
} from "express";

const app = express();
const port = 3000;

app.get("/api/health", (
  _request: Request,
  response: Response
) => {
  response.json({
    success: true,
    message: "API is running"
  });
});

app.get("/api/search", (
  _request: Request,
  response: Response
) => {
    // Check the query parameters
    if (_request.query.q) {
        const searchTerm = _request.query.anything as string;
        response.json({ success: true, data: [{ id: searchTerm, name: "Search result for " + searchTerm }] });
        return;
    }
  response.json({ success: true, data: [] });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});