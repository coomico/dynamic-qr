import { NextFunction, Request, Response } from "express";

import {
  validateUrlCreate,
  validateUrlUpdate
} from "../../validation";

import { ErrorCapture } from "../../utils/error_capture";

export const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid = validateUrlCreate(req.body);
    if (!valid && validateUrlCreate.errors) {
      throw new ErrorCapture(validateUrlCreate.errors[0].message ?? 'Missing or invalid payload');
    }

    return next()
  } catch (error) {
    return next(error);
  }
};

export const Update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid = validateUrlUpdate(req.body);
    if (!valid && validateUrlUpdate.errors) {
      throw new ErrorCapture(validateUrlUpdate.errors[0].message ?? 'Missing or invalid payload');
    }

    return next()
  } catch (error) {
    return next(error);
  }
};