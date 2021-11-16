import { sign, verify } from "jsonwebtoken";

export const createToken = (user: string): string => {
  const hash = process.env.JWT_HASH || "";
  return sign({ user }, hash, {
    expiresIn: 86400,
  });
};

export const createEmailToken = (id: string): string => {
  const hash = process.env.JWT_HASH || "";
  return sign({ id }, hash, { expiresIn: 172800 });
};

export const verifyToken = (token: string) => {
  const hash = process.env.JWT_HASH || "";
  return verify(token, hash);
};
