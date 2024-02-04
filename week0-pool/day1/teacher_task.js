let score = 83;
//sol1:
// switch (true) {
//   case score <= 15:
//     console.log("F");
//     break;
//   case score <= 40 && score > 15:
//     console.log("E");
//     break;
//   case score <= 55 && score > 40:
//     console.log("D");
//     break;
//   case score <= 70 && score > 55:
//     console.log("C");
//     break;
//   case score <= 85 && score > 70:
//     console.log("B");
//     break;
//   case score > 85:
//     console.log("A");
//     break;
// }

//sol2:
if (score > 0 && score <= 15) {
  console.log("F");
} else if (score <= 40 && score > 15) {
  console.log("E");
} else if (score <= 55 && score > 40) {
  console.log("D");
} else if (score <= 70 && score > 55) {
  console.log("C");
} else if (score <= 85 && score > 70) {
  console.log("B");
} else if(score >= 85 && score <= 100){
  console.log("A");
}

