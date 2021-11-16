import { IRole } from "./role";

export interface IMember {
  userId: string;
  role: IRole;
  isLead: boolean;
  status: "CONFIRMED" | "PENDING" | "DENIED";
}
