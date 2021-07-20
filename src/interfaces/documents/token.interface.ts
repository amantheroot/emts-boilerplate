import { Document, ObjectId } from "mongoose";

export interface TokenDoc extends Document {
  token: string;
  user: ObjectId | string;
  type: string;
  expires: Date;
  blacklisted: boolean;
}
