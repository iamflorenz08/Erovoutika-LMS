import { IPost } from "./postTypes";
import { IUser } from "./userTypes";

export interface ISaveThread {
    user: IUser | any,
    post: IPost | any
}