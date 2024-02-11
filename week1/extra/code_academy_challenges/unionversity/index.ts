import courses from "./courses";
import studyGroups from "./studyGroups";


type Course = {
    id: number,
    studyGroupId: number,
    title: string,
    keywords: string[],
    eventType: string
}


type StudyGroup = {
    id: number,
    courseId: number,
    title: string,
    keywords: string[],
    eventType: string
}

type EventType = "groups" | "courses";
type SearchEventsOptions = {
    query: string | number,
    eventType: EventType
}


type CouresStudy = Course | StudyGroup;
type CouresStudyArrs = Course[] | StudyGroup[]
function searchEvents({ query, eventType }: SearchEventsOptions): CouresStudyArrs {
    // let events: Course[] | StudyGroup[] = options.eventType === "courses" ? courses : studyGroups;
    let events: CouresStudyArrs = [];
    if (eventType === "courses" && courses)
        events = courses;
    else if (eventType === "groups" && studyGroups)
        events = studyGroups;

    let arr: CouresStudyArrs = events.filter(({ id, keywords }: CouresStudy) => {
        if (typeof query === "number")
            return id === query;
        else if (typeof query === "string")
            return keywords.includes(query);
    }) as CouresStudyArrs;

    return arr;
}

let enrolledEvents: (Course | StudyGroup)[] = []
function enroll(event: CouresStudyArrs) {
    enrolledEvents = [...enrolledEvents, ...event];
}

type DropOptions = {
    query: string | number,
    eventType: "group" | "course";
}
function drop_enrolled_event({ query, eventType }: DropOptions) {
    let index: number = -1;
    let i: number;
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
    console.log(typeof query === "number")
    console.log(enrolledEvents[0].id === query)
    console.log(enrolledEvents[0].eventType === eventType)
    console.log("index :", index);
    enrolledEvents.splice(index, 1);
}



function print_only_titles(): void {
    console.log("==Enrolled Events Titles==")
    enrolledEvents.forEach((x: CouresStudy) => {
        console.log(x.title);
    })
}
console.log(searchEvents({ query: "art", eventType: "courses" }));
enroll(searchEvents({ query: 1, eventType: "courses" }));
enroll(searchEvents({ query: 2, eventType: "courses" }));
console.log("==enrolledEvents==")
console.log(enrolledEvents)
drop_enrolled_event({ query: 1, eventType: "course" });
console.log("==enrolledEvents After==")
console.log(enrolledEvents)

print_only_titles()