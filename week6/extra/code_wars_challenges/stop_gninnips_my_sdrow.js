function spinWords(string){
    let arr = string.split(" ")
    let newStr = arr.map(el => {
      if(el.length >= 5)
        {
          return el.split("").reverse().join("")
  }
      return el;
    })
    return newStr.join(" ");
  }