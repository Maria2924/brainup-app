import {Entity, WithId} from "./commons";

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
    questions: Question[],
    score: { received: number, max: number } | null
}

export type Activity = Entity & {
    text: string,
    status: "submitted" | "unanswered"
}

export type Module = Entity & {
    text: string,
    attachments: {name: string, source: string}[]
};
export type Question = WithId & {
    text: string,
    type: "code" | "single_choice",
    choices?: (WithId & { text: string })[],
    language?: CodingLanguage
}

export type Compilers = ("java2400" | "kotlinc2100" | "python310" | "g142");
export type CodingLanguages = ("java" | "kotlin" | "python" | "c" | "cpp");
export type CodingLanguagesName = ("Java" | "Kotlin" | "Python" | "C" | "C++");
export type CodingLanguage = {
    code: CodingLanguages,
    text: CodingLanguagesName,
    compiler: Compilers;
}
