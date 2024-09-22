import { NextFunction, Request, Response } from "express";

import { validatePassword } from "../../validation";

import { ErrorCapture } from "../../utils/error_capture";

export const Password = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid = validatePassword(req.body);
    if (!valid && validatePassword.errors) {
      throw new ErrorCapture(validatePassword.errors[0].message ?? 'Missing or invalid payload');
    }

    return next()
  } catch (error) {
    return next(error);
  }
};