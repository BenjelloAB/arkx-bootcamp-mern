const chai = require("chai");
const assert = chai.assert;
chai.config.truncateThreshold = 0

function digitalRoot(n) {
  let s = 0;
  while (n >= 10) {
    s = 0;

    while (n !== 0) {
      s += n % 10;
      n = Math.floor(n / 10);
    }
    n = s;
  }
  return s;
}
describe("Tests", () => {
  it("test", () => {
    assert.strictEqual(digitalRoot(16), 7);
    assert.strictEqual(digitalRoot(456), 6);
  });
});
