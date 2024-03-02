const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const { validationResult, body } = require("express-validator");
const path = require("path");
// require('dotenv').config()

const app = express();
function isAuthtenticated(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  // const user = jwt.verify(token, "secret");
  let user = "";
  // console.log(token);
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      console.log(err);
    } else {
      console.log("decoded");
      console.log(decoded);
      req.user = decoded;
      next();
    }
  });
}
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csurf({ cookie: true }));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.set("views", path.join(__dirname, "views"));
// app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));

// const KEY = process.env.KEY;

// console.log(KEY);
//! added custom error handler for BAD CSRF TOKENS
app.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);
  res.status(403);
  res.send("Invalid CSRF token");
});

// Routes
// app.get("/",(req, res) => {
//   res.render("index", { csrfToken: req.csrfToken() });
// });

app.get("/login", (req, res) => {
  res.render("index", { csrfToken: req.csrfToken() });
});
app.post(
  "/login",
  [
    body("username")
      .exists()
      .withMessage("Username is required")
      .trim()
      .escape(),
    body("password")
      .exists()
      .withMessage("Password is required")
      .trim()
      .escape(),
  ],
  (req, res) => {
    // Validate and authenticate the user
    // Implement appropriate validation and secure authentication mechanisms here
    // For simplicity, you can use a hardcoded username and password for demonstration purposes

    //! added user input validation
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
      // authenticate
      const token = jwt.sign({ username: username }, "secret", {
        expiresIn: "1800s",
      });

      // res.json({ message: "Login Successful", token: token });

      res.cookie("token", token, { httpOnly: true });
      res.redirect("/pageakhra");
    } else {
      res.redirect("/login");
    }
  }
);
app.get("/pageakhra", (req, res) => {
  res.send("<h1>Wah<h1/>");
});
app.get("/dashboard", isAuthtenticated, (req, res) => {
  res.render("dashboard");
});

app.get("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true });
  res.redirect("/login");
});
app.listen(3100, () => {
  console.log("Server started on port 3100");
});
