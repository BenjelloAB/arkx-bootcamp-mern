const chai = require("chai");
const assert = chai.assert;
chai.config.truncateThreshold=0;


function isIsogram(str) {
  let arr = str.toLowerCase().split("");
  console.log(arr);
  arr.sort();
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) return false;
  }
  return true;
}



describe("Tests", () => {
    it("test", () => {
      assert.strictEqual( isIsogram("Dermatoglyphics"), true );
      assert.strictEqual( isIsogram("isogram"), true );
      assert.strictEqual( isIsogram("aba"), false, "same chars may not be adjacent" );
      assert.strictEqual( isIsogram("moOse"), false, "same chars may not be same case" );
      assert.strictEqual( isIsogram("isIsogram"), false );
      assert.strictEqual( isIsogram(""), true, "an empty string is a valid isogram" );
    });
  });