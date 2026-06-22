const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendError } = require("../utils/apiResponse");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return sendError(res, { statusCode: 401, message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return sendError(res, { statusCode: 401, message: "User no longer exists" });
    }

    req.user = user;
    return next();
  } catch (err) {
    return sendError(res, { statusCode: 401, message: "Token is not valid" });
  }
};

module.exports = protect;
