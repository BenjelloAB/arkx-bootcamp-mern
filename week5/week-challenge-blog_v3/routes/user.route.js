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


// router.get("/login",  isAuthenticated, loginGet)x
router.post("/login", validateAndSanitizeLogin ,login);

// router.get("/register",  isAuthenticated , registerGet)
router.post("/register" , validateAndSanitizeRegister, register);

router.get("/:id", findIt);



module.exports = router