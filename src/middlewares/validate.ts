import Joi from "joi";
import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import pick from "@/utils/pick";
import ApiError from "@/utils/ApiError";

const validate =
  (schema: Record<string, Joi.ObjectSchema>): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const object = pick(req as Record<string, any>, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(", ");
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
