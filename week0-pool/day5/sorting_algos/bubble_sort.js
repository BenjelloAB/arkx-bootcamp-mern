function bubbleSort(arr) {
    let flag; // Declare a flag to track whether a swap has occurred.
    let n = arr.length - 1; // Set 'n' to the last index of the array.
  
    for (let i = 0; i < n; i++) { // Outer loop: iterate over the array.
        flag = false; // Assume the array is sorted until a swap is made.
  
        for (let j = 0; j < n - i; j++) { //! we use i form the outer loop to prevent comparing with the sorted elements at the right 
            if (arr[j] > arr[j + 1]) { // Compare adjacent elements.
                // Swap if the current element is greater than the next element.
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = true; // Mark that a swap has occurred.
            }
        }
  
        if (flag == false) // If no swaps were made, the array is sorted.
            break; // Break out of the loop early since the array is sorted.
    }
  
    return arr; 
  }