const processFiles = require("./process_files");

async function main() {
  try {
    await processFiles("test.txt", "test2.js", "tetstst");
  } catch (err) {
    console.log(err);
  }
}
main();
// (async function main() {
//   try {
//     await processFiles("test1.js", "test2.js", "tetstst");
//   } catch (err) {
//     console.log(err);
//   }
// })();
