import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookies } from "../Utils/generateTokenAndSetCookies.js";
import {
  sendResetPasswordEmail,
  sendResetPasswordSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../Nodemailer/Email.js";
import { User } from "../Models/AuthModel.js";

// Signup route: http://localhost:3000/api/auth/signup
export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required!");
    }
    // Creating verification token (OTP)
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      if (userAlreadyExist.isVerified) {
        return res.status(400).json({
          message: "User already exist, Please login!",
          success: false,
        });
      } else {
        userAlreadyExist.verificationToken = verificationToken;
        userAlreadyExist.verificationTokenExpiresAt =
          Date.now() + 10 * 60 * 1000;
        await userAlreadyExist.save();

        await sendVerificationEmail(userAlreadyExist.email, verificationToken);
        // JWT
        generateTokenAndSetCookies(res, user._id);
        return res.status(200).json({
          message: "OTP sent to your email!",
          user: {
            ...userAlreadyExist._doc, // Spread the user document means user data
            password: undefined, // and change the password value to undefined so it is not shown in response
          },
          success: true,
        });
      }
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      // verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Token expires, after 24 hours of the creation/Signup
      verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000, // Token expires, after 10 minutes
    });
    await user.save();

    // Sending OTP through nodemailer
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      message: "Signed up successfully!",
      user: {
        ...user._doc, // Spread the user document means user data
        password: undefined, // and change the password value to undefined so it is not shown in response
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

// Verify email route: http://localhost:3000/api/auth/verify-email
export const verifyEmail = async (req, res) => {
  // Getting otp from user
  const { code } = req.body;
  try {
    // If token is not found or verification time is expired then it is not valid
    const user = await User.findOne({
      verificationToken: code,
      // if verificationTokenExpires time is greater than Date.now(), then expiry time is not expire yet
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    // If valid otp
    user.isVerified = true;
    // after verification delete
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Email verified successfully!",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid or expired verification code",
    });
  }
};

// Login route: http://localhost:3000/api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required!");
    }
    const user = await User.findOne({ email });
    // If user not exist
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not exist, Please Signup!",
      });
    }
    // if user not verified
    if (!user.isVerified) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials, Please Signup!",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password!" });
    }

    user.lastLogin = new Date();
    await user.save();

    generateTokenAndSetCookies(res, user._id);

    res.status(200).json({
      success: true,
      message: "Login Successfully!",
      user: {
        ...user._doc, // Spread the user document means user data
        password: undefined, // and change the password value to undefined so it is not shown in response
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong!" });
  }
};

// Logout route: http://localhost:3000/api/auth/logout
export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully!" });
};

// Forgot password route: http://localhost:3000/api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials, Please Signup!",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    await user.save();

    // Send email
    await sendResetPasswordEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    res.status(200).json({
      success: true,
      message: "Password reset link is sent to email!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

// Reset password route: http://localhost:3000/api/auth/reset-password/
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: true, message: "Invalid or expire reset token" });
    }
    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    user.save();
    await sendResetPasswordSuccessEmail(user.email);
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

// Check auth route : http://localhost:3000/api/auth/check-auth
export const checkAuth = async (req, res) => {
  try {
    // userId is created after decoding token in middleware, select will select the provided filed and (-) before filed name will remove that filed and return other data so here no password will in returned data
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};
