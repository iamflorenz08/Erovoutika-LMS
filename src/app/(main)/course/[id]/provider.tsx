"use client";

import { SelectTopicContext } from "@/contexts/SelectTopicContext";
import { IContent, ITopic } from "@/types/course";
import { useState } from "react";

interface IProps {
  children: React.ReactNode;
}
export default function Provider({ children }: IProps) {
  const [topicContent, setTopicContent] = useState<IContent>({});
  return (
    <SelectTopicContext.Provider value={[topicContent, setTopicContent]}>
      {children}
    </SelectTopicContext.Provider>
  );
}
