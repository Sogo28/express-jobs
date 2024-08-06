import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validateUser = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ errors: result.error.errors });

  req.body = result.data;

  next();
}

export default validateUser;