const fs = require("fs");

function wrtiteFileAsync(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content);
  });
}

function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path);
  });
}


const readline = require("readline");

console.log(readline)
console.log("==============")
console.log(readline.Interface)
console.log("==============")
console.log(readline)