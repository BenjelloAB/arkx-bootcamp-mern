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
function searchEvents({query, eventType}: SearchEventsOptions): CouresStudyArrs {
    // let events: Course[] | StudyGroup[] = options.eventType === "courses" ? courses : studyGroups;
    let events: CouresStudyArrs = [];
    if (eventType === "courses" && courses)
        events = courses;
    else if (eventType === "groups" && studyGroups)
        events = studyGroups;

    let arr: CouresStudyArrs= events.filter(({id, keywords}: CouresStudy) => {
        if(typeof query === "number")
            return id === query;
        else if(typeof query === "string")
            return keywords.includes(query);
    }) as CouresStudyArrs;

    return arr;
}

let enrolledEvents: (Course | StudyGroup)[] = []
function enroll(event: CouresStudy)
{
    enrolledEvents = [...enrolledEvents, event];
}

console.log(searchEvents({query: "art", eventType: "courses"}));
enroll(searchEvents({query: 1, eventType: "courses"})[0]);
enroll(searchEvents({query: 2, eventType: "courses"})[0]);
console.log("==enrolledEvents==")
console.log(enrolledEvents)