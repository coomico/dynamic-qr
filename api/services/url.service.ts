import { ObjectId, SaveOptions } from "mongoose";
import { nanoid } from "nanoid";

import { IUrl, UrlDB } from "../models";

import { ErrorCapture } from "../utils/error_capture";
import { logTimestamp } from "../utils/log";
import { appUrl } from "../utils/envs";

export const create = (data: IUrl) => {
  const id = nanoid(8);

  const short = `${appUrl}/o/${id}`;

  return new UrlDB({
    _id: id,
    title: data.title,
    shortUrl: short,
    originUrl: data.originUrl,
    isPrivate: data.isPrivate,
    password: data.password,
    description: data.description,
    owner: data.owner
  });
};

export const getById = async (id: string | ObjectId) => {
  const url = await UrlDB.findById(id);
  if (!url) throw new ErrorCapture('link not found', 404);

  return url;
};

export const getSomeByOwner = async (ownerId: string | ObjectId, filter?: object) => {
  const urls = await UrlDB.find(
    Object.assign({owner: ownerId}, filter),
    ('-owner')
  ).sort('-updatedAt');

  return urls;
};

export const saveUpdate = async (url: IUrl, options?: SaveOptions) => {
  url = await url.save({
    timestamps: options?.timestamps ?? true
  });
  return url;
};

export const destroy = async (shortId: string | ObjectId, ownerId: string | ObjectId) => {
  const res = await UrlDB.deleteOne({
    _id: shortId,
    owner: ownerId
  });

  if (!res.deletedCount) throw new ErrorCapture('link is not exist in your account', 404);
};

export const destroyAllOwned = (ownerId: string | ObjectId) => {
  UrlDB.deleteMany({owner: ownerId})
  .then(res => logTimestamp(`Successfully removed ${res.deletedCount} urls belonging to ${ownerId}`));
};