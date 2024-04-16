import { ICourse } from "./course";
import { IUser } from "./next-auth";

export interface ICart {
    _id?: string,
    user?: IUser,
    course?: ICourse
}