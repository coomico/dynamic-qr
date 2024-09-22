import type { Link, LinkRequest, MetaLink, SuccessResponse, UpdateLinkRequest } from "@/interfaces";
import api, { config, TIMEOUT } from "./api";

export const createLink = async (createData: LinkRequest) => {
  config.withCredentials = true;
  config.requireAuth = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  return await api.post<SuccessResponse<Link>>(
    '/url/new',
    createData,
    config
  );
};

export const fetchLink = async (linkId: string) => {
  config.withCredentials = true;
  config.requireAuth = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  return await api.get<SuccessResponse<Link>>(
    `/url/one/${linkId}`,
    config
  );
};

export const fetchLinks = async () => {
  config.withCredentials = true;
  config.requireAuth = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  return await api.get<SuccessResponse<Link[], MetaLink>>(
    '/url/all',
    config
  );
};

export const updateLink = async (linkId: string, updateData: UpdateLinkRequest) => {
  config.withCredentials = true;
  config.requireAuth = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  return await api.put(
    `/url/update/${linkId}`,
    updateData,
    config
  );
};

export const deleteLink = async (linkId: string) => {
  config.withCredentials = true;
  config.requireAuth = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  return await api.delete(
    `/url/remove/${linkId}`,
    config
  );
};