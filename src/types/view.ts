import { ICourse } from "./course";
import { IUser } from "./userTypes";

export interface ICourseVisited {
    _id?: string,
    user?: IUser,
    course?: ICourse,
    createdAt?: Date,
    updatedAt?: Date
}