import type { Account } from "./data.interface"

interface RawResponse {
  status: string
}

export interface ErrorResponse extends RawResponse {
  message: string
}

export interface SuccessResponse<D, M = any> extends RawResponse {
  data: D,
  metadata?: M
}

export interface DataAuth extends Account {
  token: string
}

export interface MetaAuth {
  access_expires: string
}

export interface MetaLink {
  data_length: number
}