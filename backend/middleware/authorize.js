const { sendError } = require("../utils/apiResponse");

const authorize = (...roles) => (req, res, next) => {
  if (!req.user) {
    return sendError(res, { statusCode: 401, message: "Not authenticated" });
  }

  if (roles.length && !roles.includes(req.user.role)) {
    return sendError(res, { statusCode: 403, message: "Access denied" });
  }

  return next();
};

module.exports = authorize;
