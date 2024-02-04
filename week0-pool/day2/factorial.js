function factorial(n) {
  if (n == 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5));

let num = 5;
let result = 1;
if (num === 0 || num === 1) result = 1;
else {
  for (let i = 1; i <= num; i++) {
    result *= i;
  }
}
console.log(result);
