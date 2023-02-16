const jwt = require("jsonwebtoken");

const verifyAuthMiddleware = (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).json({ status: "unauthorized" });
    } else {
      req.headers.email = decoded.data;
      console.log(req.headers.email);
      console.log(req.headers.isAdmin);
      next();
    }
  });
};

module.exports = verifyAuthMiddleware;
