/** @format */
let bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");
const { errorHandler } = require("../utils/errorHandler/errorHandler");
/** API for Create new users **/
let createUser = async (req, res) => {
  try {
    let { fName, lName, email, password } = req.body;

    /** Check if Already user exist **/
    let alreadyUser = await UserModel.findOne({ email }).select("-password");
    if (alreadyUser) {
      return errorHandler(res, "user already exist");
    }

    let salt = bcrypt.genSaltSync(10);
    let hashPassword = await bcrypt.hash(password, salt);

    let newUser = await UserModel({
      fName,
      lName,
      email,
      password: hashPassword,
    });
    await newUser.save();

    return res
      .status(200)
      .send({ msg: "user created successfully", data: newUser });
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

/** API for Get users **/
let getUser = async (req, res) => {
  try {
    // let user = await UserModel.findOne(req.params.user
    return res.status(200).send({ msg: "userRoute" });
  } catch (error) {
    return errorHandler(res, error);
  }
};

/** API for Login user **/
let loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      return errorHandler(res, "Invalid email");
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorHandler(res, "Invalid password");
    }

    /** Create Token */
    let data = { id: user._id, name: user.fName };
    var token = jwt.sign(data, process.env.TOKEN_SECRET);

    res.cookie("jwtToken", token, {
      httpOnly: true,
      // secure: true,
      expiresIn: "1d",
    });

    return res.status(200).send({
      msg: "user login successfully",
      token,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

module.exports = { getUser, createUser, loginUser };