/** @format */
const { auth } = require("../middleware/authMiddleware");
let express = require("express");
const {
  getUser,
  createUser,
  loginUser,
} = require("../controller/userController");
const { errorHandler } = require("../utils/errorHandler/errorHandler");

let userRoute = express.Router();

/** for Create new User */
userRoute.post("/create", createUser);

/** for Get user */
userRoute.get("/", auth, getUser);

/** for Login user */
userRoute.post("/login", loginUser);

/** for Logout user */

userRoute.get("/logout", async (req, res) => {
  try {
    res.clearCookie("jwtToken");
    return res.status(200).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    return errorHandler(error, error.message);
  }
});

module.exports = { userRoute };
