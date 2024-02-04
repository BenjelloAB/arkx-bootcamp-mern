function selection_sort(arr) {
  let iMin;

  //?this outer loop take care of the initial value of the
  //? min

  for (let i = 0; i < arr.length - 1; i++) {
    //! saving the min index as i to keep track of the min
    //! iMin will be the index of min
    iMin = i;

    //! we start from i+1 so we avoid comparing the min with itself
    //! which is a waste of performance
    for (let j = i + 1; j <= arr.length - 1; j++) {
      if (arr[j] < arr[iMin]) {
        //! changing the index of the min
        //! we will eventually find the index of the min
        //! in the unsorted subset
        iMin = j;
      }
    }
    //! swapping 
    if (iMin !== i) {
      let temp = arr[i];
      arr[i] = arr[iMin];
      arr[iMin] = temp;
    }
  }
  return arr;
}
console.log(selection_sort([7, 2, 4, 1, 5, 3]));
