import {
  RESET_PASSWORD_SUCCESSFUL_EMAIL,
  RESET_PASSWORD_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_TEMPLATE,
} from "./EmailTemplate.js";
import { transporter } from "../Nodemailer/nodemailer.config.js";

export const sendVerificationEmail = async (email, otp) => {
  // All mail data
  const mailOptions = {
    from: '"AI Writerly" <foradsonly98@gmail.com>',
    to: email,
    subject: "Verify your email",
    // text: "This is a test email using Nodemailer!", // use text if want to send only text
    html: VERIFICATION_EMAIL_TEMPLATE.replace("123456", otp),
    category: "Email Verification",
  };

  try {
    // transporter is mail configuration imported from nodemailer.config.js
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending verification mail:", error.message);
        return; // Prevents further execution
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
    
  }
};

export const sendWelcomeEmail = async (email) => {
  const mailOptions = {
    from: '"AI Writerly" <foradsonly98@gmail.com>',
    to: email,
    subject: "Welcome to AI Writerly",
    html: WELCOME_TEMPLATE,
    category: "Welcome to AI Writerly",
  };

  try {
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
        return; // Prevents further execution
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendResetPasswordEmail = async (email, resetURL) => {
  const mailOptions = {
    from: '"AI Writerly" <foradsonly98@gmail.com>',
    to: email,
    subject: "Reset Password",
    html: RESET_PASSWORD_TEMPLATE.replace("{resetURL}", resetURL),
    category: "Reset Password",
  };

  try {
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
        return; // Prevents further execution
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendResetPasswordSuccessEmail = async (email) => {
  const mailOptions = {
    from: '"AI Writerly" <foradsonly98@gmail.com>',
    to: email,
    subject: "Reset Password Success",
    html: RESET_PASSWORD_SUCCESSFUL_EMAIL,
    category: "Reset Password Success",
  };

  try {
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
        return; // Prevents further execution
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
