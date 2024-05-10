import UrlService from '../services/url.service.js';

export const getOriginalUrl = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({err: "Missing Required Field!"});
  }

  UrlService.origin(id, true)
  .then((origin) => {
    console.log(origin)
    return res.status(301).redirect(origin);
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
  if (!origin || !password) {
    return res.status(400).json({err: "Missing Required Field!"});
  }

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
  if (!id || !password) {
    return res.status(400).json({err: "Missing Required Field!"});
  }

  UrlService.delete(id, password)
  .then(() => {
    return res.status(200).json({msg: "Success!"});
  })
  .catch((reason) => {
    switch (reason) {
      case "_short_not_exist_":
        return res.status(404).json({
          err: "Not Found!",
          msg: "Make sure the payload is correct.",
        });
        break;
      default:
        return res.status(500).json({err: "Server Error!"});
        break;
    }
  });
};

export const updateOriginalUrl = (req, res) => {
  const { id, neworigin, password } = req.body;
  if (!id || !neworigin || !password) {
    return res.status(400).json({err: "Missing Required Field!"});
  }

  UrlService.updateOrigin(id, neworigin, password)
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
      case "_short_not_exist_":
        return res.status(404).json({
          err: "Not Found!",
          msg: "Make sure the payload is correct.",
        });
        break;
      default:
        return res.status(500).json({err: "Server Error!"});
        break;
    }
  });
};