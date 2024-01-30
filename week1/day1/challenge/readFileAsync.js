const fs = require("fs");

function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "ascii" }, (err, data) => {
      if (err) reject(err);
      if (data) resolve(data);
    });
  });
}

module.exports =  readFileAsync ;
