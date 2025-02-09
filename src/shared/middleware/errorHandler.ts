import { Request, Response, NextFunction } from "express";

// Simple error handling middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`
  ERROR: ${err.message}
  Stack: ${process.env.NODE_ENV === "development" ? err.stack : "Hidden"}
  `);
  
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
