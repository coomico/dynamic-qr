import express, { Application, json, NextFunction, Request, Response, urlencoded } from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

import ConnectDB from './config/db.config';
import {
  AuthRouter,
  OriginUrlRouter,
  UrlRouter,
  UserRouter
} from './routes';
import { ErrorHandler, ResponseHandler, Logger } from './middlewares';

import { corsOptions } from './utils/cors.options';
import { appPort } from './utils/envs';

const app: Application = express();
const server: http.Server = http.createServer(app);

const workdir = path.dirname(fileURLToPath(import.meta.url));
const staticAssets = express.static(path.join(workdir, 'ssr/'));
app.use(staticAssets);

app.set("trust proxy", "127.0.0.1");
app.use(json());
app.use(cookieParser());
app.use(urlencoded({extended: true}));

app.use('/o', OriginUrlRouter);
app.use('/auth', cors(corsOptions), AuthRouter);
app.use('/user', cors(corsOptions), UserRouter);
app.use('/url', cors(corsOptions), UrlRouter);

// check connection
app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ping: 'pong'});
  
  res.logMessage = 'ping-pong'
  return next();
});

app.use(ErrorHandler);
app.use(ResponseHandler);
app.use(Logger);

app.use(staticAssets);

server.listen(appPort, async () => {
  await ConnectDB();
  console.log(`server running on port: ${appPort}`);
});