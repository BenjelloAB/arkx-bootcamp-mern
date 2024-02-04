
//! previous challenges inside functions

function factorial(n) {
  let result = 1;
  if (n === 0 || n === 1) return result;
  else {
    for (let i = 1; i <= n; i++) {
      result = result * i;
    }
  }
  return result;
}

console.log("====factorial test====");
console.log(factorial(5));
console.log(factorial(2));
console.log(factorial(1));
console.log(factorial(0));

function nDigits(number) {
  let count = 0;
  while (number !== 0) {
    number = Math.floor(number / 10);
    count++;
  }
  return count;
}

console.log("====nDigits test====");
console.log(nDigits(123));

function numberToday(number) {
  switch (number) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
    default:
      return "Not a Valid Number";
  }
}
console.log("====numberToday test====");
console.log(numberToday(3));
console.log(numberToday(1000));

function max(a, b, c) {
  let max = a;
  if (max < b) max = b;
  if (max < c) max = c;
  return max;
}
function max2(...nums)
{
  if(nums.length === 0)
    return;
  let max = a[0];
  for(let i = 1; i < nums.length; i++)
  {
      if(max < a[i])
      {
        max = a[i];
      }
  }
  return max;
}
console.log("====maxy maxy test====");
console.log(max(1, 2, 3));

function myGrade(score) {
  if (score > 0 && score <= 15) {
    return "F";
  } else if (score <= 40 && score > 15) {
    return "E";
  } else if (score <= 55 && score > 40) {
    return "D";
  } else if (score <= 70 && score > 55) {
    return "C";
  } else if (score <= 85 && score > 70) {
    return "B";
  } else if (score >= 85 && score <= 100) {
    return "A";
  } else {
    return "Not a valid grade";
  }
}

console.log("====myGrade test====");
console.log(myGrade(-200000));
