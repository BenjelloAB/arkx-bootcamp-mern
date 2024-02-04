let a = -15;
let b = 6;
let c = 6;
if (a > b && a > c) {
  console.log(a);
} else if (b > a && b > c) {
  console.log(b);
} else {
  console.log(c);
}

let max = a;
//? Maximum dyal lcoach
if (max < b) max = b;
if(max < c) max = c;