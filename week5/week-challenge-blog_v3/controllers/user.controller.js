const {
  findUserById,
  registerUser,
  findUserByEmail,
} = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { RequestError } = require("../customErrors");
require("dotenv").config({ path: "../.env" });

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await registerUser(name, email, hashedPassword);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function findIt(req, res, next) {
  try {
    let id = req.params.id;
    const user = await findUserById(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    //! compare passwords plaintext vs hashed stored in DB
    const {
      name: userName,
      email: userEmail,
      password: hashedPassword,
    } = await findUserByEmail(email);

    console.log("password : ", password);
    console.log("hashedPassword : ", hashedPassword);

    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) throw new RequestError("Invalid email Or Password");
    const token = jwt.sign(
      { name: userName, email: userEmail },
      process.env.SECRET
    );
    res.cookie("token", token, { httpOnly: true});
    // res.setHeader(
    //   "Set-Cookie",
    //   `token=${token}; Expires=${new Date(
    //     Date.now() + 900000
    //   ).toUTCString()}; HttpOnly; Secure`
    // );
    res.json({ token: token });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  findIt,
  login,
};
