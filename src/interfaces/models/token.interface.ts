import { Document, ObjectId } from "mongoose";

export interface Token extends Document {
  token: string;
  user: ObjectId | string;
  type: string;
  expires: Date;
  blacklisted: boolean;
}
