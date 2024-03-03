const fs = require("fs").promises;

const { RequestError, NotFoundError } = require("../customErrors");
const mongoose = require("mongoose");

// Custom validation function to limit the number of categories
function arrayLimit(val) {
  return val.length <= 5;
}
// console.log(process.env.MONGO_URI);
const BlogSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    description: { type: String, required: true },
    categories: {
      type: [{ name: { type: String, required: true , unique: true} }],
      required: true,
      validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
    },
  },
  {
    timestamps: true,
  }
);
// BlogSchema.pre()
const Blog = mongoose.model("Blog", BlogSchema);

async function deletePost(postId) {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(postId);
    if (!deletedBlog) throw new NotFoundError("Blog Not Found!");
    return deletedBlog;
  } catch (err) {
    throw err;
  }
}
async function deleteAllPosts() {
  try {
    const info = await Blog.deleteMany();
    return info;
  } catch (err) {
    throw err;
  }
}

async function findPost(postId) {
  try {
    const blog = await Blog.findById(postId);
    if (!blog) throw new NotFoundError("Blog Not found");
    return blog;
  } catch (err) {
    throw err;
  }
}

async function updatePost(postId, updatedData) {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      postId,
      { $set: updatedData },
      { new: true }
    );
    if (!updatedBlog) throw new NotFoundError("Blog Not Found");
    return updatedBlog;
  } catch (err) {
    throw err;
  }
}
async function createPost(body) {
  try {
    const data = await Blog.create(body);
    return data;
  } catch (err) {
    throw err;
  }
}

async function getAllPosts() {
  try {
    let data = await Blog.find({});
    if (data.length === 0) throw new NotFoundError("No Blogs Are Found");
    return data;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  findPost,
  deleteAllPosts,
};
