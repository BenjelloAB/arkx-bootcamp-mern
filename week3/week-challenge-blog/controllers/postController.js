const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../models/post");

async function getAll(req, res, next) {
  try {
    let posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

async function findIt(req, res, next) {
  try {
    let id = req.params.id;
    let posts = await getAllPosts();
    let post = posts.find((p) => p.id == id);
    if (post) {
      res.json(post);
    } else {
      throw new Error("No Post is Found with that id");
    }
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    if (!req.body) throw new Error("No body is found , must send the body!!");
    let post = await createPost(req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    let id = req.params.id;
    if (isNaN(id)) throw new Error("Invalid id (must be a number)");
    let phone = await updatePost(Number(id), req.body);
    res.json(phone);
  } catch (err) {
    next(err);
  }
}

async function deleteIt(req, res, next) {
  try {
    let id = req.params.id;
    if (isNaN(id)) throw new Error("Invalid id (must be a number)");
    let post = await deletePost(Number(id));
    res.json(
      `Deleted the following post successfully {id : ${post[0].id}, author: ${post[0].author}, title: ${post[0].title}}`
    );
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAll,
  findIt,
  create,
  update,
  deleteIt,
};
