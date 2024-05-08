import express from 'express';
import { genQrCode, getQrCode } from '../controller/qr.controller.js';

const QrRouter = express.Router();

// POST localhost:3000/api/qr
// {
//   origin: "link",
//   password: "password",
// }
QrRouter.post("/", genQrCode);

// GET localhost:3000/api/qr/__id__
QrRouter.get("/:id", getQrCode);

export default QrRouter;