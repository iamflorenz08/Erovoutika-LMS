import { ICourse } from "./course";
import { IUser } from "./userTypes";

export interface ITransaction {
    _id?: string;
    checkoutSessionId?: string;
    user?: IUser;
    items?: Array<ICourse>;
    totalAmount?: number;
    createdAt?: Date;
}
