import type { Account } from "./data.interface";

export interface AuthRequest extends Account {
  password: string
}

export type LoginEmailRequest = Pick<AuthRequest, 'email' | 'password'>;
export type LoginUsernameRequest = Pick<AuthRequest, 'username' | 'password'>;

export type UpdateAccountRequest = Partial<Account>;

export interface ChangePasswordRequest {
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string
}

export interface LinkRequest {
  title: string,
  originUrl: string,
  isPrivate?: boolean,
  password?: string,
  description?: string,
  plusQr?: boolean
}

export type UpdateLinkRequest = Partial<LinkRequest>;