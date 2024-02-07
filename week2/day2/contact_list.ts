import * as readline from 'readline';
import * as fs from "fs";

let contact_file_path = "./contacts.json";
type Contact = { name: string, phone: string }
const CONTACT: Contact[] = [];


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const find_contact_1 = (real_data: Contact[], value: string): void => {
    let flag: number = 0;
    for (let i = 0; i < real_data.length; i++) {
        if (real_data[i].name === value) {
            let found: Contact = real_data[i]
            console.log(`name : ${found.name}, phone: ${found.phone}`)
            flag = 1;
            break;
        }
    }
    if (flag === 0)
        console.log("Not Found");
}
const check_name = (name: string): boolean => {
    let regex = /[0-9]/g;
    return regex.test(name);
}
const check_phone = (phone: string): boolean => {
    let phone_adjusted: string = "";
    if (phone[0] === "+")
        phone_adjusted = phone.split("").slice(1).join("");

    let regex = /[A-Za-z]/g;
    return regex.test(phone_adjusted);
}


async function check_name_phone(falsy_name: string, falsy_phone: string): Promise<Contact> {

    while (check_name(falsy_name) || check_phone(falsy_phone)) {

        // if (!check_phone(falsy_phone))
        //     console.log("Invalid phone Number");
        // if (!check_name(falsy_name))
        //     console.log("Invalid Name");
        console.log("Invalid Name or Phone Number");
        falsy_name = await ask("Enter Name :\n");
        falsy_phone = await ask("Enter Phone :\n");
    }
    return { name: falsy_name, phone: falsy_phone }
}
const find_contact_2 = (real_data: Contact[], value: string): void => {
    let found = real_data.find(x => x.name === value);
    if (!found)
        console.log("Contact Not Found");
    else
        console.log(`name : ${found.name}, phone: ${found.phone}`)


}
const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
const ask = async (query: string): Promise<string> => {

    return new Promise((resolve) => {
        rl.question(query, (answer: string): void => {
            resolve(answer);
        })
    })

}

function add_contact(name: string, phone: string): void {
    CONTACT.push({ name, phone });

}
function read_contacts(): Promise<string | Buffer> {
    return new Promise((resolve, reject) => {
        fs.readFile(contact_file_path, (err, data) => {
            if (err) reject(err.message);
            else resolve(data)
        })
    });
}
function writeFileAsync(data: Contact[]): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.writeFile(contact_file_path, JSON.stringify(data), { flag: "w" }, (err) => {
            if (err) reject(err.message);
            else resolve("contact added!");
        })
    })

}
async function insert_contact() {
    if (fs.existsSync("./contacts.json")) {
        try {
            let buffer: Buffer | string = await read_contacts();
            let real_data: Contact[] = JSON.parse((buffer.toString('utf8')));
            await writeFileAsync([...real_data, ...CONTACT]);

        } catch (err) {
            throw err;
        }
    }
    else {
        try {
            await writeFileAsync(CONTACT);
        } catch (err) {
            throw err;
        }

    }
}
async function keep_asking() {
    let answer: string = "";
    let countLoop: number = 0
    do {
        //? Delay : 
        if (countLoop > 0)
            await delay(1000);
        answer = await ask("=============Menu=============:\nAdd Contact : add\nView All Contact: view\nSearch for a Contact: find <name>\nQuit: quit\n")
        switch (answer.split(" ")[0]) {
            case "add":
                let name: string = "";
                let phone: string = "";
                 
                phone = await ask("Enter Phone :\n")
                if (check_name(name) || check_phone(phone)) {
                    let valid_data: Contact = { name: "", phone: "" };
                    valid_data = await check_name_phone(name, phone);
                    // let { name, phone } = valid_data;
                    add_contact(valid_data.name, valid_data.phone);
                }
                else
                    add_contact(name, phone);
                try {
                    await insert_contact();
                    console.log(`name: ${name} , phone: ${phone} is Added`);
                } catch (err) {
                    console.error(err)
                };
                break;
            case "find":
                try {
                    let jdata: string | Buffer = await read_contacts();
                    let real_data: Contact[] = JSON.parse(jdata.toString('utf8'));
                    if (real_data.length === 0)
                        console.log("No Contacts are available");
                    else {
                        // let found: Contact = { name: "", phone: "" };
                        // let flag: number = 0;
                        // for (let i = 0; i < real_data.length; i++) {
                        //     if (real_data[i].name === answer.split(" ").slice(1).join(" ")) {
                        //         found = real_data[i]
                        //         console.log(`name : ${found.name}, phone: ${found.phone}`)
                        //         flag = 1;
                        //         break;
                        //     }
                        // }
                        // if (flag === 0)
                        //     console.log("Not Found");
                        find_contact_1(real_data, answer.split(" ").slice(1).join(" "));
                    }
                } catch (err) {
                    console.log(err);
                }
                break;
            case "view":
                try {
                    let jdata: string | Buffer = await read_contacts();
                    let real_data: Contact[] = JSON.parse(jdata.toString('utf8'));
                    if (real_data.length === 0)
                        console.log("No Contacts are available");
                    else {
                        console.log("===Contacts===");
                        // for (let i = 0; i < real_data.length; i++) {
                        //     console.log(`name : ${real_data[i].name}, phone: ${real_data[i].phone}`)
                        // }
                        real_data.forEach(x => {
                            console.log(`name : ${x.name}, phone: ${x.phone}`)
                        })
                    }
                } catch (err) {
                    console.log(err);
                }
                break;
            case "quit":
                break;
            default:
                console.log("Not a Valid Command!");
        }
        countLoop++;
    } while (answer !== "quit")
    rl.close();

}

rl.on("close", () => {
    console.log("Contacts Created Successfully");
});

keep_asking()