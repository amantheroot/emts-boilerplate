import { Model, ObjectId } from "mongoose";
import { UserDoc } from "@/interfaces/documents/user.interface";
import { Object } from "../object.interface";
import { PaginateResult } from "../plugins/paginateResult.interface";

export interface UserModel extends Model<UserDoc> {
  isEmailTaken: (email: string, userId?: ObjectId | string) => boolean;
  paginate: (filter: Object, options: Object) => PaginateResult<UserDoc>;
}
