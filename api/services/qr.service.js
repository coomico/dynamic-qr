import qrcode from 'qrcode';
import UrlService from '../services/url.service.js';

let opts = {
  errorCorrectionLevel: "H",
  type: "image/png",
  margin: 1.2,
  color: {
    dark: "#1d1d1d",
    light: "#ffffff",
  },
  width: 200,
};

export const createQrUrl = async short => {
  const data = await qrcode.toDataURL(short, opts);
  UrlService.updateQrCode(short, data);
  return data;
}