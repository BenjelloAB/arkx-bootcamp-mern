function insertion_sort(arr) {
  let hole;
  let value;

  //?we will start from 1 since we are considering
  //? el[0] as the sorted sub-set
  //? where we will insert elements one by one
  //?and find a good place for the inserted element
  //? in the sorted sub-set
  for (let i = 1; i < arr.length; i++) {
    //? first value in the unsorted sub-set
    value = arr[i];
    //?hole represent the index at which
    //? our value should be inserted
    
    hole = i;

    //? since the sub-set on the left is already sorted
    //? if hole == 0 OR the element on the left of our
    //? current value is <= value then we exit the while
    //? loop
    while (hole > 0 && arr[hole - 1] > value) {
      arr[hole] = arr[hole - 1];
      //! if value is indeed smaller
      //! we will fill the hole with the left value
      //! arr[hole - 1] will keep its value for now
      //! arr[hole - 1] will be arr[hole] at the end of this iteration
      //! and will be filled with either value (if we exit)
      //! or with the left element if we go through the next iteration

      hole--;
      //! when filling the hole with the left element
      //! its like switching places between the left element and the hole
      //! so we move the hole index to its appropriate position by decrem.
    }
    arr[hole] = value;
    //! when we exit the loop we will be left with a whole
    //! to fill with the value
  }
  return arr;
}

console.log(insertion_sort([7, 2, 4, 1, 5, 3]));
