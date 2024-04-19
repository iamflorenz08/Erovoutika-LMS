"use client";
import { PiCaretDown } from "@react-icons/all-files/pi/PiCaretDown";
import { IoDocumentTextOutline } from "@react-icons/all-files/io5/IoDocumentTextOutline";
import { SlPicture } from "@react-icons/all-files/sl/SlPicture";
import { LuPencilLine } from "@react-icons/all-files/lu/LuPencilLine";
import { RiCodeBoxLine } from "@react-icons/all-files/ri/RiCodeBoxLine";
import { useContext, useEffect, useState } from "react";
import { ICompletedContent, ITopic } from "@/types/course";
import { SelectTopicContext } from "@/contexts/SelectTopicContext";
import { IoCheckmarkCircleOutline } from "@react-icons/all-files/io5/IoCheckmarkCircleOutline";
import { IoCheckmarkCircle } from "@react-icons/all-files/io5/IoCheckmarkCircle";

const icons = {
  text: <IoDocumentTextOutline color={"#006AD4"} size={24} />,
  media: <SlPicture color={"#692BD4"} size={24} />,
  assesment: <LuPencilLine color={"#D46A00"} size={24} />,
  code: <RiCodeBoxLine color={"#00D46A"} size={24} />,
};

interface IProps {
  topic?: ITopic;
  courseId?: string;
  topicId?: string;
  completedContents?: Array<ICompletedContent>;
}

export default function Lessons({
  topic,
  courseId,
  topicId,
  completedContents,
}: IProps) {
  const [showLessons, setShowLessons] = useState<boolean>(false);
  const [topicContent, setTopicContent] = useContext(SelectTopicContext);
  return (
    <div className="border border-gray border-opacity-20">
      <button
        onClick={() => setShowLessons(!showLessons)}
        className="flex justify-between items-center w-full p-4"
      >
        <span className={`font-medium ${showLessons && "text-primary"}`}>
          {topic?.title}
        </span>
        <PiCaretDown />
      </button>
      {showLessons && (
        <div className="px-4 pb-4">
          <div className="border border-gray border-opacity-20">
            {topic?.contents?.map((content, index) => (
              <button
                onClick={() => setTopicContent(content)}
                key={content._id}
                className={`flex items-center justify-between p-4 w-full ${
                  (topic.contents?.length ?? 0) - 1 !== index &&
                  "border-b border-gray border-opacity-20"
                }`}
              >
                <div className="flex gap-2">
                  <span>{content.type && icons[content.type]}</span>
                  <span>{content.title}</span>
                </div>
                {completedContents?.some(
                  (completedContent) =>
                    completedContent.courseContent === content._id
                ) ? (
                  <span className="text-success">
                    <IoCheckmarkCircle size={24} />
                  </span>
                ) : (
                  <span className="text-gray">
                    <IoCheckmarkCircleOutline size={24} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
