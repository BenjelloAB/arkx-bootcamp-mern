let margins = "";
let stars = "";
let cols = 5;
let rows = 3;
let c = rows - 1;
// outer loop
for (let i = 1; i <= cols; i += 2) {
  stars = "";
  margins = "";
  for (let k = 0; k < c; k++) margins += " ";
  for (let j = 0; j < i; j++) stars += "*";
  console.log(margins + stars);
  c--;
  if (i == cols) {
    let jid3 = "";
    for (let i = 1; i <= rows - 1; i++) {
      jid3 += " ";
    }
    jid3 += "|";
    console.log(jid3);
  }
}

