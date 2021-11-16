import { Response } from "express";

export const serverResponse = (res: Response, message: string, data?: any) => {
  data
    ? res.status(200).json({ message, data, statusCode: 200 })
    : res.status(400).json({ message: "error", statusCode: 400 });
};
