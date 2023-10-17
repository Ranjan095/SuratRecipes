/** @format */

require("dotenv").config();
const express = require("express");
const connection = require("./db");
const { userRoute } = require("./routes/userRoute");
const { recipeRoute } = require("./routes/recipeRoute");
const cookieParser = require('cookie-parser');
let app = express();
app.use(express.json());

app.use("/user", userRoute);
app.use("/recipes",recipeRoute)

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
