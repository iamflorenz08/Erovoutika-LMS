import { IQuiz } from "./quiz";

export interface IKey {
    [key: string]: string
}

export const FormatCourseFormat: IKey = {
    'self-paced': 'Self-Paced',
    'virtual': 'Live Virtual Learning',
    'hybrid': 'Hybrid Class',
}

export interface ISkill {
    dummyId?: string,
    name?: string,
    description?: string
}

export type ContentType = "text" | "media" | "assesment" | "code" | undefined;

export interface IContent {
    _id?: string,
    title?: string,
    type?: ContentType
    text?: string,
    media?: string,
    assesment?: IQuiz,
    coding?: string,
    course?: string,
    topic?: string,
}

export interface ITopic {
    _id?: string,
    title?: string,
    contents?: Array<IContent>,
    course?: string
}

export interface IPricing {
    price?: number | "",
    allowDiscount?: boolean,
    discountPrice?: number | "",
    pointsNeeded?: number | ""
}
export interface ICourse {
    _id?: string,
    format?: 'self-paced' | 'virtual' | 'hybrid',
    banner?: string,
    name?: string,
    status?: 'published' | 'unpublished'
    description?: string,
    language?: string,
    skills?: Array<ISkill>
    pricing?: IPricing
}