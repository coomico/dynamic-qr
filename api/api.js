import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { rateLimit } from 'express-rate-limit';
import history from 'connect-history-api-fallback';

import { UrlRouter, RedirectRouter } from './routes/url.route.js';
import QrRouter from './routes/qr.route.js';
import ConnectDB from './config/db.config.js';

dotenv.config();

const api = express();
const httpServer = http.createServer(api);

const workdir = path.dirname(fileURLToPath(import.meta.url));
const staticAssets = express.static(path.join(workdir, 'views/'));
api.use(staticAssets);

const corsOptions = {
  origin: `https://${process.env.BASE_URL}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: JSON.stringify({err: 'Too Many Requests!'}),
  standardHeaders: false,
  legacyHeaders: false
});

ConnectDB();

api.use(express.json());
api.use(express.urlencoded({extended: true}));
api.use(cors(corsOptions));

api.use("/s", RedirectRouter);

api.use("/api", limiter);
api.use("/api/url", UrlRouter);
api.use("/api/qr", QrRouter);

// test connection
api.get("/ping", (req, res) => {
  return res.status(200).json({ping: "pong"});
});

api.use(history({}));
api.use(staticAssets);

const port = process.env.BASE_PORT
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});