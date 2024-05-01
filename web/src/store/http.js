import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://qr.coomi.codes/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const short = axios.create({
  baseURL: 'https://qr.coomi.codes/s',
  headers: {
    'Content-Type': 'application/json'
  }
});