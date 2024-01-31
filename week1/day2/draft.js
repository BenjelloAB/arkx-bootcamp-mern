//! -- returning an object with arrow functions
// const func1 = () => ({ user: "Benjo", age: 20 });
// console.log(func1());

//! --testing the this

// function Person() {
//   this.age = 0;
//   console.log(this);
//   setTimeout(() => {
//     this.age++;
//     console.log(this);
//     console.log(this.age);
//   }, 1000);
// }

// let p = new Person();

//! -- destructuring

const obj = {
  shroom: "12",
  banana: "13",
  pepp: "123",
};
// const {s, f, k} = obj;
// console.log(s)
// console.log(f)
// console.log(k)

const { shroom, ...f } = obj;
console.log(shroom);
console.log(f);

const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
for (const id of users) {
  console.log(id.id);
}

const family = {
  parent: {
    child: 56,
  },
};

const {
  parent: { child },
} = family;
console.log(child);

const user = { id: 0, username: "jeff" };
function haveFun({ id, username }) {
  console.log(`hi ${username} with id ${id}`);
}

let a = 10;
let b = 20;
[a, b] = [b, a];

let re = /\w+\s/g;
let str = "feee fooo hooo ";
const [var1, var2, var3] = str.match(re);
console.log(`var1 = ${var1}`);
console.log(`var2 = ${var2}`);
console.log(`var3 = ${var3}`);

// function waitHere() {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve("Hey there"), 2000);
//   });
// }

// async function test() {
//   console.log("1");
//   let data = await waitHere();
//   console.log(data);
//   console.log("2");
// }

// test();

let promise1 = Promise.resolve(3);
let promise2 = 42;
let promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3])
  .then(values => console.log(values))
  .catch(error => console.log(error));