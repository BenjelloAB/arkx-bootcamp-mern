
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

function calculator(num1, op, num2) {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "/":
      return num1 / num2;
    case "%":
      return num1 % num2;
    case "*":
      return num1 * num2;
    case "c":
      return combinator(num1, num2);
    default:
      return "Not valid operation";
  }
}

//? Tests:
console.log(calculator(5, "+", 1));
console.log(calculator(3, "*", -4));
console.log(calculator(5, "c", 2));
