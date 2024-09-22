import { defineStore } from "pinia";
import { ref } from "vue";

import type {
  Account,
  ChangePasswordRequest,
  UpdateAccountRequest
} from "@/interfaces";
import {
  changePassword,
  deleteAccount,
  fetchAccount,
  logout,
  logoutEverywhere,
  updateAccount
} from "@/api";

import { catchError } from "@/utils/errorHandler";
import { codeToStatus } from "@/utils/converter";

export const useAccountStore = defineStore('account', () => {
  // state 
  const account = ref<Account>();
  const loading = ref<boolean>(false);

  // actions
  function ReplaceAccount(acc?: Account) {
    account.value = acc;
  }

  async function GetProfile() {
    loading.value = true;

    try {
      const { status, data: { data } } = await fetchAccount();
      ReplaceAccount(data);

      return codeToStatus(status);
    } catch (error) {
      catchError(error);
    } finally {
      loading.value = false;
    }
  }

  async function UpdateAccount(data: UpdateAccountRequest) {
    loading.value = true;

    try {
      const { status } = await updateAccount(data);
      await GetProfile();

      return codeToStatus(status);
    } catch (error) {
      catchError(error);
    } finally {
      loading.value = false
    }
  }

  async function ChangePassword(data: ChangePasswordRequest) {
    loading.value = true;

    try {
      const { status } = await changePassword(data);
      return codeToStatus(status);
    } catch (error) {
      catchError(error);
    } finally {
      loading.value = false;
    }
  }

  async function DeleteAccount(password: string) {
    loading.value = true;

    try {
      const { status } = await deleteAccount(password);

      return codeToStatus(status);
    } catch (error) {
      catchError(error);
    } finally {
      loading.value = false;
    }
  }

  async function Logout() {
    loading.value = true;

    try {
      const { status } = await logout();

      return codeToStatus(status);
    } catch (error) {
      catchError(error);
    } finally {
      loading.value = false;
    }
  }

  async function LogoutEverywhere() {
    loading.value = true;

    try {
      const { status } = await logoutEverywhere();

      return codeToStatus(status);
    } catch (error) {
      catchError(error);
    } finally {
      loading.value = false;
    }
  }

  return {
    account,
    loading,

    ReplaceAccount,
    GetProfile,
    UpdateAccount,
    ChangePassword,
    DeleteAccount,
    Logout,
    LogoutEverywhere
  };
});