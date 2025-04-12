import {CodingLanguage, CodingLanguages} from "../types/course";

const mappings: { [key: string]: CodingLanguage } = {
    java: {
        code: "java",
        text: "Java",
        compiler: "java2400"
    },
    kotlin: {
        code: "kotlin",
        text: "Kotlin",
        compiler: "kotlinc2100"
    },
    cpp: {
        code: "cpp",
        compiler: "g142",
        text: "C++"
    },
    python: {
        code: "python",
        compiler: "python310",
        text: "Python"
    },
    c: {
        code: "c",
        compiler: "g142",
        text: "C"
    }
}
export function useLanguage(language: CodingLanguages) {
    const lang = mappings[language];
    if (!lang) {
        throw new Error(`No such supported language as ${language}.`)
    }
    return lang;
}
