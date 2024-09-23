import { Router } from "express";
import cors from 'cors';

import { getOriginUrl } from "../controller/url.controller";
import { extractPassKey } from "../middlewares/auth.handler";

import { WebUrl } from "../utils/envs";

const OriginUrlRouter = Router();

// GET /o/{shortId}
// cookies {o.shortId}
OriginUrlRouter.get(
  '/:shortId',
  cors({
    // origin must be `https` for able to transfer cookies
    origin: WebUrl,
    credentials: true
  }),
  extractPassKey,
  getOriginUrl);

export default OriginUrlRouter;