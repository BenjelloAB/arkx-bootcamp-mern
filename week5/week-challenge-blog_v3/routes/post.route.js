const express = require("express");
const router = express.Router();
const {
  validateId,
  nonStrictSanitization,
  strictValidationSanitization,
} = require("../middleware/validation_blogs");

const {
  isAuthenticated,
  validateToken,
} = require("../middleware/authentication");
const postControllers = require("../controllers/post.controller");

router.get("/", validateToken, postControllers.getAll);

//crete post
router.post(
  "/",
  validateToken,
  strictValidationSanitization,
  postControllers.create
);

//delete all posts
router.delete("/", validateToken, postControllers.deleteAll);

//find by id
router.get("/:id", validateToken, validateId, postControllers.findIt);

//update by id
router.put(
  "/:id",
  validateToken,
  validateId,
  nonStrictSanitization,
  postControllers.update
);

//delete post by id
router.delete("/:id", validateToken, validateId, postControllers.deleteIt);

module.exports = router;
