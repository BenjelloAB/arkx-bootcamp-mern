const router = require("express").Router();
const {
  validateAndSanitizeRegister,
  validateAndSanitizeLogin,
  validateId,
} = require("../middleware/validation_users");
const {
  isAuthenticated,
  validateToken,
} = require("../middleware/authentication");
const { register, findIt, login } = require("../controllers/user.controller");
// router.get("/login")
router.post("/login", isAuthenticated, login);

// router.get("/register")
router.post("/register" , isAuthenticated, register);

router.get("/:id", findIt);



module.exports = router