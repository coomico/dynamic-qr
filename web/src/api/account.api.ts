import type {
  Account,
  ChangePasswordRequest,
  SuccessResponse,
  UpdateAccountRequest
} from "@/interfaces";
import api, { config, TIMEOUT } from "./api";

export const fetchUser = async (username: string) => {
  return await api.get<SuccessResponse<Omit<Account, 'email'>>>(`/who/${username}`);
};

export const fetchAccount = async () => {
  config.withCredentials = true;
  config.requireAuth = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  return await api.get<SuccessResponse<Account>>(
    '/user',
    config
  );
};

export const updateAccount = async (updateData: UpdateAccountRequest) => {
  config.withCredentials = true;
  config.requireAuth = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  return await api.put(
    '/user/update',
    updateData,
    config
  );
};

export const changePassword = async (changePasswordData: ChangePasswordRequest) => {
  config.withCredentials = true;
  config.requireAuth = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  return await api.put(
    '/user/changepassword',
    changePasswordData,
    config
  );
};

export const deleteAccount = async (password: string) => {
  config.withCredentials = true;
  config.requireAuth = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  // since there's no place for data in delete's args, so we put it in config
  config.data = {
    password: password
  };

  return await api.delete(
    '/user/remove',
    config
  );
};

export const logout = async () => {
  config.withCredentials = true;
  config.requireAuth = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  return await api.post(
    '/user/logout',
    undefined,
    config
  );
};

export const logoutEverywhere = async () => {
  config.withCredentials = true;
  config.requireAuth = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  return await api.post(
    '/user/logoutall',
    undefined,
    config
  );
};