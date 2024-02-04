function bubble_sort(arr) {
    let swapped;
  
    //! this will preserve the number of sorted elements in the sorted part
    //! increented after each iteration as the biggest element in the array get bubbled up
    //! to the end (or to the sorted part)
  
    for (let i = 0; i < arr.length - 1; i++) {
      //! arr.length - 1 so we don't an out of range error
      //! as we compare arr[i] with arr[i+1]
  
      //! means the array is already sorted
      swapped = false;
  
      //! arr.length - i - 1 prevent us from comparing an element
      //! with another element which is sorted
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapped = true;
          //! indicate that a swap happened
          //! thus we dont have to quit yet
        }
      }
      //! if true then in the last iteration(above for loop) we had no
      //! swaps = array is sorted =  we need to quit for performance
      if (swapped == false) break;
    }
    return arr;
  }
  console.log(bubble_sort([7, 2, 4, 1, 5, 3]));
