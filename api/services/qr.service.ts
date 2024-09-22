import qrcode from "qrcode";
import { ErrorCapture } from "../utils/error_capture";

const qrOptions: qrcode.QRCodeToDataURLOptions = {
  errorCorrectionLevel: "H",
  type: "image/png",
  margin: 1.2,
  width: 200,
  color: {
    dark: "#18181b",
    light: "#ffffff"
  }
};

export const createQr = async (url: string) => {
  try {
    return await qrcode.toDataURL(url, qrOptions);
  } catch (error) {
    throw new ErrorCapture((error as Error).message, 500);
  }
};