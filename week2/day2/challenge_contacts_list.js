const readline = require("readline");
const EventEmitter = require("events");
const fs = require("fs").promises;
const fs2 = require("fs");

const e = new EventEmitter();
const CONTACTS = [];
let filePath = "./contacts_all.json";

const check_name = (name) => {
  let regex = /[0-9]/g;
  return regex.test(name);
};
const check_phone = (phone) => {
  let phone_adjusted = "";
  if (phone[0] === "+") phone_adjusted = phone.split("").slice(1).join("");

  let regex = /[A-Za-z]/g;
  return regex.test(phone_adjusted);
};

async function check_name_phone(falsy_name, falsy_phone) {
  while (check_name(falsy_name) || check_phone(falsy_phone)) {
    console.log("Invalid Name or Phone Number");
    falsy_name = await ask("Enter Name :");
    falsy_phone = await ask("Enter Phone :");
  }
  return { name: falsy_name, phone: falsy_phone };
}
function viewAsync(event, ...args) {
  return new Promise((resolve, reject) => {
    e.once(event, async (...args) => {
      try {
        if (fs2.existsSync(filePath)) {
          let buffer = await fs.readFile(filePath);
          let data = JSON.parse(buffer.toString("utf8"));
          data.forEach((contact) => {
            console.log(`Name: ${contact.name}, Phone: ${contact.phone}`);
          });
        } else console.log("Contact List is Empty!");
        resolve();
      } catch (err) {
        reject(err);
      }
    });
    e.emit(event, ...args);
  });
}

async function addAsync(event, ...args) {
  return new Promise((resolve, reject) => {
    e.once(event, async (...args) => {
      let name = args[0];
      let phone = args[1];
      if (check_name(name) || check_phone(phone)) {
        await check_name_phone(name, phone);
      }
      CONTACTS.push({ name, phone });
      try {
        if (fs2.existsSync(filePath)) {
          let buffer = await fs.readFile(filePath);
          //   console.log("buffer: ");
          //   console.log(buffer);
          //   console.log("buffer.toString('utf8'): ");
          //   console.log(buffer.toString('utf8'));
          let data = JSON.parse(buffer.toString("utf8"));
          await fs.writeFile(filePath, JSON.stringify([...data, ...CONTACTS]));
        } else {
          await fs.writeFile(filePath, JSON.stringify(CONTACTS));
        }
        console.log("Contact added successfully.");
        resolve();
      } catch (error) {
        reject(error);
      }
    });
    e.emit(event, ...args);
  });
}
async function find_contactAsync(event, ...args) {
  return new Promise((resolve, reject) => {
    e.once(event, async (...args) => {
      try {
        if (fs2.existsSync(filePath)) {
          let buffer = await fs.readFile(filePath);
          let data = JSON.parse(buffer.toString("utf8"));
          let found = data.find((x) => x === args[0]);
          if (found) {
            console.log(`Contact<${found.name}>'s Phone:${found.phone} `);
          } else {
            console.log("Contact cannot be found");
          }
        } else {
          console.log("Contact List is empty");
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    });
    e.emit(event, ...args);
  });
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  let flag = true;
  while (flag) {
    const answer = await ask(
      "\n=============Menu=============:\nAdd Contact : add\nView All Contact: view\nSearch for a Contact: find <name>\nQuit: quit\n "
    );

    switch (answer.trim().split(" ")[0]) {
      case "add":
        const name = await ask("what is you name: ");
        const phone = await ask("what is you phone: ");
        await addAsync("add", name, phone);
        break;

      case "view":
        await viewAsync("view");
        break;

      case "find":
        await find_contactAsync(
          "find",
          answer.trim().split(" ").slice(1).join(" ")
        );
        break;
      case "quit":
        flag = false;
        break;

      default:
        console.log("\n==Invalid Command Please Try Again==\n");
        break;
    }
  }
}
main()
  .then(() => rl.close())
  .catch((err) => console.log(err.message));
