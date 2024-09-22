import type { AxiosRequestConfig } from 'axios';

export * from './data.interface';
export * from './request.interface';
export * from './response.interface';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  requireAuth?: boolean,
  refreshAttempt?: number
}