import { IPost } from "@/types/postTypes";
import { Dispatch, SetStateAction, createContext } from "react";

interface IProps {
    post?: IPost,
    setPost?: Dispatch<SetStateAction<IPost | undefined>>
}
export const PostContext = createContext<IProps>({})