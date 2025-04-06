export type RootStackParamList = {
    Course: {
        course: {
            id: string,
            name: string,
            description: string,
            subjects: {id: string, name: string}[]
        }
    }
    Subject: {
        subject: {
            id: string,
            name: string,
            description: string,
            assessments: {id: string, name: string, score: { received: number, max: number } | null }[],
            activities: {id: string, name: string, status: "submitted" | "unanswered"}[],
            modules: {id: string, name: string}[]
        }
    },
    Assessments: {
        subject: {
            id: string,
            name: string,
            assessments: { id: string, name: string, score: { received: number, max: number } | null  }[],
        }
    },
    Activities: {
        subject: {
            id: string,
            name: string,
            activities: { id: string, name: string, status: "submitted" | "unanswered" }[],
        }
    },
    Modules: {
        subject: {
            id: string,
            name: string,
            modules: {id: string, name: string}[]
        }
    }
};
