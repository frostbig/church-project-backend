import { model, Schema, Model } from "mongoose";
import { IPerson } from "../interfaces";

const PersonSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export const Person: Model<IPerson> = model("Person", PersonSchema);
