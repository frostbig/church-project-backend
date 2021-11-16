import { NextFunction, Request, Response } from "express";

export interface IRoutes {
  path: string;
  method: "post" | "get" | "put";
  handler: (req: Request, res: Response, next: NextFunction) => void;
  routeMiddleware?: (req: Request, res: Response, next: NextFunction) => void;
}
