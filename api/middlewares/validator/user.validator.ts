import { NextFunction, Request, Response } from "express";

import {
  validateUserChangePassword,
  validateUserUpdate
} from "../../validation";

import { ErrorCapture } from "../../utils/error_capture";

export const Update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid = validateUserUpdate(req.body);
    if (!valid && validateUserUpdate.errors) {
      throw new ErrorCapture(validateUserUpdate.errors[0].message ?? 'Missing or invalid payload');
    }

    return next()
  } catch (error) {
    return next(error);
  }
};

export const ChangePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid = validateUserChangePassword(req.body);
    if (!valid && validateUserChangePassword.errors) {
      throw new ErrorCapture(validateUserChangePassword.errors[0].message ?? 'Missing or invalid payload');
    }

    return next()
  } catch (error) {
    return next(error);
  }
};