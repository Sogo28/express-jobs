import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {

  // const token = req.cookies.accessToken;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "You should be logged in!" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { id: string };
    req.user = decoded;
    next()
  } catch (error) {
    return res.status(401).json({ message: "The token has expired !" })
  }
}