import { Document, Types } from "mongoose";

export interface TokenDoc extends Document {
  token: string;
  user: Types.ObjectId;
  type: string;
  expires: Date;
  blacklisted: boolean;
}
