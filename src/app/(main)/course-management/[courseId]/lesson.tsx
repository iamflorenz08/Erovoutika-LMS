"use client";
import { ITopic } from "@/types/course";
import { IoDocumentTextOutline } from "@react-icons/all-files/io5/IoDocumentTextOutline";
import { LuPencilLine } from "@react-icons/all-files/lu/LuPencilLine";
import { PiCaretDown } from "@react-icons/all-files/pi/PiCaretDown";
import { RiCodeBoxLine } from "@react-icons/all-files/ri/RiCodeBoxLine";
import { SlPicture } from "@react-icons/all-files/sl/SlPicture";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

interface IProps {
  topic?: ITopic;
}

const icons = {
  text: <IoDocumentTextOutline color={"#006AD4"} size={24} />,
  media: <SlPicture color={"#692BD4"} size={24} />,
  assesment: <LuPencilLine color={"#D46A00"} size={24} />,
  code: <RiCodeBoxLine color={"#00D46A"} size={24} />,
};

export default function Lesson({ topic }: IProps) {
  const { courseId } = useParams();
  const [showLessons, setShowLessons] = useState<boolean>(false);

  return (
    <div className="border border-gray border-opacity-20">
      <button
        onClick={() => setShowLessons(!showLessons)}
        className="flex justify-between items-center w-full p-4"
      >
        <span className={`font-medium`}>{topic?.title}</span>
        <PiCaretDown />
      </button>
      {showLessons && (
        <div className="px-4 pb-4">
          <div className="border border-gray border-opacity-20">
            {topic?.contents?.map((content, index) => (
              <Link
                href={`/course-management/${courseId}/${content._id}`}
                key={content._id}
                className={`flex items-center justify-between p-4 w-full ${
                  (topic.contents?.length ?? 0) - 1 !== index &&
                  "border-b border-gray border-opacity-20"
                }`}
              >
                <div className="flex gap-2">
                  <span>
                    {content.type &&
                      content.type !== "certificate" &&
                      icons[content.type]}
                  </span>
                  <span>{content.title}</span>
                </div>

                <button
                  onClick={() => console.log(content._id)}
                  className="text-primary-light"
                >
                  Set date
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
