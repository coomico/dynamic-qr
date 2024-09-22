import { CookieOptions, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { ErrorCapture } from '../utils/error_capture';
import {
  accessExp,
  accessKey,
  originExp,
  originKey,
  refreshExp,
  refreshKey
} from '../utils/envs';

export interface IClaims {
  id: string,
  ua?: string,
  rd?: boolean,
  iat: number,
  exp: number
};

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: refreshExp * 1000,
  sameSite: "none"
};

// checking token
export const isUserAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw new ErrorCapture('access token is missing or invalid', 401);
    }
  
    const authHeaderPart = authHeader.split(' ');
    if (authHeaderPart.length !== 2 || authHeaderPart[0] !== 'Bearer') {
      throw new ErrorCapture('access token is missing or invalid', 401);
    }

    const claims = <IClaims>jwt.verify(authHeaderPart[1], accessKey);
    if (!claims || !claims.id || !claims.iat || !claims.exp) {
      throw new ErrorCapture('access token is missing or invalid', 401);
    }

    req.userId = claims.id;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ErrorCapture('access token is missing or invalid', 401));
    } else {
      next(error);
    }
  }
};

export const isRedirectAllowed = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { shortId } = req.params;
    const originToken = req.cookies[`o.${shortId}`];

    // if theres no token then not yet allowed to redirect
    if (!originToken) {
      return next();
    }

    const claims = <IClaims>jwt.verify(originToken, originKey);
    if (!claims || !claims.id || !claims.rd || !claims.iat || !claims.exp) {
      // if theres no `rd=true` or jwt expired then re-auth manually
      return next()
    }

    req.userId = claims.id;
    req.redirect = claims.rd;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ErrorCapture('origin token is missing or invalid', 401));
    } else {
      next(error);
    }
  }
};

// token generator
export const createOriginToken = (urlId: string, redirect: boolean) => {
  try {
    const originToken = jwt.sign(
      {
        id: urlId,
        rd: redirect
      },
      originKey,
      {
        expiresIn: originExp
      }
    );

    return originToken;
  } catch (error) {
    throw new ErrorCapture((error as Error).message, 500);
  }
};

export const createAccessToken = (userId: string) => {
  try {
    const accessToken = jwt.sign(
      {id: userId},
      accessKey,
      {expiresIn: accessExp}
    );
  
    return accessToken;
  } catch (error) {
    throw new ErrorCapture((error as Error).message, 500);
  }
};

export const createRefreshToken = (userId: string, userAgent: string) => {
  try {
    const refreshToken = jwt.sign(
      {
        id: userId,
        ua: userAgent
      },
      refreshKey,
      {
        expiresIn: refreshExp
      }
    );

    const refreshTokenHash = crypto.createHmac('sha256', refreshKey).update(refreshToken).digest('hex');
  
    return {
      refreshToken,
      refreshTokenHash
    };
  } catch (error) {
    throw new ErrorCapture((error as Error).message, 500);
  }
}