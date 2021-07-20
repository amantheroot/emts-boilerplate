import { Request } from "express";
import { User } from "@/interfaces/models/user.interface";

export interface AuthRequest extends Request {
  user: User;
}
