import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../Controllers/AuthController.js";
import { verifyToken } from "../Middleware/VerifyToken.js";
import { loginValidation, registerValidation } from "../Middleware/AuthValidation.js";

const authRoute = express.Router();

authRoute.get("/check-auth", verifyToken, checkAuth);

authRoute.post("/signup", registerValidation, signup);
authRoute.post("/login", loginValidation, login);
authRoute.post("/logout", logout);

// Receive the otp sent during signup and check if otp is exist in db and its time is not expired.
authRoute.post("/verify-email", verifyEmail);
// Send the email with reset password link
authRoute.post("/forgot-password", forgotPassword);
// Receive the new password and reset token and check if the reset token exist if exist update the password with new one.
authRoute.post("/reset-password/:token", resetPassword);

export default authRoute;
