function binary_search(arr, el) {
  //? ghangado left w right bach n7sssbo bihom l
  //? l index dyal lmid
  let left = 0;
  let right = arr.length - 1;

  //   if (typeof el !== "number") return -1;

  //? ila fatet l index dyal left
  while (right >= left) {
    //! if right < left we will exit

    mid = Math.floor((right + left) / 2);

    //? ghanchofo wach l element hwa brasso 3ndo l index mid
    if (arr[mid] == el) {
      return mid;
    }

    //? ila l element sghr mn l item li fl mid
    //? right ghadi trj3 lor
    if (arr[mid] > el) {
      right = mid - 1;
    } else {
    //? ila l item (arr[mid]) kbr mn l element 
    //? ghadi nzido b left l9dam
    //? rssm hadchi bach tzid tfhm
      left = mid + 1;
    }
  }
  return -1;
}
console.log(binary_search([1,20,123,700,10], 700));
console.log(binary_search([1,20,123,700,10], 7000));