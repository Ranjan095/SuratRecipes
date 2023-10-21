/** @format */

let express = require("express");
const { errorHandler } = require("../utils/errorHandler/errorHandler");
const { auth } = require("../middleware/authMiddleware");
const { UserModel } = require("../model/userModel");

let recipeRoute = express.Router();

/** for Create new Recipe */

recipeRoute.get("/", auth, async (req, res) => {
  try {
    return res.status(200).send("Success response");
  } catch (error) {
    return errorHandler(res, error.message);
  }
});
/** Api for Add fovourit to user */
recipeRoute.post("/addFavorite", auth, async (req, res) => {
  try {
    let { authorid, productId } = req.body;
    // console.log(req.body);
    await UserModel.findByIdAndUpdate(authorid, {
      $push: { favRecipes: productId },
    });
    return res.status(200).send({ msg: "Add to your favorite list" });
  } catch (error) {
    return errorHandler(res, error.message);
  }
});

/** Api for Remove from  fovourit user list*/
recipeRoute.post("/removeFavorite", auth, async (req, res) => {
  try {
    let { authorid, productId } = req.body;
    // console.log(req.body);
    await UserModel.findByIdAndUpdate(authorid, {
      $pull: { favRecipes: productId },
    });
    return res.status(200).send({ msg: "Removed to your favorite list" });
  } catch (error) {
    return errorHandler(res, error.message);
  }
});

module.exports = { recipeRoute };
