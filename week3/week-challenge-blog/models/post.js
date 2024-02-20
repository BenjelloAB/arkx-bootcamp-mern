const fs = require("fs").promises;

const path = "./week-challenge-blog/posts.json";

async function getAllPosts() {
  try {
    let data = await fs.readFile(path, { encoding: "utf-8" });
    let p_obj = JSON.parse(data);
    // return p_obj.posts;
    if(p_obj.posts.length === 0)
        throw new Error("No Posts are Available");
    else 
      return p_obj.posts;
  } catch (err) {
    throw err;
  }
}

function createPost(author, title, text, desc) {
  return ;
}


// console.log(createPost("Zaka", "test", "asdf","3243214"));
module.exports = {
  getAllPosts,
  createPost,
};
