require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();
const uri = process.env.MONGODB_URI;
const port = process.env.PORT;

async function main() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Server");
  } catch (err) {
    console.log(err);
  }
}

app.listen(port, () => {
  console.log(`Listening on PORT : ${port}`);
});
