import Router from "express";
import {
  getUserInfo,
  login,
  logout,
  removeAccount,
  signup,
  updatePassword,
  updateUserInfo,
} from "../controller/user.controller.js";
import verifyToken from "../middleware/jwt.middleware.js";

const userRouter = Router();

userRouter.route("/login").post(login);
userRouter.route("/signup").post(signup);
userRouter.post("/logout", verifyToken, logout);
userRouter.get("/remove", verifyToken, removeAccount);
userRouter.get("/profile", verifyToken, getUserInfo);
userRouter.post("/updateInfo", verifyToken, updateUserInfo);
userRouter.post("/changepassword", verifyToken, updatePassword);

export default userRouter;
