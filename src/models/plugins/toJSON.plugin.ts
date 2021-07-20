/* eslint-disable no-param-reassign */

import { Schema } from "mongoose";
import { Document } from "@/interfaces/extensions/document.interface";
import { SchemaType } from "@/interfaces/plugins/schemaType.interface";

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, createdAt, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */

const deleteAtPath = (obj: Record<string, any>, path: string[], index: number) => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  deleteAtPath(obj[path[index]], path, index + 1);
};

const toJSON = (schema: Schema<Document>): void => {
  schema.methods.toJSON = function () {
    const res = this.toObject();

    Object.keys(schema.paths).forEach((path: string) => {
      const schemaPath = schema.paths[path] as SchemaType;
      if (schemaPath.options && schemaPath.options.private) {
        deleteAtPath(res, path.split("."), 0);
      }
    });

    res.id = res._id.toString();
    delete res._id;
    delete res.__v;
    delete res.createdAt;
    delete res.updatedAt;

    return res;
  };
};

export default toJSON;
