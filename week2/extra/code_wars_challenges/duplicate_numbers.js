
//method 0 : without keeping order just grouping from asc or desc
// function group(arr) {
//   let arr_sorted = arr.sort((a, b) => b - a);
//   let outer_arr = [];
//   let i = 0;
//   while (i < arr_sorted.length) {
//     let a = [];
//     a.push(arr_sorted[i]);
//     i++;
//     while (arr_sorted[i] == a[0]) {
//       a.push(arr_sorted[i]);
//       i++;
//     }
//     if (a.length > 0) {
//       outer_arr.push(a);
//     }
//   }
//   return outer_arr;
// }

function group(arr) {
  let arr_cp = arr.slice();
  let outer_arr = [];
  let i = 0;
  while (i < arr_cp.length) {
    let a = [];
    a.push(arr_cp[i]);
    i++;
    for (let j = i; j < arr_cp.length; j++) {
      if (arr_cp[j] == a[0]) {
        a.push(arr_cp[j]);
        arr_cp.splice(j, 1);
        j--;
      }
    }
    if (a.length > 0) {
      outer_arr.push(a);
    }
  }
  return outer_arr;
}

console.log(group([11, 11, 20, 16, 13, 12, 16, 11, 16, 20]));
