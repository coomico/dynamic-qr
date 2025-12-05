import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { UrlService, UserService } from '../services';
import { AuthHandler } from '../middlewares';

import { userResponse } from '../transformer/response';
import { ErrorCapture } from '../utils/error_capture';
import { schemeFiller } from '../utils/filler';
import { accessExp, originExp, refreshKey, webHost } from '../utils/envs';

//USER AUTHENTICATION
export const regist = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await UserService.create(req.body);
        const accessToken = AuthHandler.createAccessToken(user.id);
        const { refreshToken, refreshTokenHash } =
            AuthHandler.createRefreshToken(user.id, req.userAgent);

        user.tokens.push(refreshTokenHash);
        await UserService.saveUpdate(user);

        res.cookie('refreshToken', refreshToken, AuthHandler.cookieOptions);
        res.content = {
            status: 'success',
            code: 201,
            data: {
                ...userResponse(user, true),
                token: accessToken,
            },
            metadata: {
                access_expires: accessExp,
            },
        };

        res.logMessage = `[${user.id}] regist successful`;
        return next();
    } catch (error) {
        return next(error);
    }
};

export const loginByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.getByEmail(email);
        const match = await user.comparePassword(password);
        if (!match)
            throw new ErrorCapture('email or password does not match', 401);

        const accessToken = AuthHandler.createAccessToken(user.id);
        const { refreshToken, refreshTokenHash } =
            AuthHandler.createRefreshToken(user.id, req.userAgent);

        user.tokens.push(refreshTokenHash);
        await UserService.saveUpdate(user);

        res.cookie('refreshToken', refreshToken, AuthHandler.cookieOptions);
        res.content = {
            status: 'success',
            code: 200,
            data: {
                ...userResponse(user, true),
                token: accessToken,
            },
            metadata: {
                access_expires: accessExp,
            },
        };

        res.logMessage = `[${user.id}] login by email successful`;
        return next();
    } catch (error) {
        return next(error);
    }
};

export const loginByUsername = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password } = req.body;
        const user = await UserService.getByUsername(username);
        const match = await user.comparePassword(password);
        if (!match)
            throw new ErrorCapture('username or password does not match', 401);

        const accessToken = AuthHandler.createAccessToken(user.id);
        const { refreshToken, refreshTokenHash } =
            AuthHandler.createRefreshToken(user.id, req.userAgent);

        user.tokens.push(refreshTokenHash);
        await UserService.saveUpdate(user);

        res.cookie('refreshToken', refreshToken, AuthHandler.cookieOptions);
        res.content = {
            status: 'success',
            code: 200,
            data: {
                ...userResponse(user, true),
                token: accessToken,
            },
            metadata: {
                access_expires: accessExp,
            },
        };

        res.logMessage = `[${user.id}] login by username successful`;
        return next();
    } catch (error) {
        return next(error);
    }
};

export const refreshAcessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userAgent = req.userAgent;
        const { refreshToken } = req.cookies;
        if (!refreshToken)
            throw new ErrorCapture('refresh token is missing or invalid', 403);

        const claims = <AuthHandler.IClaims>(
            jwt.verify(refreshToken, refreshKey)
        );
        if (!claims || !claims.id || !claims.ua || !claims.iat || !claims.exp) {
            throw new ErrorCapture('refresh token is missing or invalid', 403);
        }

        if (userAgent.localeCompare(claims.ua) !== 0)
            throw new ErrorCapture('refresh token is missing or invalid', 403);

        const user = await UserService.getById(claims.id);
        const refreshTokenHash = crypto
            .createHmac('sha256', refreshKey)
            .update(refreshToken)
            .digest('hex');
        if (user.tokens.indexOf(refreshTokenHash) === -1)
            throw new ErrorCapture('refresh token is missing or invalid', 403);

        const accessToken = AuthHandler.createAccessToken(user.id);

        res.content = {
            status: 'success',
            code: 201,
            data: {
                token: accessToken,
            },
            metadata: {
                access_expires: accessExp,
            },
        };

        res.logMessage = `[${user.id}] refresh access token`;
        return next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(
                new ErrorCapture('refresh token is missing or invalid', 403)
            );
        }

        return next(error);
    }
};

// TODO
// export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {};

// URL AUTHORIZATION
export const redirectPermission = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { shortId } = req.params;
        const { password } = req.body;

        const url = await UrlService.getById(shortId);
        const match = await url.comparePassword(password);
        if (!match) throw new ErrorCapture('password does not match', 401);

        const originToken = AuthHandler.createOriginToken(
            url.passKey as string
        );
        res.cookie(
            `o.${url.id}`,
            originToken,
            Object.assign({}, AuthHandler.cookieOptions, {
                domain: webHost,
                path: `/o/${url.id}`,
                maxAge: originExp * 1000,
            })
        );

        res.content = {
            status: 'redirect',
            code: 301,
            to: schemeFiller(url.shortUrl),
        };

        res.logMessage = `create redirect permission successful`;
        return next();
    } catch (error) {
        return next(error);
    }
};
