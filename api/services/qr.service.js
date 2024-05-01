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

export const createQrUrl = (short, callback) => {
  qrcode.toDataURL(short, opts, (err, data) => {
    UrlService.updateQrCode(short, data)
    .catch((reason) => {
      callback(reason, null);
    })
    callback(err, data);
  });
};

export const createQrBuf = (target, callback) => {
  qrcode.toBuffer(target, opts, (err, buf) => {
    callback(err, buf);
  });
};