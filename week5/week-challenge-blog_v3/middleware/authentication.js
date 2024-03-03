const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../customErrors");
require("dotenv").config({ path: "../.env" });

async function validateToken(req, res, next) {
  let token = req.cookies.token;
  if (!token)
    return next(new UnauthenticatedError("Invalid Token: You are unauthorized"));
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return next(
        new UnauthenticatedError("Invalid Token: You are unauthorized 44")
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
    else next();
  });
}

module.exports = {
  isAuthenticated,
  validateToken,
};
