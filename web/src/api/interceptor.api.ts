import type { AxiosError } from "axios";

import api, { MAX_ATTEMPT } from "./api";
import { useAuthStore } from "@/stores";
import type { CustomAxiosRequestConfig, ErrorResponse } from "@/interfaces";

import { AuthStorage } from "@/utils/storage";
import { catchError } from "@/utils/errorHandler";

const plugAuthInterceptRequest = () => {
  api.interceptors.request.use(
    (config) => {
      if ( (config as CustomAxiosRequestConfig).requireAuth ) {
        const token = AuthStorage.auth;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          delete (config as CustomAxiosRequestConfig).requireAuth;
        }
      }

      return config;
    },
    async (error: AxiosError) => {
      catchError(error);

      return Promise.reject(error);
    }
  );
};

const refreshAuthInterceptResponse = () => {
  const interceptResponse = api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      const { response } = error;
      const authHeader = response?.config.headers.Authorization?.toString();
      const config = error.config as CustomAxiosRequestConfig;

      if (
        response?.status === 401 &&
        authHeader?.startsWith('Bearer ') &&
        (response.data as ErrorResponse).message.startsWith('access token')
      ) {
        api.interceptors.response.eject(interceptResponse);

        try {
          config.refreshAttempt = config.refreshAttempt ?? 0;
          if (config.refreshAttempt >= MAX_ATTEMPT) {
            error.message = 'Max refresh attempt reached!';
            throw new Error('Max refresh attempt reached!');
          }

          const authStore = useAuthStore();
          await authStore.RefreshToken();
          const newToken = authStore.auth;

          if (newToken && config?.headers) {
            config.headers.Authorization = `Bearer ${newToken}`;
          }

          config.refreshAttempt++;
          refreshAuthInterceptResponse();

          return api(config);
        } catch (error) {
          refreshAuthInterceptResponse();
        }
      }

      return Promise.reject(error);
    }
  );
};

export function authInterceptor() {
  plugAuthInterceptRequest();
  refreshAuthInterceptResponse();
}