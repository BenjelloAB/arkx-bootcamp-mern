"use strict";
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
var courses_1 = require("./courses");
var studyGroups_1 = require("./studyGroups");
function searchEvents(_a) {
    var query = _a.query, eventType = _a.eventType;
    // let events: Course[] | StudyGroup[] = options.eventType === "courses" ? courses : studyGroups;
    var events = [];
    if (eventType === "courses" && courses_1.default)
        events = courses_1.default;
    else if (eventType === "groups" && studyGroups_1.default)
        events = studyGroups_1.default;
    var arr = events.filter(function (_a) {
        var id = _a.id, keywords = _a.keywords;
        if (typeof query === "number")
            return id === query;
        else if (typeof query === "string")
            return keywords.includes(query);
    });
    return arr;
}
var enrolledEvents = [];
function enroll(event) {
    enrolledEvents = __spreadArray(__spreadArray([], enrolledEvents, true), event, true);
}
function drop_enrolled_event(_a) {
    var query = _a.query, eventType = _a.eventType;
    var index = -1;
    var i;
    for (i = 0; i < enrolledEvents.length; i++) {
        if (typeof query === "string"
            && enrolledEvents[i].keywords.includes(query)
            && enrolledEvents[i].eventType === eventType) {
            index = i;
            break;
        }
        if (typeof query === "number"
            && enrolledEvents[i].id === query
            && enrolledEvents[i].eventType === eventType) {
            index = i;
            break;
        }
    }
    console.log(typeof query === "number");
    console.log(enrolledEvents[0].id === query);
    console.log(enrolledEvents[0].eventType === eventType);
    console.log("index :", index);
    enrolledEvents.splice(index, 1);
}
function print_only_titles() {
    console.log("==Enrolled Events Titles==");
    enrolledEvents.forEach(function (x) {
        console.log(x.title);
    });
}
console.log(searchEvents({ query: "art", eventType: "courses" }));
enroll(searchEvents({ query: 1, eventType: "courses" }));
enroll(searchEvents({ query: 2, eventType: "courses" }));
console.log("==enrolledEvents==");
console.log(enrolledEvents);
drop_enrolled_event({ query: 1, eventType: "course" });
console.log("==enrolledEvents After==");
console.log(enrolledEvents);
print_only_titles();
