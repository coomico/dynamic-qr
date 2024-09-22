import type {
  AuthRequest,
  SuccessResponse,
  DataAuth,
  MetaAuth,
  LoginEmailRequest,
  LoginUsernameRequest
} from "@/interfaces";
import api, { config, TIMEOUT } from "./api";

export const regist = async (registData: AuthRequest) => {
  config.withCredentials = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  return await api.post<SuccessResponse<DataAuth, MetaAuth>>(
    '/auth/regist',
    registData,
    config
  );
};

export const loginEmail = async (loginEmailData: LoginEmailRequest) => {
  config.withCredentials = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  return await api.post<SuccessResponse<DataAuth, MetaAuth>>(
    '/auth/login/email',
    loginEmailData,
    config
  );
};

export const loginUsername = async (loginUsernameData: LoginUsernameRequest) => {
  config.withCredentials = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  return await api.post<SuccessResponse<DataAuth, MetaAuth>>(
    '/auth/login/username',
    loginUsernameData,
    config
  );
};

export const refreshToken = async () => {
  config.withCredentials = true;
  config.signal = AbortSignal.timeout(TIMEOUT);

  return await api.get<SuccessResponse<Pick<DataAuth, 'token'>, MetaAuth>>(
    '/auth/refresh',
    config
  );
};