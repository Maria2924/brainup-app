import {Entity} from "./commons";

export type Course = Entity & {
    description: string,
    subjects: Subject[]
}

export type Subject = Entity & {
    description: string,
    assessments: Assessment[],
    activities: Activity[],
    modules: Module[]
}

export type Assessment = Entity & {
    score: { received: number, max: number } | null
}

export type Activity = Entity & {
    status: "submitted" | "unanswered"
}

export type Module = Entity;
