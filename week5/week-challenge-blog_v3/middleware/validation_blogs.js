const { body, param, query, validationResult } = require("express-validator");
const { RequestError } = require("../customErrors");

const validateId = [
  param("id").isMongoId().withMessage("Invalid user ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error) => error.msg)
        .join(", ");
      return res.status(400).send(`Bad request: ${errorMessages}`);
    }
    //   return res.status(400).json({ errors: errors.array() });
    //   return next(new RequestError(JSON.stringify({ errors: errors.array() })));
    next();
  },
];

const nonStrictSanitization = [
  body("author").trim().escape(),
  body("title").trim().escape(),
  body("text").trim().escape(),
  body("description").trim().escape(),
  body("categories.*").trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error) => error.msg)
        .join(", ");
      return res.status(400).send(`Bad request: ${errorMessages}`);
    }
    next();
  },
];

const strictValidationSanitization = [
  body("author")
    .exists()
    .withMessage("author field is required")
    .trim()
    .escape(),
  body("title").exists().withMessage("title field is required").trim().escape(),
  body("text").exists().withMessage("text field is required").trim().escape(),
  body("description")
    .exists()
    .withMessage("description field is required")
    .trim()
    .escape(),
    body('categories').isArray().withMessage('Categories must be an array'),
    body("categories.*").not().isEmpty().withMessage('Category name cannot be empty').trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error) => error.msg)  
        .join(", "); 

      return res.status(400).send(`Bad request: ${errorMessages}`);
    }
    next();
  },
];

module.exports = {
  validateId,
  nonStrictSanitization,
  strictValidationSanitization,
};
