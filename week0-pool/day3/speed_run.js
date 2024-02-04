
//! sum of elements in an array task
function sum(numbers) {
  let s = 0;
  if (numbers.length === 0) return s;
    for (let i = 0; i < numbers.length; i++) {
      s += numbers[i];
    }
  return s;
}
console.log("===================");
console.log(sum([1, 2, 3, 4]));
console.log(sum([-1, 123.123, 0, 123]));


//! count even numbers in an array task
function countEven(numbers) {
  let c = 0;
  if(numbers.length == 0) return c;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) c++;
  }
  return c;
}
console.log("===================");
console.log(countEven([123, 3, 4, 2, 1]));
console.log(countEven([4, , 1]));


//! double each element in the array task
function double(numbers) {
    let double_arr = [];
  if (numbers.length === 0) return double_arr;
  for (let i = 0; i < numbers.length; i++) {
    double_arr.push(numbers[i] * 2);
  }
  return double_arr;
}

console.log("===================");
console.log(double([123, 3, 4, 2, 1]));
console.log(double([4, , 1]));


//! t9achr task
function insertion_sort(arr) {
    let hole, value;
    
  for (let i = 1; i < arr.length; i++) {
      value = arr[i];
    hole = i;
    while (hole > 0 && arr[hole - 1] > value) {
      arr[hole] = arr[hole - 1];
      hole--;
    }
    arr[hole] = value;
  }
  return arr;
}

console.log(insertion_sort([7, 2, 4, 1, 5, 3]));

function sockMerchant(socks) {
    //? sort first then compare pairs
  socks = insertion_sort(socks);
  //? and skip 2 if match do nothing if not
  let pairs = 0;
  for(let i = 0; i < socks.length; i++)
  {
      if(socks[i] == socks[i+ 1])
      {
          pairs++;
          i++;
        }
    }
    return pairs;
}
console.log("===================");
console.log(sockMerchant([1, 1, 4, 2,1, 3, 55, 2]))
console.log(insertion_sort([1, 1, 4, 2,1, 3, 55,2, 2]))
