function isSolved(board) {
  // TODO: Check if the board is solved!
  let [a, b, c] = board;
  console.log(a);
  console.log(b);
  console.log(c);

  let containZeros = false;
  //handling empty slots :
  for (let i = 0; i < board.length; i++) {
    if (a[i] === 0 || b[i] === 0 || c[i] === 0) containZeros = true;
  }

  //handle vertical cases
  if (
    (a[0] === b[0] && a[0] === c[0] && NoZeros(a[0], b[0], c[0])) ||
    (a[1] === b[1] && a[1] === c[1] && NoZeros(a[1], b[1], c[1])) ||
    (a[2] === b[2] && a[1] === c[2] && NoZeros(a[2], b[2], c[2]))
  )
    return a[0];

  //handle horizontal cases
  if (
    (a[0] === a[1] && a[0] === a[2] && NoZeros(a[0], a[1], a[2])) ||
    (b[0] === b[1] && b[0] === b[2] && NoZeros(b[0], b[1], b[2])) ||
    (c[0] === c[1] && c[0] === c[2] && NoZeros(c[0], c[1], c[2]))
  )
    return a[0];

  //handle x cases
  if (
    (a[0] === b[1] && a[0] === c[2] && NoZeros(a[0], b[1], c[2])) ||
    (a[2] === b[1] && a[2] === c[0] && NoZeros(a[2], b[1], c[0]))
  )
    return a[0];

  return containZeros ? -1 : 0;
}

function NoZeros(e1, e2, e3) {
  if (e1 !== 0 && e2 !== 0 && e3 !== 0) return true;
  return false;
}
console.log(
  isSolved([
    [2, 1, 1],
    [0, 1, 1],
    [2, 2, 2],
  ])
);
