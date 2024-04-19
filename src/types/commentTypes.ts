import { IUser } from "./userTypes";
import { IVote } from "./voteTypes";

export interface IComment {
    _id: string,
    author?: IUser,
    parent: string,
    comment: string,
    updownVoteCount?: number,
    vote?: IVote,
    isAcceptedAnswer?: boolean,
}