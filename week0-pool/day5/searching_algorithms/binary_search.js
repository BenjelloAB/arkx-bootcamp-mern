//given sorted array

function binarySearch (array, target){
    let leftIndex = 0 //since we start array counting with 0
    let rightIndex = array.length -1 // since the last number will be out of the array, we must reduce 1 to stay in the array

    while (leftIndex <= rightIndex){    //otherwise, the left index may surpass the right index  
        let middleIndex = Math.floor((leftIndex+rightIndex)/2)  //is leftindex went after the right index we will have a negative mid index 
        if (array[middleIndex] === target){
            return middleIndex
        }
        if (array[middleIndex] > target){
            rightIndex = middleIndex - 1
        }
        else{
            leftIndex = middleIndex + 1
        }
    }
    return -1

}




//Example

let notes = [1,10,7,6,8,9,4]
let pp = 1
console.log(binarySearch(notes,pp))