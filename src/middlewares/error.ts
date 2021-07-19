import mongoose from "mongoose";
import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import config from "@/config/config";
import logger from "@/config/logger";
import ApiError from "@/utils/ApiError";
import { ApiError as ApiErrorType } from "@/interfaces/utils/apiError.interface";

export const errorConverter = (err: ApiErrorType, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message as string, false, err.stack) as ApiErrorType;
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: ApiErrorType, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR] as string;
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  if (config.env === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
