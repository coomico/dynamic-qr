import { regScheme } from "./regex";

export const schemeFiller = (u: string, secure?: boolean) => {
  if (u && !u.match(regScheme)) return secure ? `https://${u}` : `http://${u}`;
  return u;
};