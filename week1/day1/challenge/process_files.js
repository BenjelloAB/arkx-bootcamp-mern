const wrtiteFileAsync = require("./writeFielAsync");
const readFileAsync = require("./readFileAsync");
const fs = require("fs");

async function processFiles(...files) {
  for (let i = 0; i < files.length; i++) {

    //! checking if file exists
    if (!fs.existsSync(files[i])) {
      console.log(`${files[i]} does not exist`);
      continue;
    }
    let data = "";
    try {
      data = await readFileAsync(files[i]);
    } catch (err) {
      console.log(err);
    }
    const now = new Date();
    data = data.split(" ").concat(now).join(" ");
    try {
      await wrtiteFileAsync(files[i], data);
      console.log(`${files[i]} has been updated`)
    } catch (err) {
     console.log(err);
    }
  }
}

module.exports = processFiles;
