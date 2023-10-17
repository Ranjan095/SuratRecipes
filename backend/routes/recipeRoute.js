/** @format */

let express = require("express");
const { errorHandler } = require("../utils/errorHandler/errorHandler");
const { auth } = require("../middleware/authMiddleware");
const cookieParser = require('cookie-parser');

let recipeRoute = express.Router();

recipeRoute.use(cookieParser());

/** for Create new Recipe */

recipeRoute.get("/", auth, async (req, res) => {
  try {
    return res.status(200).send("Success response");
  } catch (error) {
    return errorHandler(res, error.message);
  }
});

module.exports = { recipeRoute };
