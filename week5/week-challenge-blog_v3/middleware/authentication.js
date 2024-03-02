const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../customErrors");
require("dotenv").config({ path: "../.env" });

async function validateToken(req, res, next) {
  // console.log(req.headers.cookie)
  // console.log(req.cookies)
  // console.log(req.headers)
  let token = req.cookies.token;
  if (!token)
    next(new UnauthenticatedError("Invalid Token: You are unauthorized"));
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return next(
        new UnauthenticatedError("nvalid Token: You are unauthorized")
      );
    }
    req.user = decoded;
    next();
  });
}

async function isAuthenticated(req, res, next) {
  let token = req.cookies.token;
  if (!token) return next();
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (decoded && !err) res.redirect("/posts");
  });
}

module.exports = {
  isAuthenticated,
  validateToken,
};
