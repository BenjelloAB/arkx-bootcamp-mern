const express = require("express");
const {
  check,
  body,
  param,
  cookie,
  query,
  validationResult,
  checkExact,
  buildCheckFunction,
  oneOf,
  matchedData,
  checkSchema,
  header,
  Result,
  ExpressValidator,
} = require("express-validator");
const app = express();
app.use(express.json());

app.post(
  "/user",
  [check("email").isEmail(), check("password").isLength({ min: 5 })],
  (req, res) => {
    const result = validationResult(req);
    result.formatWith((err)=> {
      return{
        msg: err
      }
    })
t



    if (!result.isEmpty()) {
      // There were validation errors. Send them to the client.
      res.status(400).json({ errors: result.array() });
    } else {
      // No validation errors. Handle the request.
    }
  }
);

app.listen(4444, () => {
  console.log("http://localhost:4444");
});
