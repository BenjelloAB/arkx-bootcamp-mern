function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result = result * i;
  }
  return result;;
}


 function combinator(n, p) {
    return factorial(n) / (factorial(p) * factorial(n - p));
  }