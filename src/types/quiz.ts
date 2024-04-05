export type QuizItemType = "multiple_choice" | "check_box"

export interface IQuizOption {
    dummyId?: string,
    answer?: string,
    isCorrect?: boolean
}

export interface IQuizItem {
    _id?: string,
    dummyId?: string,
    question?: string,
    type?: QuizItemType
    options?: Array<IQuizOption>
}

export interface IQuiz {
    _id?: string,
    topic?: string,
    course?: string,
    quizItems?: Array<IQuizItem>
}