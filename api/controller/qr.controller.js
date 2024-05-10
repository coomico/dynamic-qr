import { createQrUrl } from "../services/qr.service.js";
import UrlService from "../services/url.service.js";

export const genQrCode = (req, res) => {
  const { origin, password } = req.body;
  if (!origin || !password) {
    return res.status(400).json({err: "Miss Required Field!"});
  }

  (async () => {
    try {
      const short = await UrlService.create(origin, password);
      const qrdata = await createQrUrl(short);
      return res.status(200).json({data: qrdata});
    } catch (error) {
      switch (error) {
        case "_invalid_url_":
          return res.status(400).json({err: "Bad Request!"});
          break;
        case "_short_not_exist":
          return res.status(404).json({err: "Not Found!"});
          break;
        case "_already_exist_":
          return res.status(409).json({err: "Already Exist!"});
          break;
        default:
          return res.status(500).json({err: "Server Error!"});
          break
      }
    }
  })();
};

export const getQrCode = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({err: "Miss Required Field!"});
  }

  UrlService.getQrCode(id)
  .then((qrdata) => {
    return res.status(200).json({data: qrdata});
  })
  .catch((reason) => {
    switch (reason) {
      case "_id_not_exist_":
        return res.status(404).json({err: "Not Found!"});
        break;
      default:
        return res.status(500).json({err: "Server Error!"});
        break
    }
  })
};