import { NextFunction, Request, Response } from "express";
import { renderToString } from 'vue/server-renderer';

import { IUser } from "../models";
import { createQr, UrlService } from "../services";
import base from "../ssr/base";
import { createApp } from '../ssr/template';

import { urlResponse } from "../transformer/response";
import { ErrorCapture } from "../utils/error_capture";
import { schemeFiller } from "../utils/filler";
import { appUrl } from "../utils/envs";

export const createShortUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const claimId = req.userId;
    const data = req.body;

    data.owner = claimId;
    const url = UrlService.create(data);

    if (data.plusQr) {
      url.qrCode = await createQr(url.shortUrl);
    }

    await UrlService.saveUpdate(url);
    
    res.content = {
      status: 'success',
      code: 201,
      data: urlResponse(url)
    };
    res.logMessage = `[${url._id}] created by ${claimId}`;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const getOriginUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { shortId } = req.params;
    const url = await UrlService.getById(shortId);

    if (url.isPrivate && 
      !req.redirect) {
        await url.populate<{user: IUser}>('owner', 'name username');
        const { username } = url.owner as unknown as IUser;
        
        const link = `${appUrl}/auth/redirect/${url.id}`;
        const app = createApp(link, username);
        const html = await renderToString(app);

        res.type('html');
        return res.status(200).send(base(html));
    }
    
    url.visitCount += 1;
    UrlService.saveUpdate(url, {timestamps: false});

    res.content = {
      status: 'redirect',
      code: 302,
      to: schemeFiller(url.originUrl)
    };
    return next();
  } catch (error) {
    return next(error);
  }
};

export const getOneOwnedUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const claimId = req.userId;
    const { shortId } = req.params;

    const url = (await UrlService.getSomeByOwner(claimId, {_id: shortId}))[0];
    if (!url) throw new ErrorCapture('the link was not found in your account', 404);

    res.content = {
      status: 'success',
      code: 200,
      data: urlResponse(url)
    };

    res.logMessage = `${claimId} fetch ${url._id}`;
    return next();
  } catch (error) {
    return next(error);
  }
};

// TODO: implement pagination
export const getAllOwnedUrls = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const claimId = req.userId;

    const urls = await UrlService.getSomeByOwner(claimId);

    res.content = {
      status: 'success',
      code: 200,
      data: urls.map(url => urlResponse(url)),
      metadata: {
        data_length: urls.length
      }
    };

    res.logMessage = `${claimId} fetch all owned urls`;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const updateUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const claimId = req.userId;
    const data = req.body;
    const { shortId } = req.params;

    const url = await UrlService.getById(shortId);
    if (claimId !== url.owner.toString()) throw new ErrorCapture('you are not allowed to update links that are not yours', 409);

    url.title = data.title ?? url.title;
    url.originUrl = data.originUrl ?? url.originUrl;
    url.isPrivate = data.isPrivate ?? url.isPrivate;
  
    if (url.isPrivate && !url.password && !data.password) throw new ErrorCapture('required fields are missing or invalid', 400);

    if (url.isPrivate && !!data.password) {
      const match = await url.comparePassword(data.password);
      if (match) throw new ErrorCapture('password is still the same as it is now, try a newer one', 409);

      url.password = data.password;
    }

    url.description = data.description ?? url.description;

    if (!url.qrCode && data.plusQr) {
      url.qrCode = await createQr(url.shortUrl);
    }

    await UrlService.saveUpdate(url);

    res.content = {
      status: 'empty',
      code: 204
    };

    res.logMessage = `[${url._id}] update successful`;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const removeUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const claimId = req.userId;
    const { shortId } = req.params;

    await UrlService.destroy(shortId, claimId);

    res.content = {
      status: 'empty',
      code: 205
    };

    res.logMessage = `[${shortId}] deletion successful`;
    return next();
  } catch (error) {
    return next(error);
  }
};