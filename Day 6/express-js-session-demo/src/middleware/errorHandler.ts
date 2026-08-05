import type {
  ErrorRequestHandler
} from "express";

import { AppError } from "../errors/AppError";

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next
) => {
  const statusCode =
    error instanceof AppError ? error.statusCode : 500;

    response.status(statusCode).json({
        success: false,
        error: {
        message:
            statusCode === 500
            ? "Internal server error"
            : error.message
        }
    });
};
