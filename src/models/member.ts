import { model, Schema, Model } from "mongoose";
import { IMember } from "../interfaces";

const MemberSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  role: { type: Schema.Types.ObjectId, required: true },
  isLead: { type: Boolean, required: true },
  status: { type: String, required: true },
});

export const Member: Model<IMember> = model("Member", MemberSchema);
