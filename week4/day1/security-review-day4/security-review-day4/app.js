const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const { validationResult } = require("express-validator");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csurf({cookie: true}))

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.set("view engine", "ejs");

//! added custom error handler for BAD CSRF TOKENS
app.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);
  res.status(403);
  res.send("Invalid CSRF token");
});



// Routes
app.get("/", (req, res) => {
  res.render("index", { csrfToken: req.csrfToken() });
});

app.post(
  "/login",
  [
    body("username").exists().withMessage('Username is required').trim().escape(),
    body("password").exists().withMessage('Password is required').trim().escape()
  ],
  (req, res) => {
    // Validate and authenticate the user
    // Implement appropriate validation and secure authentication mechanisms here
    // For simplicity, you can use a hardcoded username and password for demonstration purposes

    //! added user input validation
    let errors = validationResult(req);
    if(!errors.isEmpty())
    {
      res.status(400).json({errors: errors.array()})
    }
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
      req.session.isAuthenticated = true;
      res.redirect("/dashboard");
    } else {
      res.redirect("/");
    }
  }
);

app.get("/dashboard", (req, res) => {
  // Secure the dashboard route to only allow authenticated users
  if (req.session.isAuthenticated) {
    res.render("dashboard");
  } else {
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
