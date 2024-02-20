const express = require("express");
const router = express.Router();

const postControllers = require("../controllers/postController");



router.get("/posts", postControllers.getAll);

router.post("/posts", postControllers.create);

router.get("/posts/:id", postControllers.findIt);

router.put("/posts/:id", postControllers.update);

router.delete("/posts/:id", postControllers.deleteIt);



module.exports = router;
