import Joi from "joi";
import { password, objectId } from "./custom.validation";
import { objectIdMessages, passwordMessages } from "./validationMessages";

export const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password).messages(passwordMessages),
    name: Joi.string().required(),
    role: Joi.string().required().valid("user", "admin"),
  }),
};

export const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).messages(objectIdMessages("userId")),
  }),
};

export const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId).messages(objectIdMessages("userId")),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password).messages(passwordMessages),
      name: Joi.string(),
    })
    .min(1),
};

export const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).messages(objectIdMessages("userId")),
  }),
};
