import { model, Schema, Model } from "mongoose";
import { IMeet } from "../interfaces";

const MeetSchema: Schema = new Schema({
  local: { type: String, required: true },
  date: { type: Date, required: true },
  observation: { type: String, required: true },
  members: { type: [Schema.Types.ObjectId], required: true },
});

export const Meet: Model<IMeet> = model("Meet", MeetSchema);
