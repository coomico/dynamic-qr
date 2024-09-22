import type { CustomAxiosRequestConfig } from "@/interfaces";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const MAX_ATTEMPT = 2;
export const TIMEOUT = 10000; // cancel request after 10s
export const config: CustomAxiosRequestConfig = {};

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});