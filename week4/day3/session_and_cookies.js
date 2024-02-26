const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const { validationResult, body } = require("express-validator");

// Server Variable Structure
const users = [
  {
    username: "alice",
    password: "hashed_password",
  },
  {
    username: "Ben",
    password: "123#!@#$$$hello",
  },
];
const app = express();

function isAuthenticatedFunc(req, res, next) {
  if (!req.session) return res.status(403).send("Session not found");
  if (req.session.isAuthenticated) next();
  else res.status(401).json({ message: "Unauthenticated" });
}

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "Heisenburg",
    cookie: { httpOnly: true, maxAge: 6000000 },
    resave: false,
    saveUninitialized: true,
  })
);
app.get("/login", (req, res) => {
  res.json("Hey wanna login");
});

app.get("/register", (req, res) => {
  res.json("Hey new user wanna sign up");
});

app.post("/register", (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ messgae: "Please provide username and password" });
  }
  users.push({ username, password });
  res.json({ message: "Registered User Successfully", users: users });
});

app.post("/login", (req, res, next) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ messgae: "Please provide username and password" });
  }
  let user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(400).json("Invalid UserName or Password");
  // Set session variables
  req.session.username = req.body.username;
  req.session.isAuthenticated = true;
  res.json({
    msg: "Logged in successfully",
    isAuthenticated: req.session.isAuthenticated,
    username: req.session.username,
  });
});

app.get("/dashboard", isAuthenticatedFunc, (req, res) => {
  res.json("Dashboard Page You are Authenticated Woho");
});
app.get("/logout", (req, res) => {
  if (!req.session) return res.status(403).send("Session not found");
  req.session.destroy((err) => {
    if (err) res.status(500).json({ message: "Error Logging Out" });
    else {
      res.cookie("connect.sid", "", { httpOnly: true });
      res.json("Logged out");
    }
  });
});
const port = 4002;
app.listen(port, () => {
  console.log(`listening on PORT: ${port}`);
});
