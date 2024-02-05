const { p1, p2 } = require("./process_files");

async function main() {
  try {
    await p2("./test.txt", "test2.txt", "test55.txt");
    console.log("All the files have been processed successfully");
  } catch (err) {
    console.log(err);
  }
}
main();

//! another testing method
// (async function main() {
//   try {
//     await p1("test1.js", "test2.js", "tetstst");
//   } catch (err) {
//     console.log(err);
//   }
// })();
