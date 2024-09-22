import { Router } from "express";

import { UrlController } from "../controller";
import { UrlValidator } from "../middlewares/validator";
import { isUserAuthenticated } from "../middlewares/auth.handler";

const UrlRouter = Router();

// user should be authenticated
// POST /url/new
// body {title, originUrl, isPrivate?, password?, description?, plusQr?}
// response {
//   status,
//   data: {
//     _id,
//     title,
//     shortUrl,
//     originUrl,
//     isPrivate,
//     hasPassword,
//     description?,
//     visitCount,
//     qrCode?,
//     createdAt,
//     updatedAt
//   }
// }
UrlRouter.post('/new', isUserAuthenticated, UrlValidator.Create, UrlController.createShortUrl);

// user should be authenticated
// GET /url/one/{shortId}
// response {
//   status,
//   data: {
//     _id,
//     title,
//     shortUrl,
//     originUrl,
//     isPrivate,
//     hasPassword,
//     description?,
//     visitCount,
//     qrCode?,
//     createdAt,
//     updatedAt
//   }
// }
UrlRouter.get('/one/:shortId', isUserAuthenticated, UrlController.getOneOwnedUrl);

// user should be authenticated
// GET /url/all
// response {
//   status,
//   data: [
//     {
//       _id,
//       title,
//       shortUrl,
//       originUrl,
//       isPrivate,
//       hasPassword,
//       description?,
//       visitCount,
//       qrCode?,
//       createdAt,
//       updatedAt
//     }
//   ],
//   metadata: {
//     data_length
//   }
// }
UrlRouter.get('/all', isUserAuthenticated, UrlController.getAllOwnedUrls);

// user should be authenticated
// PUT /url/update/{shortId}
// body {title?, originUrl?, isPrivate?, password?, description?, plusQr?}
UrlRouter.put('/update/:shortId', isUserAuthenticated, UrlValidator.Update, UrlController.updateUrl);

// user should be authenticated
// DELETE /url/remove/{shortId}
UrlRouter.delete('/remove/:shortId', isUserAuthenticated, UrlController.removeUrl);

export default UrlRouter;