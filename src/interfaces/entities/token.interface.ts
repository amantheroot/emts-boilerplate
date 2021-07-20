import { ObjectId } from "mongoose";

export interface Token {
  token: string;
  user: ObjectId | string;
  type: string;
  expires: Date;
  blacklisted: boolean;
}
