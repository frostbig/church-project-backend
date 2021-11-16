import { model, Schema, Model } from "mongoose";
import { IRole } from "../interfaces";

const RoleSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export const Role: Model<IRole> = model("Role", RoleSchema);
