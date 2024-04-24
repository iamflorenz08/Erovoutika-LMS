import { IQuiz } from "./quiz";
import { IUser } from "./userTypes";

export interface IKey {
    [key: string]: string
}

export const FormatCourseFormat: IKey = {
    'self-paced': 'Self-Paced',
    'virtual': 'Live Virtual Learning',
    'hybrid': 'Hybrid Class',
}

export interface IFile {
    fileUrl?: string;
    fileType?: string;
    fileName?: string;
}

export interface ISkill {
    dummyId?: string,
    name?: string,
    description?: string
}

export type ContentType = "text" | "media" | "assesment" | "code" | "certificate" | undefined;

export interface IContent {
    _id?: string,
    title?: string,
    type?: ContentType
    text?: string,
    media?: IFile | null,
    assesment?: IQuiz,
    coding?: string,
    course?: string,
    topic?: string,
    isCourseCompleted?: boolean
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
    pricing?: IPricing,
    instructor?: IUser
}

export interface ICompletedContent {
    _id?: string
    learner?: string
    courseContent?: string
    course?: string
    createdAt?: Date
    updatedAt?: Date
}