import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ message: "Error interno del servidor" });
};
