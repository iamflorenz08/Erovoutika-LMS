import { IUser } from "./userTypes";
import { IVote } from "./voteTypes";

export interface IPost {
    author?: IUser
    _id: string,
    title: string,
    contentMessage: string,
    tags: [string],
    rewards: number,
    createdAt: Date,
    commentCount: number,
    viewCount: number,
    updownVoteCount: number
    vote: IVote
}