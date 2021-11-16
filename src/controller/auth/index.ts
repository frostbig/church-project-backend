import { Request, Response } from "express";
import { User } from "../../models";
import { compare } from "bcrypt";
import { createToken } from "../../utils/token";
import { verifyToken } from "../../utils/token";

export const auth = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  if (!(await compare(password, user.password))) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = createToken(user.id);
  res.json({
    user: { id: user.id, username: user.username },
    token,
  });
};

export const verify = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    return;
  }
  try {
    const tokenData = verifyToken(token);
    if (tokenData) {
      return res.status(200).send({
        message: "Access Token is valid",
        status: 200,
      });
    }
    return;
  } catch (err) {
    res.status(403).send({
      message: "Access Token is not valid",
      status: 403,
    });
  }
};
