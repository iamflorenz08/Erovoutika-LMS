import { IUser } from "./userTypes";

export interface IPost {
    author?: IUser
    _id: string,
    title: string,
    contentMessage: string,
    tags: [string],
    rewards: number,
    createdAt: Date,
    commentCount: number
}