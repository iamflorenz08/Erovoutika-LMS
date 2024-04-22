"use client";
import { IoCheckmarkCircle } from "@react-icons/all-files/io5/IoCheckmarkCircle";
import { PiCaretDown } from "@react-icons/all-files/pi/PiCaretDown";
import { SetStateAction, useContext, useState } from "react";
import { HiOutlineTrophy } from "@react-icons/all-files/hi2/HiOutlineTrophy";
import { SelectTopicContext } from "@/contexts/SelectTopicContext";
import { IContent } from "@/types/course";

interface IProps {
  isClaimable?: boolean;
}
export default function ClaimCertficate({ isClaimable }: IProps) {
  const [showLessons, setShowLessons] = useState<boolean>(false);
  const [topicContent, setTopicContent]: [
    topicContent: IContent,
    setTopicContent: React.Dispatch<SetStateAction<IContent>>
  ] = useContext(SelectTopicContext);
  return (
    <div className="border border-gray border-opacity-20">
      <button
        onClick={() => setShowLessons(!showLessons)}
        className="flex justify-between items-center w-full p-4"
      >
        <span className={`font-medium ${showLessons && "text-primary"}`}>
          Claim your certificate
        </span>
        <PiCaretDown />
      </button>
      {showLessons && (
        <div className="px-4 pb-4">
          <div className="border border-gray border-opacity-20">
            <button
              onClick={() =>
                setTopicContent({
                  title: "Claim your certificate",
                  type: "certificate",
                  isCourseCompleted: isClaimable,
                })
              }
              className={`flex items-center justify-between p-4 w-full`}
            >
              <div className="flex gap-2">
                <span className="text-reward">
                  <HiOutlineTrophy size={24} />
                </span>
                <span>Claim your course certificate</span>
              </div>
              {isClaimable && (
                <span className="text-success">
                  <IoCheckmarkCircle size={24} />
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
