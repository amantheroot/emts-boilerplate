import { Document, ObjectId } from "mongoose";

export interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  isPasswordMatch: (password: string) => boolean;
}
