const { RequestError, NotFoundError } = require("../customErrors");

const mongoose = require("mongoose");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  findPost,
  deleteAllPosts,
} = require("../models/post.model");


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
    const id = req.params.id;
    // if (!mongoose.Types.ObjectId.isValid(id))
    //   throw new RequestError("Invalid id (findIt) ");
    const post = await findPost(id);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    let { author, title, description, text } = req.body;
    // if (!author || !title || !description || !text)
    //   throw new RequestError(
    //     "format: {author, title, text, description } is reuqired, some key(s) are missing"
    //   );
    let post = await createPost({
      author: author,
      title: title,
      text: text,
      description: description,
    });
    res.json(post);
  } catch (err) {
    next(err);
  }
}
async function deleteAll(req, res, next) {
  try {
    const info = await deleteAllPosts();
    if (info.deletedCount === 0)
      throw new NotFoundError("No Blogs Are found to be deleted");
    res.json(info);
  } catch (err) {
    next(err);
  }
}
async function update(req, res, next) {
  try {
    let id = req.params.id;
    // if (!mongoose.Types.ObjectId.isValid(id))
    //   throw new RequestError("Invalid id (update) ");
    let updatedPost = await updatePost(id, req.body);
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
}

async function deleteIt(req, res, next) {
  try {
    let id = req.params.id;
    // if (!mongoose.Types.ObjectId.isValid(id))
    //   throw new RequestError("Invalid id (deleteIt) ");
    let deletedPost = await deletePost(id);
    res.json(deletedPost);
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
  deleteAll
};
