"use client";
import PostContent from "@/components/postContent";
import { SelectTopicContext } from "@/contexts/SelectTopicContext";
import { useContext } from "react";

export default function TopicContent() {
  const [topicContent, setTopicContent] = useContext(SelectTopicContext);
  return (
    <>
      <h1 className="font-semibold text-xl">{topicContent.title}</h1>
      {topicContent.type === "text" && (
        <div className="mt-4 flex flex-col gap-4 border border-gray border-opacity-20">
          {topicContent.text && (
            <PostContent
              key={topicContent._id}
              className="!p-0"
              content={topicContent.text}
            />
          )}
        </div>
      )}
    </>
  );
}
