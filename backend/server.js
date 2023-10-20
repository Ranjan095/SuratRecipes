/** @format */

require("dotenv").config();
var cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const connection = require("./db");
const { userRoute } = require("./routes/userRoute");
const { recipeRoute } = require("./routes/recipeRoute");

let app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/recipes", recipeRoute);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log(`port is running at ${port}`);
  } catch (error) {
    console.log("Somthing went wrong! DB has not connected");
  }
});
