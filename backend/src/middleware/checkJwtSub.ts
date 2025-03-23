import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

export const checkJwtSub = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const auth = req.auth as unknown as JwtPayload;

  if (!auth || !auth.payload.sub) {
    res.status(400).json({ error: "Invalid token" });
    return;
  }

  req.sub = auth.payload.sub;
  next();
};
