const express = require("express");
const csrf = require("csurf");

//why ??
const cookieParser = require("cookie-parser");

const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const path = require("path");
const app = express();

function isAuthtenticated(req, res, next) {
  //   const authHeader = req.headers.authorization;
  //   console.log(authHeader);
  //   if (!authHeader) {
  //     return res.status(401).json({ message: "Unauthenticated" });
  //   }
  // Bearer token
  const token = req.cookies.token.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  const user = jwt.verify(token, "secret");
  if (!user) {
    return res.status(403).json({ message: "Unauthenticated" });
  }
  req.user = user;
  next();
}

//Middleware :
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//! added custom error handler for BAD CSRF TOKENS
app.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);
  res.status(403);
  res.send("Invalid CSRF token");
});

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
      //   res.setHeader("Authorization", `Bearer ${token}`);
      // res.setHeader("Set-Cookie", `token=Bearer ${token}; Expires=date; Domain=domain; Path=path; Secure`)
      res.setHeader(
        "Set-Cookie",
        `token=Bearer ${token}; Expires=${new Date(
          Date.now() + 900000
        ).toUTCString()}; HttpOnly; Secure`
      );

      res.send({ message: "Logged in" });
      //   res.redirect("/pageakhra");
    } else {
      res.redirect("/login");
    }
  }
);
app.get("/pageakhra", (req, res) => {
  res.send("<h1>Wah Rak Nadi<h1/>");
});
app.get("/dashboard", isAuthtenticated, (req, res) => {
  console.log(req.user);
  res.render("dashboard");
});

app.get("/logout", (req, res) => {
  //   res.cookie("token", "", { httpOnly: true });
  res.setHeader(
    "Set-Cookie",
    `token=; Expires=${new Date(
      Date.now() + 900000
    ).toUTCString()}; HttpOnly; Secure`
  );

  res.redirect("/login");
});
app.listen(3105, () => {
  console.log("Server started on port 3105");
});
