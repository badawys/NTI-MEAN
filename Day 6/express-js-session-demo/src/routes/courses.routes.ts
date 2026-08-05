import { Router } from "express";
import type {
  Request,
  Response
} from "express";

const router = Router();

router.get("/", (
  _request: Request,
  response: Response
) => {
  response.json({ success: true, data: [] });
})

export default router;