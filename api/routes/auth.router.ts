import { Router } from "express";

import { AuthController } from "../controller";
import { CheckUserAgent } from "../middlewares";
import { AuthValidator, CommonValidator } from "../middlewares/validator";

const AuthRouter = Router();
const LoginRouter = Router();

// POST /auth/login/email
// body {email, password}
LoginRouter.post('/email', AuthValidator.LoginEmail, AuthController.loginByEmail);

// POST /auth/login/username
// body {username, password}
LoginRouter.post('/username', AuthValidator.LoginUsername, AuthController.loginByUsername);

// /auth/login
// header {User-Agent}
// response {
//   status,
//   data: {
//     name,
//     username,
//     email,
//     token
//   },
//   metadata: {
//     access_expires
//   }
// }
AuthRouter.use('/login', CheckUserAgent, LoginRouter);

// POST /auth/regist
// header {User-Agent}
// body {name, username, email, password}
// response {
//   status,
//   data: {
//     name,
//     username,
//     email,
//     token
//   },
//   metadata: {
//     access_expires
//   }
// }
AuthRouter.post('/regist', CheckUserAgent, AuthValidator.Regist, AuthController.regist);

// GET /auth/refresh
// header {User-Agent}
// cookies {refreshToken}
// response {
//   status,
//   data: {
//     token
//   },
//   metadata: {
//     access_expires
//   }
// }
AuthRouter.get('/refresh', CheckUserAgent, AuthController.refreshAcessToken);

// POST /auth/redirect/{shortId}
// body {password}
AuthRouter.post('/redirect/:shortId', CommonValidator.Password, AuthController.redirectPermission);

export default AuthRouter;