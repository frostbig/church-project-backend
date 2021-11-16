import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/token";

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization || "";
  if (!token) {
    res.status(400).send({ message: "no header token", status: 400 });
  }
  if (token) {
    try {
      const tokenData = verifyToken(token);
      req.headers.user = (tokenData as JwtPayload)?.user;
    } catch (err) {
      res.status(403).send({
        message: "Access Token is not valid",
        status: 403,
      });
      return;
    }
    next();
  }
  return;
};
