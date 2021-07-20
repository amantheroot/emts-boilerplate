import { Model, Types } from "mongoose";
import { UserDoc } from "@/interfaces/documents/user.interface";
import { PaginateResult } from "../plugins/paginateResult.interface";

export interface UserModel extends Model<UserDoc> {
  isEmailTaken: (email: string, userId?: Types.ObjectId | string) => boolean;
  paginate: (filter: Record<string, unknown>, options: Record<string, string>) => PaginateResult<UserDoc>;
}
