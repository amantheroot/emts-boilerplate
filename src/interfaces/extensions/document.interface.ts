import { Document as DocumentMongo } from "mongoose";

export interface Document extends DocumentMongo {
  createdAt: Date;
  updatedAt: Date;
}
