import UrlService from '../services/url.service.js';

export const getOriginalUrl = (req, res) => {
  UrlService.origin(req.params.id, true)
  .then((originurl) => {
    return res.status(301).redirect(originurl);
  })
  .catch((reason) => {
    if (reason === "_id_not_exist_") {
      return res.status(404).json({err: "Not Found!"});
    }

    return res.status(500).json({err: "Server Error!"});
  });
};

export const createShortUrl = (req, res) => {
  const { origin, password } = req.body;

  UrlService.create(origin, password)
  .then((shorturl) => {
    return res.status(200).json({short: shorturl});
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

export const deleteShortUrl = (req, res) => {
  const { id, password } = req.body;

  UrlService.delete(id, password)
  .then(() => {
    return res.status(200).json({msg: "Success!"});
  })
  .catch((reason) => {
    switch (reason) {
      case "_invalid_password_":
        return res.status(401).json({err: "Unauthorized!"});
        break;
      case "_id_not_exist_":
        return res.status(404).json({err: "Not Found!"});
        break;
      default:
        return res.status(500).json({err: "Server Error!"});
        break;
    }
  });
};

export const updateOriginalUrl = (req, res) => {
  const { id, newOrigin, password } = req.body;

  UrlService.updateOrigin(id, newOrigin, password)
  .then((originurl, shorturl) => {
    return res.status(200).json({
      origin: originurl,
      short: shorturl,
    })
  })
  .catch((reason) => {
    switch (reason) {
      case "_invalid_url_":
        return res.status(400).json({err: "Bad Request!"});
        break;
      case "_invalid_password_":
        return res.status(401).json({err: "Unauthorized!"});
        break;
      case "_id_not_exist_":
        return res.status(404).json({err: "Not Found!"});
        break;
      default:
        return res.status(500).json({err: "Server Error!"});
        break;
    }
  });
};