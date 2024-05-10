import express from 'express';
import { createShortUrl, updateOriginalUrl, getOriginalUrl, deleteShortUrl } from '../controller/url.controller.js';

const [ UrlRouter, RedirectRouter ] = [express.Router(), express.Router()];

// POST localhost:3000/api/url
// {
//   origin: "link",
//   password: "password"
// }
UrlRouter.post("/", createShortUrl);

// PUT localhost:3000/api/url
// {
//   id: "id",
//   neworigin: "link",
//   password: "password"
// }
UrlRouter.put("/", updateOriginalUrl);

// DELETE localhost:3000/api/url
// {
//   id: "id",
//   password: "password"
// }
UrlRouter.delete("/", deleteShortUrl);

// GET localhost:3000/s/__id__
RedirectRouter.get("/:id", getOriginalUrl);

export { UrlRouter, RedirectRouter };