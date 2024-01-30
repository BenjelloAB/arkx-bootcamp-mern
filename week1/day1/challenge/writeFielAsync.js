const fs = require("fs");

function writeFileAsync(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

writeFileAsync("test5sdfsdfsfdsd5.txt", "Hi there")
  .then(() => {
    console.log("worked just fine");
  })
  .catch((err) => {
    console.log("Error : ", err.message);
  });

(async function main() {
  try {
    await writeFileAsync("test55.txt", "Hi there");
    console.log("Worked fine");
  } catch (err) {
    console.log("Wa lerror hwa : ", err.message);
  }
})();

module.exports = writeFileAsync;
