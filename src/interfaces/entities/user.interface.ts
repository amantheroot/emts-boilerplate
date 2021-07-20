import { Types } from "mongoose";

export interface User {
  _id?: Types.ObjectId;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  isEmailVerified?: boolean;
}
