const fs = require("fs").promises;
const { RequestError, NotFoundError } = require("../customErrors");

const path = "./posts.json";

async function deletePost(postId) {
  try {
    let posts_arr = await getAllPosts();
    let post_index = posts_arr.findIndex((p) => p.id === postId);
    if (post_index === -1)
      throw new NotFoundError("No Post is Found with that id");
    let p = posts_arr.splice(post_index, 1);

    await fs.writeFile(path, JSON.stringify({ posts: posts_arr }));
    return p;
  } catch (err) {
    throw err;
  }
}
async function updatePost(postId, data) {
  try {
    let post_arr = await getAllPosts();
    let post_index = post_arr.findIndex((p) => p.id === postId);
    if (post_index === -1)
      throw new NotFoundError("No Post is Found with that id");

    post_arr[post_index] = { ...post_arr[post_index], ...data };
    await fs.writeFile(path, JSON.stringify({ posts: post_arr }));
    return post_arr[post_index];
  } catch (err) {
    throw err;
  }
}

async function createPost(body) {
  try {
    let posts_arr = await getAllPosts();
    let id =
      posts_arr.reduce(
        (acc, curr) => (acc < curr.id ? curr.id : acc),
        posts_arr[0].id
      ) + 1;
    let post = { id, ...body };
    posts_arr.push(post);
    await fs.writeFile(path, JSON.stringify({ posts: posts_arr }));
    return post;
  } catch (err) {
    throw err;
  }
}

async function getAllPosts() {
  try {
    let data = await fs.readFile(path, { encoding: "utf-8" });
    let p_obj = JSON.parse(data);
    if (p_obj.posts.length === 0)
      throw new NotFoundError("No Posts are Available");
    else return p_obj.posts;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};
