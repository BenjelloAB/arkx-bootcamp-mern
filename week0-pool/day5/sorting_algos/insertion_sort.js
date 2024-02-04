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