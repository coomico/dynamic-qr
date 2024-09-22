import { NextFunction, Request, Response } from "express";

import { ErrorCapture } from "../utils/error_capture";
import { logTimestamp } from "../utils/log";

export const Logger = async (req: Request, res: Response, next: NextFunction) => {
  logTimestamp(`${req.ip} ${req.method} (${res.statusCode}) ${req.path} ${res.logMessage}`);
  return next()
};

export const CheckUserAgent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userAgent = req.get("User-Agent");
    if (!userAgent) {
      throw new ErrorCapture('User-Agent is expected in the request header', 400);
    }

    req.userAgent = userAgent;
    return next();
  } catch (error) {
    return next(new ErrorCapture((error as Error).message, 500));
  }
};

export const ErrorHandler = async (error: ErrorCapture, req: Request, res: Response, next: NextFunction) => {
  if (error.statusCode >= 400 && error.statusCode <= 499) {
    res.logMessage = error.message;
    res.content = {
      status: 'error',
      code: error.statusCode,
      message: error.message
    };
    return next();
  }

  res.logMessage = 'Internal error';
  res.content = {
    status: 'error',
    code: 500,
    message: 'Server Error!'
  };
  next();

  return console.error(error as Error);
};

export const ResponseHandler = async (req: Request, res: Response, next: NextFunction) => {
  // undefined content
  if (!res.content) {
    return next();
  }

  const {code, ...rest} = res.content;
  switch (rest.status) {
    case 'success':
      res.status(code).json(rest);
      break;
    case 'error':
      res.status(code).json(rest);
      break;
    case 'redirect':
      res.status(code).redirect(rest.to);
      break;
    case 'empty':
      res.status(code).json(null);
      break;
    default:
      break;
  }

  return next();
}