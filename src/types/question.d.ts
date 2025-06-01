export type Question = {
    lesson_id: string,
    question: string,
    options: {
        [`option${number}`]: string
    }
}
