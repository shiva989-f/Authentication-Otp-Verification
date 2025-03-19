import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // getting cookie token from the user req instead of headers authorization
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - Please login!" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // If can't decode because token is not valid
    if (!decoded) return res.status(401).json({ success: true, message: "Unauthorized, Please login!" });

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(500).json({success: false, message: "Server error"})
  }
};
