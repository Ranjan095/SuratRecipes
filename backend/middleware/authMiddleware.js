/** @format */
var jwt = require("jsonwebtoken");
let auth = (req, res, next) => {
  let token = req.cookies.jwtToken;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Invalid Token!",
          success: false,
        });
      }
      next();
    });
  } else {
    return res.status(401).json({
      message: "please Login first.",
      success: false,
    });
  }
};

module.exports = { auth };
