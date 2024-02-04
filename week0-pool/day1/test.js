let var_1 = "ben";
var ip_add = "127.0.0.1";
console.log("Hi " + var_1);
console.log("Your IP address is : ", ip_add);

let name = 'ben "Daniel"';

//? using escape characters
let name2 = 'ben "Daniel"';
let name3 = "ben 'Daniel'";
console.log(name);

//? Numbers
console.log(typeof 123213.212321);
console.log(typeof 123213);

//?Boolean:
console.log(typeof true);
console.log(typeof 1);

//? typeof is an operator
console.log(typeof null);
//? browser doesn know the type of null and give it object
//?its of type null

console.log(typeof undefined);
//?its of type undefined

let num = 123;
num = -num;
console.log(num);

let wantSugar = 0;
let coffeeReady = true;
if (wantSugar && coffeeReady) console.log("Adding Sugar to the coffee");
else if (coffeeReady) console.log("Enjoy your black coffee");
else console.log("coffe is not ready yet....");

let eyeColor = "Black";
switch (eyeColor) {
  case "red":
    console.log("you got red eyes go away");
    break;
  case "Black":
    console.log("Welcome to the Uni");
    break;
  case "blue":
    console.log("your are from europe right ? ");
    break;
  default:
    console.log("you have no eye color");
    break;
}

let value = true;
switch (typeof value) {
  case "number":
    console.log(`typeof ${value} is a "number"`);
    break;
  case "string":
    console.log(`typeof ${value} is a "string"`);
    break;
  case "object":
    console.log(`typeof ${value} is a "string"`);
    break;
  case "boolean":
    console.log(`typeof ${value} is a "boolean"`);
    break;
  default:
    console.log(`typeof ${value} is a "undefined"`);
    break;
}

console.log(eyeColor === "red" ? "you red eyed" : "your are not red eyed");

let dayNumber = 2;
let dayName;
switch (dayNumber) {
  case 1:
    dayName = "Monday";
    break;
  case 2:
    dayName = "Tuesday";
    break;
  case 3:
    dayName = "Wedensday";
    break;
  case 4:
    dayName = "Thursday";
    break;
  case 5:
    dayName = "Friday";
    break;
  case 6:
    dayName = "Saturday";
    break;

  case 7:
    dayName = "Sunday";
    break;

  default:
    dayName = "Invalid";
    break;
}

console.log("today is " + dayName);
