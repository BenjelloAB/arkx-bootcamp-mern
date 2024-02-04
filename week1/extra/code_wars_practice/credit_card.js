// return masked string
function maskify(cc) {
    if(cc.length <= 4)
        return cc;
    let arr = cc.split("");
    for(let i = 0; i < arr.length - 4; i++)
      {
        arr[i] = '#';
  }
    return arr.join("");
    
  }

  console.log(maskify("1237468123674"));