import { IMember } from "./member";

export interface IMeet {
  local: string;
  date: Date;
  observation: string;
  members: IMember[];
}
