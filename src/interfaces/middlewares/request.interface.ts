import { Request } from "express";
import { UserDoc } from "@/interfaces/documents/user.interface";

export interface AuthRequest extends Request {
  user: UserDoc;
}
