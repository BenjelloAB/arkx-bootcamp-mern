const EventEmitter = require("events");
const readline = require("readline");
const {
  readFileAsync,
  writeFileAsync,
  generateDateNow,
  existsAsync,
} = require("./helpers");

let ACCNUMBER;
const PATH_META_DATA = "./acc_number.txt";
const PATH_USERS = "./users.json";
const MAX_TRIES = 4;
const PATH_SECRET = "./adminPassword.txt";
let PASS = "";
const USERS = [];

const e = new EventEmitter();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function findAndDelete(acc_ID) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await readFileAsync(PATH_USERS);
      let arr_users = JSON.parse(data);
      let i_del;
      let user = arr_users.find((x, index) => {
        if (x.accountID === acc_ID) {
          i_del = index;
          return true;
        }
      });
      if (user) {
        arr_users.splice(i_del, 1);
        await writeFileAsync(PATH_USERS, JSON.stringify(arr_users));
        resolve(user);
      } else {
        resolve(user);
      }
    } catch (err) {
      reject(err);
    }
  });
}
async function accNumAccum(path) {
  try {
    let str_data = await readFileAsync(path);
    console.log(str_data);

    ACCNUMBER = Number(str_data) + 1;
    console.log(ACCNUMBER);
    console.log(typeof ACCNUMBER);
    await writeFileAsync(path, ACCNUMBER.toString());
    return ACCNUMBER;
  } catch (err) {
    console.log("accNumAccum Level: ", err.message);
    throw err;
  }
}
function checkIfNotNum(num) {
  let regex = /[A-Za-z]/g;
  if (regex.test(num)) {
    console.log("Only digits please!");
  }
  return regex.test(num);
}
function checkIfNotString(str) {
  let regex = /\d/g;
  if (regex.test(str)) {
    console.log("Only letters please!");
  }
  return regex.test(str);
}

async function repeatInput(query, check) {
  let answer = "";
  do {
    answer = await ask(query);
  } while (check(answer));
  return answer;
}

// async function readFileAsync(path) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, { encoding: "utf8" }, (err, data) => {
//       if (err) reject(err);
//       else resolve(data);
//     });
//   });
// }
// async function writeFileAsync(path, data) {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(path, data, (err) => {
//       if (err) reject(err);
//       else resolve();
//     });
//   });
// }

function fillPass() {
  return new Promise(async (resolve, reject) => {
    try {
      PASS = await readFileAsync(PATH_SECRET);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
function ask(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}
// function existsAsync(path) {
//   return new Promise((resolve) => {
//     let found = fs.existsSync(path);
//     resolve(found);
//   });
// }
async function adminRepeatPassword() {
  for (let i = 0; i < MAX_TRIES; i++) {
    let ans = await ask("Invalid Password Please Re-Enter Admin Password:");
    if (ans === PASS) return true;
  }
  return false;
}
// async function userRepeatPassword(actualPin) {
//   for (let i = 0; i < MAX_TRIES; i++) {
//     let pin = await ask("Wrong Pin please Re-enter your pin code:");
//     if (pin === actualPin) {
//       return true;
//     }
//   }
//   return false;
// }
// function userRepeatPassword(actualPin) {
//   return new Promise(async (resolve, reject) => {
//     for (let i = 0; i < MAX_TRIES; i++) {
//       let pin = await ask("Wrong Pin please Re-enter your pin code:");
//       if (pin === actualPin) {
//         return resolve(true);
//       }
//     }
//     return resolve(false);
//   });
// }

function createUser(name, pin, balance) {
  return new Promise((resolve, reject) => {
    e.on("create", async (...args) => {
      let acc = await accNumAccum(PATH_META_DATA);
      //   console.log(acc);
      console.log(args);
      let accid_str = `ACC${acc}`;
      //   console.log(accid_str);
      let user = {
        accountID: accid_str,
        name: args[0],
        pin: parseInt(args[1]),
        balance: parseFloat(args[2]),
        transactions: [],
      };
      //   USERS.push(user);
      try {
        let found = await existsAsync("users.json");
        if (found) {
          let oldData = await readFileAsync("users.json");
          let oldData_arr = JSON.parse(oldData);

          //   console.log("==================USERS :==============");
          //   console.log(USERS);

          console.log("==============oldData:================");
          console.log(oldData_arr);

          //   let data = [...oldData_arr, ...USERS];
          oldData_arr.push(user);

          //   console.log("==============data:================");
          //   console.log(data);
          await writeFileAsync("users.json", JSON.stringify(oldData_arr));
          //   USERS.splice(0,USERS.length);
          resolve();
          return;
        } else {
          await writeFileAsync("users.json", JSON.stringify([user]));
          resolve();
          return;
        }
      } catch (err) {
        reject(err);
      }
    });
    e.emit("create", name, pin, balance);
  });
}

function checkInSys(acc_ID, pin) {
  return new Promise(async (resolve) => {
    let found = await existsAsync(PATH_USERS);
    if (!found) {
      console.log("No Users in the System come back later! :(");
      resolve(false);
      return;
    }
    let data = await readFileAsync(PATH_USERS);
    let arr_data = JSON.parse(data);
    console.log("typeof arr_data: ");
    console.log(typeof arr_data);
    let user = arr_data.find((x) => x.accountID === acc_ID);
    console.log(typeof user);

    pin = Number(pin);
    if (user && user.pin === pin) {
      console.log("typeof user.pin");
      console.log(user.pin ? typeof user.pin : "");
      resolve({ found: true, userData: user });
    } else resolve({ found: false, userData: user });
  });
}

// function checkInSys(acc_ID, pin) {
//   return new Promise(async (resolve) => {
//     let found = await existsAsync(PATH_USERS);
//     if (!found) {
//       console.log("No Users in the System come back later! :(");
//       resolve(false);
//       return;
//     }
//     let data = await readFileAsync(PATH_USERS);
//     let arr_data = JSON.parse(data);
//     let user = arr_data.find((x) => x.accountID === acc_ID);
//     console.log(user);
//     if (user) {
//       console.log(user.pin);
//       console.log(pin);
//       if (user.pin === pin) {
//         resolve(user);
//       } else {
//         let t = await userRepeatPassword(user.pin);
//         if (t) resolve(user);
//         else resolve(undefined);
//       }
//     } else {
//       resolve(undefined);
//     }
//   });
// }
// function generateDateNow() {
//   const date = new Date();

//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0, so add 1
//   const day = String(date.getDate()).padStart(2, "0");

//   const formattedDate = `${year}-${month}-${day}`;
//   return formattedDate; // Output: yyyy-mm-dd
// }
async function modifyUsersData(
  acc_ID,
  propertyName,
  newValue,
  tranType,
  tranAmount
) {
  try {
    let dateNow = generateDateNow();
    let transactionOp = { type: tranType, amount: tranAmount, date: dateNow };
    let data = await readFileAsync(PATH_USERS);
    let arr_data = JSON.parse(data);
    let i_modify = -1;
    let u = arr_data.find((x, index) => {
      if (x.accountID === acc_ID) {
        i_modify = index;
        return true;
      }
    });
    if (i_modify !== -1) {
      arr_data[i_modify][`${propertyName}`] = newValue;
      arr_data[i_modify]["transactions"].push(transactionOp);
      await writeFileAsync(PATH_USERS, JSON.stringify(arr_data));
    }
  } catch (err) {
    throw err;
  }
}

async function getCurrentInfo() {
  let userData = await readFileAsync(PATH_USERS);
  let userData_array = JSON.parse(userData);
  return userData_array;
}
async function atmOps(user) {
  try {
    console.log(`Welcome ${user.name}`);
    let ans = "";
    do {
      ans = await ask(
        "\n===ATM OPERATIONS===\nCheck Balance: balance\nDeposite Money: deposite <amount>\nWithdrawing Money: wdraw <amount>\nView Transaction History: history\nQuit ATM Operations: quit\n"
      );
      switch (ans.split(" ")[0]) {
        case "balance":
          let arr = await getCurrentInfo();
          let found_user = arr.find((x) => x.accountID === user.accountID);
          console.log("Balance: ", found_user.balance);

          break;
        case "deposite":
          let amount = ans.split(" ").slice(1).join(" ");
          if (checkIfNotNum(amount)) {
            console.log("Not a valid amount (only digits) Try Again!");
            break;
          }

          console.log(typeof user.balance);
          let newValue = Number(user.balance) + Number(amount);
          await modifyUsersData(
            user.accountID,
            "balance",

            newValue,
            "deposit",
            amount
          );
          break;
        case "history":
          console.log("=========typeof user.transatctions=========");
          console.log(typeof user.transactions);
          let arr2 = await getCurrentInfo();
          let found_user2 = arr2.find((x) => x.accountID === user.accountID);
          found_user2.transactions.forEach((x) => {
            console.log(
              `type: ${x.type} || amount: ${x.amount} || date: ${x.date}`
            );
          });
          break;
        case "wdraw":
          let amountD = ans.split(" ").slice(1).join(" ");
          if (checkIfNotNum(amountD)) {
            console.log("Not a valid amount (only digits) Try Again!");
            break;
          }

          console.log("typeof user.balance");
          console.log(typeof user.balance);
          let newValueD = Number(user.balance) - Number(amountD);
          console.log("typeof newValueD");
          console.log(typeof newValueD);
          await modifyUsersData(
            user.accountID,
            "balance",
            newValueD,
            "withdrad",
            amountD
          );
          break;
        default:
          console.log("Not a Valid command ");
          break;
      }
    } while (ans !== "quit");
  } catch (err) {
    throw err;
  }
}
async function simpleCli() {
  let flag = true,
    flag3 = true;
  while (flag) {
    try {
      let answer = await ask(
        "\n=====Menu:======\nAdministrator:admin\nUser:user\nQuit App: quit\n==========\n\n"
      );
      if (answer === "admin") {
        await fillPass();
        let admin_pin = await ask("Enter Admin Password : ");
        if (admin_pin !== PASS) {
          let f = await adminRepeatPassword();
          if (!f) {
            console.log("you surpassed the trying limit , going back....");
            continue;
          }
        }
        console.log("...Connected To Admin Successfully");
        let sub_ans = "";
        do {
          sub_ans = await ask(
            "\n======Admin Space=======\nCreate User: create\nDelete User: delete <account_id>\nQuit Admin Space\n"
          );

          switch (sub_ans.split(" ")[0]) {
            case "create":
              let name = await repeatInput(
                "Enter User Name:",
                checkIfNotString
              );
              let pin = await repeatInput(
                "Enter User's initial pin:",
                checkIfNotNum
              );
              let balance = await repeatInput(
                "Enter User's current Balance",
                checkIfNotNum
              );
              await createUser(name, pin, balance);
              break;
            //   case "quit":
            //     flag = false;
            //     break;
            case "delete":
              let account_id = sub_ans.split(" ").slice(1).join(" ");
              let user = await findAndDelete(account_id);
              if (user) console.log("User deleted Successfully");
              else console.log("User Not Found");
              break;
            default:
              console.log("Invalid Command");
          }
        } while (sub_ans !== "quit");
      } else if (answer === "user") {
        flag3 = true;
        let sub_ans = "";
        do {
          sub_ans = await ask(
            "\n====User Space=====\nLogin to your account:login\nQuit User Space:quit\n"
          );
          switch (sub_ans) {
            case "login":
              let acc_ID = await ask("Enter your account ID:");
              let pin = await repeatInput("Enter your pin:", checkIfNotNum);
              let { found, userData } = await checkInSys(acc_ID, pin);
              if (!found) {
                console.log("Unvalid pin or accountID\nTRY AGAIN....");
                // flag3 = false;
                break;
              } else {
                await atmOps(userData);
              }
            default:
              console.log("Not a Valid Command Try again");
              break;
          }
        } while (sub_ans !== "quit" && flag3);
      } else if (answer === "quit") {
        flag = false;
      } else {
        console.log("Invalid Command");
      }
    } catch (err) {
      throw err;
    }
  }
}

simpleCli()
  .then(() => {
    console.log("good");
    rl.close();
  })
  .catch((err) => console.log(err));
