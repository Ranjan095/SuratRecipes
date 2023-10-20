/** @format */

let express = require("express");
const { errorHandler } = require("../utils/errorHandler/errorHandler");
const { auth } = require("../middleware/authMiddleware");

let recipeRoute = express.Router();

/** for Create new Recipe */

recipeRoute.get("/", auth, async (req, res) => {
  try {
    res.cookie("ranjan", "test_cookies");
    return res.status(200).send("Success response");
  } catch (error) {
    return errorHandler(res, error.message);
  }
});

module.exports = { recipeRoute };
