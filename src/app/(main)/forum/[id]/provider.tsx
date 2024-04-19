"use client";

import { IPost } from "@/types/postTypes";
import { useState } from "react";
import { PostContext } from "./postContext";

interface IProps {
  children: React.ReactNode;
  post?: IPost;
}

export default function Provider({ children, post }: IProps) {
  const [postState, setPostState] = useState<IPost | undefined>(post);
  return (
    <PostContext.Provider value={{ post: postState, setPost: setPostState }}>
      {children}
    </PostContext.Provider>
  );
}
