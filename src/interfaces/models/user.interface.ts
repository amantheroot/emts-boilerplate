import { Document, ObjectId } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  isEmailTaken: (email: string, userId: ObjectId | string) => boolean;
  isPasswordMatch: (password: string) => boolean;
}
