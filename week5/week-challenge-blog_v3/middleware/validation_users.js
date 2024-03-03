const { body, param, validationResult } = require("express-validator");

const validateAndSanitizeRegister = [
  body("name")
    .exists()
    .withMessage("name field is required ")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Min length is 3")
    .trim()
    .escape(),
  body("email")
    .exists()
    .withMessage("email field is required ")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email address")
    .trim()
    .escape(),
  body("password")
    .exists()
    .withMessage("password field is required ")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Min length is 8")
    .trim()
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error) => error.msg)
        .join(", ");
      // return res.status(400).send(`Bad request: ${errorMessages}`);
      return next(
        new RequestError(
          JSON.stringify({ errors: `Bad request: ${errorMessages}` })
        )
      );
    }
    next();
  },
];

const validateAndSanitizeLogin = [
  body("email")
    .exists()
    .withMessage("email field is required ")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email address")
    .trim()
    .escape(),
  body("password")
    .exists()
    .withMessage("password field is required ")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Min length is 8")
    .trim()
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error) => error.msg)
        .join(", ");
      // return res.status(400).send(`Bad request: ${errorMessages}`);
      return next(
        new RequestError(
          JSON.stringify({ errors: `Bad request: ${errorMessages}` })
        )
      );
    }
    next();
  },
];
const validateId = [
  param("id").isMongoId().withMessage("Invalid user ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error) => error.msg)
        .join(", ");
      return next(
        new RequestError(
          JSON.stringify({ errors: `Bad request: ${errorMessages}` })
        )
      );
    }
    //   return res.status(400).json({ errors: errors.array() });
    //   return next(new RequestError(JSON.stringify({ errors: errors.array() })));
    next();
  },
];
module.exports = {
  validateAndSanitizeRegister,
  validateAndSanitizeLogin,
  validateId,
};
