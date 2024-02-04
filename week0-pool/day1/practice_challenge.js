let firstname = "Abderrahmane";
let lastname = "Benjelloun";
const PI = 3.14;
let radius = 123;
let favoriteSuperhero = "Arthur Morgan";
let favoriteQuote = '"Revenge is a fools game"';

let fullName = firstname + " " + lastname;
console.log("fullname: "+ fullName);
let area = PI * (radius ** 2);
console.log("area = "+area);
let perimeter = 2 * PI * radius;
console.log("perimeter = "+ perimeter);
let motivation = "A wise man named " + favoriteSuperhero + ": "+ favoriteQuote;
console.log(motivation)

//? swapping
let a = 3;
let b = 10;
let temp;
temp = a;
a = b;
b = temp;
console.log("After swapping: a = ", a, " and b = ", b);