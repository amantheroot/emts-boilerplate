import { SchemaType as SchemaTypeMongo } from "mongoose";

export interface SchemaType extends SchemaTypeMongo {
  options: {
    private: boolean;
  };
}
