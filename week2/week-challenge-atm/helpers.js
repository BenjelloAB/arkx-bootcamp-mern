const fs = require("fs");
                                                    
/**
 * 
 * @returns 
 */
function generateDateNow() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate; // Output: yyyy-mm-dd
}
/**
 * 
 * @param {*} path 
 * @returns 
 */
async function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf8" }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
/**
 * 
 * @param {*} path 
 * @param {*} data 
 * @returns 
 */
async function writeFileAsync(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
/**
 * 
 * @param {*} path 
 * @returns 
 */
function existsAsync(path) {
  return new Promise((resolve) => {
    let found = fs.existsSync(path);
    resolve(found);
  });
}


module.exports = {
  generateDateNow,
  writeFileAsync,
  readFileAsync,
  existsAsync,
};
