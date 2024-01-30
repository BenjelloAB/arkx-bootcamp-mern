const fs = require("fs");


function wrtiteFileAsync(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
}

module.exports = wrtiteFileAsync;
