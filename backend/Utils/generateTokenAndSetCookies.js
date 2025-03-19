import jwt from "jsonwebtoken";

// This cookie will store in client side not in backend
export const generateTokenAndSetCookies = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  
  // Cookies are not stored in the Express.js backend itself. Instead, they are stored in the client’s browser and sent with each request. The server reads cookies from the request headers (req.cookies).

  res.cookie("token", token, {
    httpOnly: true, // accessible by only http not with js to prevent from xss
    secure: process.env.NODE_ENV === "production", // Secure = true only when we are in production means (https) else in development secure = false (http)
    sameSite: "strict", // prevent csrf
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7days in the format of ms
  });
  return token;
};
