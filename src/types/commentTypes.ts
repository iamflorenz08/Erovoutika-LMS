import { IUser } from "./userTypes";

export interface IComment {
    _id: string,
    author?: IUser,
    parent: string,
    comment: string
}