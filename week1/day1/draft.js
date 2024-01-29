const { resolve } = require("path");
const readline = require("readline");
const fs = require("fs")
const ll = require("./module_test")
// console.log("a");
// console.log("b");
// console.log("c");

// console.log("======Async Code======");
// console.log("a");
// setTimeout(() => {
//   console.log("b");
// }, 2000);
// console.log("c");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question, cb) {
  rl.question(question, (answer) => {
    cb(answer);
  });
}
module.exports = { askQuestion };
// askQuestion("What's your name? ", function (name) {
//     console.log(`Hello, ${name}!`);
//     rl.close(); // Close the Readline interface
//   });

// let p_name, p_age, p_color;
//! -- the way we normal it do it when capturing mutliple
// askQuestion("Enter name here: ", function (name) {
//   console.log(`Hello, ${name}!`);
//   p_name = name;
//   askQuestion("Enter age here: ", function (age) {
//     console.log(`You are ${age} years old!`);
//     p_age = age;
//     askQuestion("Enter your favorite color: ", function (color) {
//       console.log(`Your favorite color is ${color}!`);
//       p_color = color;
//       console.log(`name = ${p_name} , age = ${p_age}, color = ${p_color}`);
//       rl.close();
//     });
//   });
// });

//! --Promises

// const mypromise = new Promise(function (resolve, reject) {
//   const alright = 0;
//   setTimeout(() => {
//     if (alright) resolve("Everything iss  good ! ");
//     else reject("Nope not good");
//   }, 2000);
// });
// console.log(mypromise);
// mypromise
// .then((value) => {
//     console.log(value);
//     console.log(mypromise);
//     console.log(typeof mypromise);
// })
// .catch((err) => {
//     console.log(err);
//     console.log(mypromise);
//     console.log(typeof mypromise);
// })
// .finally(() => {
// console.log("Done!");
// });

//! -- New solution to ask a question with :

// function askQuestion2(question) {
//   return new Promise((resolve, reject) => {
//     rl.question(question, (answer) => {
//       resolve(answer);
//     });
//   });
// }

// let p2_name, p2_age, p2_color;
// askQuestion2("Enter your name : ")
//   .then((name) => {
//     p2_name = name;
//     return askQuestion2("Enter you age: ");
//   })
//   .then((age) => {
//     p2_age = age;
//     return askQuestion2("Enter your favorite color : ");
//   })
//   .then((color) => {
//     p2_color = color;
//   })
//   .catch((err) => {
//     console.log(`error : ${err}`);
//   })
//   .finally(() => {
//     console.log(`name = ${p2_name} , age = ${p2_age}, color = ${p2_color}`);
//     rl.close();
//   })

//! ---modules :
// console.log(module);
rl.close();



//!-- Errors :
function divide(a,b)
{
  if(b === 0)
  {
    throw new Error("Div by 0");
  }
  return a / b;
}



try{
  console.log(divide(1,0))
}
catch(err)
{
  console.log("msg = ", err.message)
  console.log("with Error = ", err)
}
finally{
  console.log("END");
}