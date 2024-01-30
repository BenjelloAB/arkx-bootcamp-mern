const fs = require("fs");

function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8" , (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) resolve(data);
    });
  });
}

readFileAsync("test5dfgdfgfdf5.txt")
  .then((content) => {
    console.log(content);
  })
  .catch((err) => {
    console.log(err);
  });


async function main()
{
  try{
    let content = await readFileAsync("test55.txt");
    console.log("Works Fine");
    console.log(`content : ${content}`);
  }
  catch(err)
  {
    console.log(err.message);
  }
}

main()
module.exports = readFileAsync;
