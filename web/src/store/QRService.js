import { api } from './http.js';

class QRService {
  static gen(data) {
    return api.post('/qr', data);
  }

  static get(id) {
    return api.get(`/qr/${id}`);
  }
}

export default QRService;