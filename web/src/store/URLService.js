import { api, short } from './http.js';

class URLService {
  static create(data) {
    return api.post('/url', data);
  }

  static updateOrigin(data) {
    return api.put('/url', data);
  }

  static get(id) {
    return short.get(`/${id}`);
  }
}

export default URLService;