import { CorsOptions } from "cors";
import { WebUrl } from "./envs";

export const corsOptions: CorsOptions = {
  // origin must be `https` for able to transfer cookies
  origin: WebUrl,
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
};