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
            nmae: string,
            description: string,
            assessments: {id: string, name: string}[],
            activities: {id: string, name: string}[],
            modules: {id: string, name: string}[]
        }
    }
};
