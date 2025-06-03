const compilers = {
    kotlin: "kotlinc2100",
    java: "java2400",
    python: "python310",
    c: "g142",
    cpp: "g142"
} as { [key: string]: string };
export const clangs = {
    format: (text: string) => {
        switch (text) {
            case "kotlin":
                return "Kotlin";
            case "c":
                return "C";
            case "cpp":
                return "C++";
            case "java":
                return "Java";
            case "python":
                return "Python";
            default:
                return text;
        }
    },
    getCompiler: (language: string) => {
        const compiler = compilers[language];
        if (!compiler) {
            throw new Error(`Compiler for language ${language} not found`);
        }
        return compiler;
    }
}
