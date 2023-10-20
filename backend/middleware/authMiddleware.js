/** @format */
var jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/errorHandler/errorHandler");
require("dotenv").config();
let auth = async (req, res, next) => {
  try {
    // let token = await req.cookies.jwtToken;
    let token = await req.headers.authorization?.split(" ")[1];
    // const token = req.headers.authorization;

    if (!token) {
      return errorHandler(res, "please Login first!");
    }
    let decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!decoded) {
      return errorHandler(res, "Invalid Token!");
    }
    req.body.authorid = decoded.id;
    req.body.author = decoded.name;
    // console.log("====>", decoded);

    next();
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

module.exports = { auth };
