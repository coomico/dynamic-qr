import { defineStore } from "pinia";
import { computed, ref } from "vue";

import type {
  AuthRequest,
  LoginEmailRequest,
  LoginUsernameRequest
} from "@/interfaces";
import {
  loginEmail,
  loginUsername,
  refreshToken,
  regist
} from "@/api";
import { useAccountStore } from "./account.store";

import { AuthStorage } from "@/utils/storage";
import { codeToStatus } from "@/utils/converter";
import { catchError } from "@/utils/errorHandler";

export const useAuthStore = defineStore('auth', () => {
  // state
  const auth = ref<string>();
  const loading = ref<boolean>(false);

  // getters
  const isLoggedIn = computed(() => !!auth.value);

  // actions
  function ReplaceAuth(a: string) {
    auth.value = a;
    AuthStorage.auth = a;
  }

  function EmptyingAuth() {
    auth.value = undefined;
    AuthStorage.removeAuth();
  }

  async function Regist(registData: AuthRequest) {
    loading.value = true;

    try {
      const { status, data: { data } } = await regist(registData);
      const { token, ...account } = data;

      const accountStore = useAccountStore();
      accountStore.ReplaceAccount(account);

      ReplaceAuth(token);
  
      return codeToStatus(status);
    } catch (error) {
      catchError(error);
    } finally {
      loading.value = false
    }
  }

  async function LoginEmail(loginData: LoginEmailRequest) {
    loading.value = true;

    try {
      const { status, data: { data } } = await loginEmail(loginData);
      const { token, ...account } = data;

      const accountStore = useAccountStore();
      accountStore.ReplaceAccount(account);

      ReplaceAuth(token);
  
      return codeToStatus(status);
    } catch (error) {
      catchError(error);
    } finally {
      loading.value = false
    }
  }

  async function LoginUsername(loginData: LoginUsernameRequest) {
    loading.value = true;

    try {
      const { status, data: { data } } = await loginUsername(loginData);
      const { token, ...account } = data;

      const accountStore = useAccountStore();
      accountStore.ReplaceAccount(account);

      ReplaceAuth(token);
  
      return codeToStatus(status);
    } catch (error) {
      catchError(error);
    } finally {
      loading.value = false
    }
  }

  async function RefreshToken() {
    try {
      const { data: { data } } = await refreshToken();
      ReplaceAuth(data.token);
    } catch (error) {
      catchError(error);
    }
  }

  return {
    auth,
    loading,

    isLoggedIn,

    ReplaceAuth,
    EmptyingAuth,
    Regist,
    LoginEmail,
    LoginUsername,
    RefreshToken
  }
});