function narcissistic(value) {
  // Code me to return true or false
  let count_nums = 0;
  let value_cp = value;
  while (value_cp !== 0) {
    value_cp = Math.floor(value_cp / 10);
    count_nums++;
  }
  value_cp = value;
  let s = 0;
  while (value_cp !== 0) {
    s += (value_cp % 10) ** count_nums;
    value_cp = Math.floor(value_cp / 10);
  }
  return s === value;
}
console.log(narcissistic(123));
