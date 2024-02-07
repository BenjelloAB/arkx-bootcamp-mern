function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}
function divide(num1, num2) {
  if (num2 === 0) throw new Error("Division By 0");
  return num1 / num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}


(function main(){
    try{
        console.log(add(123,123));
        console.log(sub(123,123));
        console.log(multiply(123,123));
        console.log(divide(23,123));
    }catch(err) {
        console.log(err.message);
    }
})();