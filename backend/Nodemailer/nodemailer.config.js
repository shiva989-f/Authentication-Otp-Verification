import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Created separate config file so can be used multiple places
export const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465, // GMail Port (fixed)
  // Sender email
  auth: {
    user: process.env.EMAIL, // Personal Email used.
    pass: process.env.PASS, // Click on same email account and go to manage account in gmail and search for app password and create new app and get hash password NOTE: Only if 2 step verification is on
  },
});
