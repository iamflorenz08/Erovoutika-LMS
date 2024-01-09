import { IUser } from "./userTypes";

export interface IMessage {
    chatId: string | any
    sender: IUser | any,
    content: string
}

export interface IChatRoom {
    _id: string,
    participants: Array<IUser | string>,
    lastMessage: string | any,
    updatedAt: Date
}