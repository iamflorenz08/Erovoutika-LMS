import { IPost } from "./postTypes";
import { IUser } from "./userTypes";

export interface IVote {
    _id: string,
    post: IPost | string,
    user: IUser | string,
    type: string
}