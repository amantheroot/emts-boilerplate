/* eslint-disable no-param-reassign */

import { Document, Schema } from "mongoose";
import { Object } from "@/interfaces/object.interface";

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, createdAt, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */

const deleteAtPath = (obj: Object, path: string[], index: number) => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  deleteAtPath(obj[path[index]], path, index + 1);
};

const toJSON = (schema: Schema) => {
  let transform!: any;
  if (schema.statics.toJSON && (schema.statics.toJSON as any).transform) {
    transform = (schema.statics.toJSON as any).transform;
  }

  schema.statics.toJSON = Object.assign(schema.statics.toJSON || {}, {
    transform(doc: Document, ret: Document, options: any) {
      Object.keys(schema.paths).forEach((path) => {
        if ((schema.paths[path] as any).options && (schema.paths[path] as any).options.private) {
          deleteAtPath(ret, path.split("."), 0);
        }
      });

      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      // delete ret.createdAt;
      // delete ret.updatedAt;
      if (transform) {
        return transform(doc, ret, options);
      }
    },
  }) as any;
};

export default toJSON;
