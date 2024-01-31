const writeFileAsync = require("./writeFielAsync");
const readFileAsync = require("./readFileAsync");
const fs = require("fs");

//! -- method1
async function processFiles(...files) {
  for (let i = 0; i < files.length; i++) {
    //     //! checking if file exists
    if (!fs.existsSync(files[i])) {
      console.log(`${files[i]} does not exist`);
      continue;
    }
    let data = "";
    try {
      data = await readFileAsync(files[i]);

      const now = new Date();
      data = data.split(" ").concat(now).join(" ");
      await writeFileAsync(files[i], data);
      console.log(`${files[i]} has been updated`);
    } catch (err) {
      console.log(err);
    }
  }
}

//! method2 no await and no async
function processFiles1(...files) {
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    //! checking if file exists
    if (!fs.existsSync(file)) {
      console.log(`${file} does not exist`);
      continue;
    }
    let read_data = "";
    readFileAsync(file)
      .then((data) => {
        const now = new Date();
        read_data = data.split(" ").concat(now).join(" ");
        // console.log(read_data);
        writeFileAsync(file, read_data)
          .then(() => {
            console.log(`${file} has been updated`);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = { p1: processFiles1, p2: processFiles };
