const express = require("express");
const postRoutes = require("./routes/post.route");
const userRoutes = require("./routes/user.route");
const handleErrors = require("./middleware/errorHandling");
const logger = require("./middleware/logger");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./.env" });
const app = express();

app.use(cookieParser());
app.use(express.json());
async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blogdb");
    console.log("Connected Successfully ");
  } catch (err) {
    throw err;
  }
}
async function main() {
  try {
    await connectDB();

    app.use(logger);

    app.use("/users", userRoutes);

    app.use("/posts", postRoutes);

    app.use(handleErrors);

    app.listen(process.env.PORT, () => {
      console.log("Server is listening on port ", process.env.PORT);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
