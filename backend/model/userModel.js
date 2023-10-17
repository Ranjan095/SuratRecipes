/** @format */

let express = require("express");
let mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favRecipes: [Number],
  },
  { versionKey: false }
);

let UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
