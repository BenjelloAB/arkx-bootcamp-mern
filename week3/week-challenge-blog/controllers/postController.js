const { getAllPosts, createPost } = require("../models/post");
// const path = "./posts.json";
const path = "./week-challenge-blog/posts.json";

const fs = require("fs").promises;

async function getPosts(req, res, next) {
  try {
    let posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

async function findPost(req, res, next) {
  try {
    let id = req.params.id;
    let posts = await getAllPosts();
    let post = posts.find((p) => p.id == id);
    if (post) {
      res.json(post);
    } else {
      // res.status(404).json("Not Found");
      throw new Error("No Post is Found with that id");
    }
  } catch (err) {
    next(err);
  }
}

async function create_Post(req, res, next) {
  try {
    let posts_arr = await getAllPosts();
    let { author, title, description, text } = req.body;
    if (!author || !title || !description || !text)
      throw new Error(
        "format: {author, title, description, text } is reuqired, some key(s) are missing"
      );

    let id =
      posts_arr.reduce(
        (acc, curr) => (acc < curr.id ? curr.id : acc),
        posts_arr[0].id
      ) + 1;
    let sub_post = createPost(author, title, text, description);
    let post = { id: id, ...sub_post };

    posts_arr.push(post);

    await fs.writeFile(path, JSON.stringify({ posts: posts_arr }));

    res.json(posts_arr);
  } catch (err) {
    // console.log(err.message);
    next(err);
  }
}

async function updatePost(req, res, next) {
  try {
    let id = Number(req.params.id);
    // let { author, title, description, text } = req.body;

    let post_arr = await getAllPosts();
    let post_index = post_arr.findIndex((p) => p.id === id);
    if (post_index === -1) throw new Error("No Post is Found with that id");
    else {
      //   post_arr[post_index] = {
      //     ...post_arr[post_index],
      //     author: author ? author : post_arr[post_index].author,
      //     title: title ? title : post_arr[post_index].title,
      //     description: description ? description : post_arr[],
      //     text: text,
      //   };

      // if (author) {
      //   post_arr[post_index].author = author;
      // }
      // if (title) {
      //   post_arr[post_index].title = title;
      // }
      // if (description) {
      //   post_arr[post_index].description = description;
      // }
      // if (text) {
      //   post_arr[post_index].text = text;
      // }

      post_arr[post_index] = { ...post_arr[post_index], ...req.body };
      await fs.writeFile(path, JSON.stringify({ posts: post_arr }));
      res.json(post_arr[post_index]);
    }
  } catch (err) {
    next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    let id = Number(req.params.id);
    let posts_arr = await getAllPosts();
    let post_index = posts_arr.findIndex((p) => p.id === id);
    if (post_index === -1) throw new Error("No Post is Found with that id");
    else {
      posts_arr.splice(post_index, 1);
      await fs.writeFile(path, JSON.stringify({ posts: posts_arr }));
      res.json(posts_arr);
    }
  } catch (err) {
    next(err);
  }
}

// function handleError(err, req, res, next)
// {
//   res.status(400).json(err.message);
// }

// function logger(req, res, next)
// {
//   const now = new Date().toString()
//   console.log(req.method+" "+req.path+" "+now);
//   next();

// }

module.exports = {
  getPosts,
  findPost,
  create_Post,
  updatePost,
  deletePost,
};
