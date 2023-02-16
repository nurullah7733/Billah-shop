const jwt = require("jsonwebtoken");

const verifyAuthMiddleware = (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).json({ status: "unauthorized" });
    } else {
      let data = decoded.data.split(" ");
      req.headers.email = data[0];
      req.headers.userId = data[1];

      console.log(req.headers.email);
      console.log(req.headers.userId);

      next();
    }
  });
};

module.exports = verifyAuthMiddleware;
