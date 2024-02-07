var number = function(busStops){
    // Good Luck!
    let in_humans = []
    let out_humans = []
    busStops.map((x, index)=> {

      out_humans.push(x[0]) 
      in_humans.push(x[1]);
    })
    let sum_in = in_humans.reduce((acc, curr) => acc + curr, 0);
    let sum_out = out_humans.reduce((acc, curr) => acc + curr, 0);
    return sum_out - sum_in;
    // console.log("out_humans")
    // console.log(out_humans)
    // console.log("in_humans")
    // console.log(in_humans)
    
  }


  console.log(number([[10,0],[3,5],[5,8]]))