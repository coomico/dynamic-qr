import { HttpStatusCode, type AxiosError } from "axios";

import type { CustomAxiosRequestConfig, ErrorResponse, Notif } from "@/interfaces";
import { ClearStateAndStorage, useNotifStore } from "@/stores";

export function catchError(error: unknown) {
  const errorAxios = error as AxiosError;

  const notifStore = useNotifStore();
  const notif: Notif = {
    status: 'error',
    title: 'oops, an error occurred.',
    message: 'Help, error! error! error!'
  }

  if (errorAxios.response) {
    const config = errorAxios.config as CustomAxiosRequestConfig;
    const response = errorAxios.response;
    const errorResponse = response.data as ErrorResponse;

    notif.title = HttpStatusCode[response.status];
    notif.message = errorResponse.message;

    if (response.status === 503) {
      notif.title = response.statusText;
      notif.message = "Stay relaxed and calm, don't rush.";
    }

    if (response.status === 403) {
      // skip refresh error notif
      if (config.url === '/auth/refresh') return;

      // for suddenly there is no refreshToken
      notif.title = undefined;
      notif.message = "I'm sorry, you need to login again.";

      ClearStateAndStorage();
    }

    if (errorAxios.message === 'Max refresh attempt reached!') {
      notif.title = undefined;
      notif.message = "I'm sorry, you need to login again.";

      ClearStateAndStorage();
    };
    
  } else if (errorAxios.request) {
    notif.title = errorAxios.name;
    notif.message = errorAxios.message;
    
    if (errorAxios.code === 'ERR_CANCELED') {
      notif.message = 'Request cancelled due to timeout (10s).';
    }
  }

  return notifStore.Notify(notif);
}