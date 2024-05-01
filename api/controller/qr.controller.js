import dotenv from 'dotenv';
import { createQrUrl, createQrBuf } from "../services/qr.service.js";
import UrlService from "../services/url.service.js";

dotenv.config();

export const genQrCode = (req, res, next) => {
  const { origin, password } = req.body;
  const callback = (err, data) => {
    if (err === "_short_not_exist") {
      return res.status(404).json({err: "Not Found!"});
    }

    return res.status(200).json({data: data});
  };

  UrlService.create(origin, password)
  .then((shorturl) => {
    createQrUrl(shorturl, callback);
  })
  .catch((reason) => {
    switch (reason) {
      case "_invalid_url_":
        return res.status(400).json({err: "Bad Request!"});
        break;
      case "_already_exist_":
        return res.status(409).json({err: "Already Exist!"});
        break;
      default:
        return res.status(500).json({err: "Server Error!"});
        break
    }
  });
};

export const getQrCode = (req, res, next) => {
  const id = req.params.id;
  const short = `${process.env.DOMAIN}/s/${id}`;
  createQrBuf(short, (err, buf) => {
    if (err) {
      return res.status(500).json({err: "Server Error!"});
    }

    res.header('Content-Type', 'image/png')
    return res.send(buf);
  });
};