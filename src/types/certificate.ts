import { ICourse } from "./course";
import { IUser } from "./userTypes";

export interface ICertificate {
    _id?: string;
    certificateId?: string;
    learner?: IUser;
    course?: ICourse;
}

