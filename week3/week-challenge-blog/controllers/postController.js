const { RequestError, NotFoundError } = require("../customErrors");

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
    if (isNaN(id)) throw new RequestError("Invalid id (must be a number)");
    let posts = await getAllPosts();
    let post = posts.find((p) => p.id == id);
    if (post) {
      res.json(post);
    } else {
      throw new NotFoundError("No Post is Found with that id");
    }
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    let {author , title, description, text} = req.body;
    if (!author || !title || !description || !text)
      throw new RequestError(
        "format: {author, title, description, text } is reuqired, some key(s) are missing"
      );
    let post = await createPost(req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    let id = req.params.id;
    if (isNaN(id)) throw new RequestError("Invalid id (must be a number)");
    let phone = await updatePost(Number(id), req.body);
    res.json(phone);
  } catch (err) {
    next(err);
  }
}

async function deleteIt(req, res, next) {
  try {
    let id = req.params.id;
    if (isNaN(id)) throw new RequestError("Invalid id (must be a number)");
    let post = await deletePost(Number(id));
    res.json(
      `Deleted the following post successfully{id : ${post[0].id}, author: ${post[0].author},title: ${post[0].title}}`
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
