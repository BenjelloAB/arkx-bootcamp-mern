const {p1, p2} = require("./process_files");

function main() {
  try {
    p1("./test.txt", "test2.txt", "test55.txt");
  } catch (err) {
    console.log(err);
  }
}
main();


//! another testing method
(async function main() {
  try {
    await processFiles("test1.js", "test2.js", "tetstst");
  } catch (err) {
    console.log(err);
  }
})();
