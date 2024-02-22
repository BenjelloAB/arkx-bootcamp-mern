const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const csrf = require("csurf");
const escapeHtml = require("escape-html");
const app = express();

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({ secret: "your-secret-key", resave: true, saveUninitialized: true })
);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Sample Vulnerable Node.js Application");
});

app.get("/login", (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login",(req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty())
  {
    return res.status(400).json(errors.array());
  }
}, (req, res) => {
  const { username, password } = req.body;


  if (username === "admin" && password === "password") {
    req.session.authenticated = true;
    req.session.username = username;
    res.redirect("/profile");
  } else {
    res.send("Invalid username or password");
  }
});

app.get("/profile", (req, res) => {
  if (req.session.authenticated) {
    //escaped the html to avoid XSS attacks
    res.send(
      `<h1>Welcome to your profile, ${escapeHtml(req.session.username)}</h1>`
    );
  } else {
    res.redirect("/login");
  }
});

// Server
app.listen(3050, () => {
  console.log("Server running on port 3050");
});
