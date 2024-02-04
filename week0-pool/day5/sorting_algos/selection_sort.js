function selection_sort(arr) {
    let iMin; //? iMin will hold the index of the actual min element at the end
  

  
    for (let i = 0; i < arr.length - 1; i++) { //? outer loop will preserve the initial min element
      iMin = i;

      for (let j = i + 1; j <= arr.length - 1; j++) {
        if (arr[j] < arr[iMin]) {

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
  