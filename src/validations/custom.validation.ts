import { CustomValidator, LanguageMessages } from "joi";

export const objectId: CustomValidator = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message(`"{{#label}}" must be a valid mongo id` as any as LanguageMessages);
  }
  return value;
};

export const password: CustomValidator = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("password must be at least 8 characters" as any as LanguageMessages);
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message("password must contain at least 1 letter and 1 number" as any as LanguageMessages);
  }
  return value;
};
