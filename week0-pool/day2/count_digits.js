let count = 0;
let num = 123452;
while (num !== 0) {
  num = Math.floor(num / 10);

  count++;
}

console.log(count);
// console.log(count);
// console.log(typeof num)
// console.log(num)
// console.log(Math.floor(num / 10))
