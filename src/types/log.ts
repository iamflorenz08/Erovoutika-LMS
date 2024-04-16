import { IUser } from "./userTypes";

export interface ILog {
    _id: string,
    user?: IUser,
    activity?: string,
    createdAt?: Date
}