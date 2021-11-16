import { model, Schema, Model } from "mongoose";
import { IUser } from "../interfaces";
import { hash } from "bcrypt";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
});

UserSchema.pre("save", async function (next) {
  const password = await hash(this.password, 10);
  this.password = password;
  next();
});

export const User: Model<IUser> = model("User", UserSchema);
