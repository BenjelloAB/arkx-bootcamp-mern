const express = require("express");
const router = express.Router();

const postControllers = require("../controllers/postController");



router.get("/posts", postControllers.getPosts);

router.post("/posts/create", postControllers.create_Post);

router.get("/posts/:id", postControllers.findPost);

router.put("/posts/:id", postControllers.updatePost);

router.delete("/posts/:id", postControllers.deletePost);

// router.use(postControllers.handleError);


module.exports = router;
