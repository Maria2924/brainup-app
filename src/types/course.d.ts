export type Course = {
    id: number;
    name: string;
    description: string;
    category_id: number | null;
    course_level: "beginner" | "intermediate" | "advanced";
    duration: number
    status: "draft" | "published" | "archived";
    created_at: string;
    updated_at: string;
}

export type EnrolledCourse = Course & {
    currently_enrolled: boolean;
}

export type Lesson = {
    id: number;
    title: string;
    video_url: string;
    content: string;
    order: number;
    created_at: string;
    updated_at: string;
}

export type Activity = {
    id: number;
    lesson_id: number;
    question: string;
    options: { [key: string]: string } | null;
    answer: string;
    type: "single_choice" | "multiple_choice" | "long_answer" | "true_false" | "short_answer" | "coding";
    user_answered: boolean;
    user_answer: {
        user_answer: string | null;
        is_correct: boolean;
    };
}
