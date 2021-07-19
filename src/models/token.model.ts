import { Schema, SchemaTypes, model } from "mongoose";
import { tokenTypes } from "@/config/tokens";
import { Token } from "@/interfaces/models/token.interface";
import toJSON from "./plugins/toJSON.plugin";

const tokenSchema = new Schema<Token>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Token = model<Token>("Token", tokenSchema);

export default Token;
