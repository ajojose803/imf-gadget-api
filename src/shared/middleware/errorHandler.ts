import { Request, Response, NextFunction } from "express";

// Simple error handling middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", err.stack || err);
  
  res.status(500).json({
    message: "An unexpected error occurred.",
    ...(process.env.NODE_ENV !== "production" && { error: err.message }),
  });
};
