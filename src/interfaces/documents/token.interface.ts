import { Types } from "mongoose";
import { Document } from "@/interfaces/extensions/document.interface";

export interface TokenDoc extends Document {
  token: string;
  user: Types.ObjectId;
  type: string;
  expires: Date;
  blacklisted: boolean;
}
