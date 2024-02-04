//How to find the index of an element using linear Search


function linearSearch (array, target){   
    for (i=0 ; i< array.length ; i++){
        if (array[i] === target){
            return i
        }
    }
    return -1
}



//Example 
let notes = [1,10,20,7,6,8,9]
let highest = 20
console.log(linearSearch(notes, highest))