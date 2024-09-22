import { Router } from "express";

import { UserController } from "../controller";
import { CommonValidator, UserValidator } from "../middlewares/validator";
import { isUserAuthenticated } from "../middlewares/auth.handler";

const UserRouter = Router();

// fetching someone with username
// GET /user/show/{username}
// response {
//   status,
//   data: {
//     name,
//     username
//   }
// }
UserRouter.get('/who/:username', UserController.getUserByUsername);

// fetching current user
// should be authenticated
// GET /user
// response {
//   status,
//   data: {
//     name,
//     username,
//     email
//   }
// }
UserRouter.get('/', isUserAuthenticated, UserController.getUser);

// should be authenticated
// PUT /user/update/
// body {name?, username?, email?}
UserRouter.put('/update', isUserAuthenticated, UserValidator.Update, UserController.updateUser);

// should be authenticated
// PUT /user/changepassword
// body {newPassword, confirmNewPassword, currentPassword}
UserRouter.put('/changepassword', isUserAuthenticated, UserValidator.ChangePassword, UserController.changePassword);

// should be authenticated
// DELETE /user/remove
// cookies {refreshToken}
// body {password}
UserRouter.delete('/remove', isUserAuthenticated, CommonValidator.Password, UserController.removeUser);

// should be authenticated
// cookies {refreshToken}
// POST /user/logout
UserRouter.post('/logout', isUserAuthenticated, UserController.logout);

// should be authenticated
// cookies {refreshToken}
// POST /user/logoutall
UserRouter.post('/logoutall', isUserAuthenticated, UserController.logoutAllDevice);

export default UserRouter;