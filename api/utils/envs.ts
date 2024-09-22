import dotenv from 'dotenv';

dotenv.config();

export const appHost = process.env.APP_HOST;
export const appPort = process.env.APP_PORT;
export const appScheme = process.env.APP_SCHEME ?? 'http';
export const appUrl = `${appScheme}://${appHost}:${appPort}`;

export const webHost = process.env.WEB_HOST;
export const webPort = process.env.WEB_PORT;
export const webScheme = process.env.WEB_SCHEME ?? 'http';
export const WebUrl = `${webScheme}://${webHost}:${webPort}`;

export const dbUser = process.env.DB_USER;
export const dbPass = process.env.DB_PASS;
export const dbHost = process.env.DB_HOST;
export const dbPort = process.env.DB_PORT;
export const dbName = process.env.DB_NAME;

// all exp number is seconds unit
export const originKey: string = process.env.ORIGIN_KEY!;
export const originExp: number = +process.env.ORIGIN_EXP!;
export const accessKey: string = process.env.ACCESS_KEY!;
export const accessExp: number = +process.env.ACCESS_EXP!;
export const refreshKey: string = process.env.REFRESH_KEY!;
export const refreshExp: number = +process.env.REFRESH_EXP!;