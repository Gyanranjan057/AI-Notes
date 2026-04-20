

import express from "express";
import isAuth from "../middleware/isAuth.js";

import {
  googleAuth,
  signup,
  login,
  logout,
  sendOtp,
  verifyOtp,
  resetPassword,
  getCurrentUser
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/google", googleAuth);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);


authRouter.post("/forgot-password/send-otp", sendOtp);
authRouter.post("/forgot-password/verify-otp", verifyOtp);
authRouter.post("/forgot-password/reset", resetPassword);


authRouter.get("/me", isAuth, getCurrentUser);


export default authRouter;