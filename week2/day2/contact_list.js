"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var fs = require("fs");
var contact_file_path = "./contacts.json";
var CONTACT = [];
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var find_contact_1 = function (real_data, value) {
    var flag = 0;
    for (var i = 0; i < real_data.length; i++) {
        if (real_data[i].name === value) {
            var found = real_data[i];
            console.log("name : ".concat(found.name, ", phone: ").concat(found.phone));
            flag = 1;
            break;
        }
    }
    if (flag === 0)
        console.log("Not Found");
};
var check_name = function (name) {
    var regex = /[0-9]/g;
    return regex.test(name);
};
var check_phone = function (phone) {
    var phone_adjusted = "";
    if (phone[0] === "+")
        phone_adjusted = phone.split("").slice(1).join("");
    var regex = /[A-Za-z]/g;
    return regex.test(phone_adjusted);
};
function check_name_phone(falsy_name, falsy_phone) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(check_name(falsy_name) || check_phone(falsy_phone))) return [3 /*break*/, 3];
                    // if (!check_phone(falsy_phone))
                    //     console.log("Invalid phone Number");
                    // if (!check_name(falsy_name))
                    //     console.log("Invalid Name");
                    console.log("Invalid Name or Phone Number");
                    return [4 /*yield*/, ask("Enter Name :\n")];
                case 1:
                    falsy_name = _a.sent();
                    return [4 /*yield*/, ask("Enter Phone :\n")];
                case 2:
                    falsy_phone = _a.sent();
                    return [3 /*break*/, 0];
                case 3: return [2 /*return*/, { name: falsy_name, phone: falsy_phone }];
            }
        });
    });
}
var find_contact_2 = function (real_data, value) {
    var found = real_data.find(function (x) { return x.name === value; });
    if (!found)
        console.log("Contact Not Found");
    else
        console.log("name : ".concat(found.name, ", phone: ").concat(found.phone));
};
var delay = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
var ask = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                rl.question(query, function (answer) {
                    resolve(answer);
                });
            })];
    });
}); };
function add_contact(name, phone) {
    CONTACT.push({ name: name, phone: phone });
}
function read_contacts() {
    return new Promise(function (resolve, reject) {
        fs.readFile(contact_file_path, function (err, data) {
            if (err)
                reject(err.message);
            else
                resolve(data);
        });
    });
}
function writeFileAsync(data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(contact_file_path, JSON.stringify(data), { flag: "w" }, function (err) {
            if (err)
                reject(err.message);
            else
                resolve("contact added!");
        });
    });
}
function insert_contact() {
    return __awaiter(this, void 0, void 0, function () {
        var buffer, real_data, err_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fs.existsSync("./contacts.json")) return [3 /*break*/, 6];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, read_contacts()];
                case 2:
                    buffer = _a.sent();
                    real_data = JSON.parse((buffer.toString('utf8')));
                    return [4 /*yield*/, writeFileAsync(__spreadArray(__spreadArray([], real_data, true), CONTACT, true))];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    throw err_1;
                case 5: return [3 /*break*/, 9];
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, writeFileAsync(CONTACT)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    err_2 = _a.sent();
                    throw err_2;
                case 9: return [2 /*return*/];
            }
        });
    });
}
function keep_asking() {
    return __awaiter(this, void 0, void 0, function () {
        var answer, countLoop, _a, name_1, phone, valid_data, err_3, jdata, real_data, err_4, jdata, real_data, err_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    answer = "";
                    countLoop = 0;
                    _b.label = 1;
                case 1:
                    if (!(countLoop > 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, delay(1000)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [4 /*yield*/, ask("=============Menu=============:\nAdd Contact : add\nView All Contact: view\nSearch for a Contact: find <name>\nQuit: quit\n")];
                case 4:
                    answer = _b.sent();
                    _a = answer.split(" ")[0];
                    switch (_a) {
                        case "add": return [3 /*break*/, 5];
                        case "find": return [3 /*break*/, 15];
                        case "view": return [3 /*break*/, 19];
                        case "quit": return [3 /*break*/, 23];
                    }
                    return [3 /*break*/, 24];
                case 5:
                    name_1 = "";
                    phone = "";
                    return [4 /*yield*/, ask("Enter Name :\n")];
                case 6:
                    name_1 = _b.sent();
                    return [4 /*yield*/, ask("Enter Phone :\n")];
                case 7:
                    phone = _b.sent();
                    if (!(check_name(name_1) || check_phone(phone))) return [3 /*break*/, 9];
                    valid_data = { name: "", phone: "" };
                    return [4 /*yield*/, check_name_phone(name_1, phone)];
                case 8:
                    valid_data = _b.sent();
                    // let { name, phone } = valid_data;
                    add_contact(valid_data.name, valid_data.phone);
                    return [3 /*break*/, 10];
                case 9:
                    add_contact(name_1, phone);
                    _b.label = 10;
                case 10:
                    add_contact(name_1, phone);
                    _b.label = 11;
                case 11:
                    _b.trys.push([11, 13, , 14]);
                    return [4 /*yield*/, insert_contact()];
                case 12:
                    _b.sent();
                    console.log("name: ".concat(name_1, " , phone: ").concat(phone, " is Added"));
                    return [3 /*break*/, 14];
                case 13:
                    err_3 = _b.sent();
                    console.error(err_3);
                    return [3 /*break*/, 14];
                case 14:
                    ;
                    return [3 /*break*/, 25];
                case 15:
                    _b.trys.push([15, 17, , 18]);
                    return [4 /*yield*/, read_contacts()];
                case 16:
                    jdata = _b.sent();
                    real_data = JSON.parse(jdata.toString('utf8'));
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
                    return [3 /*break*/, 18];
                case 17:
                    err_4 = _b.sent();
                    console.log(err_4);
                    return [3 /*break*/, 18];
                case 18: return [3 /*break*/, 25];
                case 19:
                    _b.trys.push([19, 21, , 22]);
                    return [4 /*yield*/, read_contacts()];
                case 20:
                    jdata = _b.sent();
                    real_data = JSON.parse(jdata.toString('utf8'));
                    if (real_data.length === 0)
                        console.log("No Contacts are available");
                    else {
                        console.log("===Contacts===");
                        // for (let i = 0; i < real_data.length; i++) {
                        //     console.log(`name : ${real_data[i].name}, phone: ${real_data[i].phone}`)
                        // }
                        real_data.forEach(function (x) {
                            console.log("name : ".concat(x.name, ", phone: ").concat(x.phone));
                        });
                    }
                    return [3 /*break*/, 22];
                case 21:
                    err_5 = _b.sent();
                    console.log(err_5);
                    return [3 /*break*/, 22];
                case 22: return [3 /*break*/, 25];
                case 23: return [3 /*break*/, 25];
                case 24:
                    console.log("Not a Valid Command!");
                    _b.label = 25;
                case 25:
                    countLoop++;
                    _b.label = 26;
                case 26:
                    if (answer !== "quit") return [3 /*break*/, 1];
                    _b.label = 27;
                case 27:
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
rl.on("close", function () {
    console.log("Contacts Created Successfully");
});
keep_asking();
