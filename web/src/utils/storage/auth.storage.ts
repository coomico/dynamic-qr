import { storage } from "./storage.event";

const authStorageKey: string = 'accessToken';

const AuthStorage = {
  get auth(): string | null {
    return storage.getItem(authStorageKey);
  },

  set auth(token: string) {
    storage.setItem(authStorageKey, token);
  },

  removeAuth() {
    storage.removeItem(authStorageKey);
  }
}

export default AuthStorage;