import { Document } from "@/interfaces/extensions/document.interface";

export interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  isPasswordMatch: (password: string) => boolean;
}
