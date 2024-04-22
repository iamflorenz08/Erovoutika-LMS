import { ICourse } from "./course";
import { IUser } from "./userTypes";

export interface ICourseReport {
    course?: ICourse
    studentCount?: number;
    completionRate?: number;
}

export interface IStudent {
    _id: string;
    user: IUser;
    course: ICourse;
    createdAt: string;
    progressPercentage: number;
}