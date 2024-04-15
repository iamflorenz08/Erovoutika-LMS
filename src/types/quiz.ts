import { IUser } from "./next-auth"

export type QuizItemType = "multiple_choice" | "check_box"
export type IAnswerQuizStatus = 'pending' | 'submitted'

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

export interface IAnswer {
    _id?: string
    quizItem?: IQuizItem,
    answer?: string,
    isCorrect?: boolean,
    hasNextPage?: boolean,
    hasPrevPage?: boolean,
}
export interface IAnswerQuiz {
    _id?: string,
    user?: IUser,
    quiz?: IQuiz,
    answers?: [IAnswer],
    status?: IAnswerQuizStatus,
    dateSubmitted?: Date,
}