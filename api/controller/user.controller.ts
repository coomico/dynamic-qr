import { NextFunction, Request, Response } from "express";
import crypto from 'crypto';

import { UrlService, UserService } from "../services";
import { cookieOptions } from "../middlewares/auth.handler";

import { userResponse } from "../transformer/response";
import { ErrorCapture } from "../utils/error_capture";
import { refreshKey } from "../utils/envs";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const claimId = req.userId;

    const user = await UserService.getById(claimId);

    res.content = {
      status: 'success',
      code: 200,
      data: userResponse(user, true)
    };

    res.logMessage = `[${user._id}] fetching the user data`;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.params;
    if (!username) {
      throw new ErrorCapture('required fields are missing or invalid', 400);
    }

    const user = await UserService.getByUsername(username);

    res.content = {
      status: 'success',
      code: 200,
      data: userResponse(user)
    };

    res.logMessage = `fetching a user [${user.username}]`;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const claimId = req.userId;
    const data = req.body;
    
    const user = await UserService.getById(claimId);
    if ((user.name === data.name) ||
      (user.username === data.username) ||
      (user.email === data.email)) {
        throw new ErrorCapture('password is still the same as it is now, try a newer one', 409);
    }

    user.name = data.name ?? user.name;
    user.username = data.username ?? user.username;
    user.email = data.email ?? user.email;

    await UserService.saveUpdate(user);

    res.content = {
      status: 'empty',
      code: 204
    };

    res.logMessage = `[${user.id}] update successful`;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  // should the access and refresh token be destroyed?
  try {
    const claimId = req.userId;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    // is it enough to comparing new one and its confirm?
    if (newPassword.localeCompare(confirmNewPassword) !== 0) {
      throw new ErrorCapture('new password or confirmation does not match', 400);
    }

    const user = await UserService.getById(claimId);

    const match = await user.comparePassword(currentPassword);
    if (!match) throw new ErrorCapture('password does not match', 401);

    const isNew = await user.comparePassword(newPassword);
    if (isNew) throw new ErrorCapture('password is still the same as it is now, try a newer one', 409);
    
    user.password = newPassword;
    await UserService.saveUpdate(user);
    
    res.content = {
      status: 'empty',
      code: 204
    };
    
    res.logMessage = `[${user.id}] change the password`;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const claimId = req.userId;
    const { password } = req.body;
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new ErrorCapture('refresh token is missing or invalid', 403);

    const user = await UserService.getById(claimId);

    // is it necessary to be ensure that refreshToken is valid?
    const refreshTokenHash = crypto.createHmac('sha256', refreshKey).update(refreshToken).digest('hex');
    if (user.tokens.indexOf(refreshTokenHash) === -1) throw new ErrorCapture('refresh token is missing or invalid', 403);

    const match = await user.comparePassword(password);
    if (!match) throw new ErrorCapture('password does not match', 401);

    UrlService.destroyAllOwned(user.id);
    await UserService.destroy(user);
    
    res.cookie(
      'refreshToken',
      '',
      Object.assign(
        {},
        cookieOptions,
        {
          expires: new Date(1),
          maxAge: 10
        }
      )
    );
    
    res.content = {
      status: 'empty',
      code: 205
    };
    
    res.logMessage = `[${user._id}] deleted`;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const claimId = req.userId;
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new ErrorCapture('refresh token is missing or invalid', 403);
  
    const user = await UserService.getById(claimId);

    const refreshTokenHash = crypto.createHmac('sha256', refreshKey).update(refreshToken).digest('hex');
    if (user.tokens.indexOf(refreshTokenHash) === -1) throw new ErrorCapture('refresh token is missing or invalid', 403);

    user.tokens = user.tokens.filter(token => token != refreshTokenHash);
    await UserService.saveUpdate(user);

    res.cookie(
      'refreshToken',
      '',
      Object.assign(
        {},
        cookieOptions,
        {
          expires: new Date(1),
          maxAge: 10
        }
      )
    );

    res.content = {
      status: 'empty',
      code: 205
    };

    res.logMessage = `[${user.id}] logout`;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const logoutAllDevice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const claimId = req.userId;
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new ErrorCapture('refresh token is missing or invalid', 403);

    const user = await UserService.getById(claimId);

    // is it necessary to be ensure that refreshToken is valid?
    const refreshTokenHash = crypto.createHmac('sha256', refreshKey).update(refreshToken).digest('hex');
    if (user.tokens.indexOf(refreshTokenHash) === -1) throw new ErrorCapture('refresh token is missing or invalid', 403);

    user.tokens = [];
    await UserService.saveUpdate(user);

    res.cookie(
      'refreshToken',
      '',
      Object.assign(
        {},
        cookieOptions,
        {
          expires: new Date(1),
          maxAge: 10
        }
      )
    );

    res.content = {
      status: 'empty',
      code: 205
    };

    res.logMessage = `[${user.id}] logout all device`;
    return next();
  } catch (error) {
    return next(error);
  }
};