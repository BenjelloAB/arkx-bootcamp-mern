const fs = require("fs");

function wrtiteFileAsync(path, content) {
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

wrtiteFileAsync("test55.txt", "Hi there")
  .then(() => {
    console.log("worked just fine");
  })
  .catch((err) => {
    console.log("Error : ", err.message);
  });

(async function main() {
  try {
    await wrtiteFileAsync("test55.txt", "Hi there");
    console.log("Worked fine");
  } catch (err) {
    console.log("Wa lerror hwa : ", err.message);
  }
})();

module.exports = wrtiteFileAsync;
