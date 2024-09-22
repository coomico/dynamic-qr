import { IUrl } from "../../models";

export const urlResponse = (url: IUrl) => {
  return {
    _id: url.id,
    title: url.title,
    shortUrl: url.shortUrl,
    originUrl: url.originUrl,
    isPrivate: url.isPrivate,
    hasPassword: url.hasPassword,
    description: url.description,
    visitCount: url.visitCount,
    qrCode: url.qrCode,
    createdAt: url.createdAt! as string,
    updatedAt: url.updatedAt! as string
  };
};