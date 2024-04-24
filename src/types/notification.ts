import { IUser } from "./userTypes";

export interface INotification {
    _id?: string;
    srcUser?: IUser,
    title?: string;
    message?: string;
    link?: string;
    user?: IUser;
    type?: 'announcement' | 'individual';
    isRead?: boolean;
    isOpened?: boolean;
    createdAt?: string;
}