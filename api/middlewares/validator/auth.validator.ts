import { NextFunction, Request, Response } from "express";

import {
  validateAuthLoginEmail,
  validateAuthLoginUsername,
  validateAuthRegist
} from "../../validation";

import { ErrorCapture } from "../../utils/error_capture";

export const Regist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid = validateAuthRegist(req.body);
    if (!valid && validateAuthRegist.errors) {
      throw new ErrorCapture(validateAuthRegist.errors[0].message ?? 'Missing or invalid payload');
    }

    return next()
  } catch (error) {
    return next(error);
  }
};

export const LoginEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid = validateAuthLoginEmail(req.body);
    if (!valid && validateAuthLoginEmail.errors) {
      throw new ErrorCapture(validateAuthLoginEmail.errors[0].message ?? 'Missing or invalid payload');
    }
    
    return next()
  } catch (error) {
    return next(error);
  }
};

export const LoginUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid = validateAuthLoginUsername(req.body);
    if (!valid && validateAuthLoginUsername.errors) {
      throw new ErrorCapture(validateAuthLoginUsername.errors[0].message ?? 'Missing or invalid payload');
    }

    return next()
  } catch (error) {
    return next(error);
  }
};