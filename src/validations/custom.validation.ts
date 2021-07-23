import { CustomValidator } from "joi";

export const objectId: CustomValidator = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.error("string.pattern");
  }
  return value;
};

export const password: CustomValidator = (value, helpers) => {
  if (value.length < 8) {
    return helpers.error("string.min");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.error("string.token");
  }
  return value;
};
