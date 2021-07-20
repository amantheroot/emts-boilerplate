import { Types } from "mongoose";

export interface Token {
  token: string;
  user: Types.ObjectId;
  type: string;
  expires: Date;
  blacklisted: boolean;
}
