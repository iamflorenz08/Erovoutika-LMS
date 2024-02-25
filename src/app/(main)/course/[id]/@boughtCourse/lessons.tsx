"use client";
import { PiCaretDown } from "@react-icons/all-files/pi/PiCaretDown";
import { IoDocumentTextOutline } from "@react-icons/all-files/io5/IoDocumentTextOutline";
import { SlPicture } from "@react-icons/all-files/sl/SlPicture";
import { LuPencilLine } from "@react-icons/all-files/lu/LuPencilLine";
import { RiCodeBoxLine } from "@react-icons/all-files/ri/RiCodeBoxLine";
import { useState } from "react";

const icons = {
  text: <IoDocumentTextOutline color={"#006AD4"} size={24} />,
  media: <SlPicture color={"#692BD4"} size={24} />,
  assesment: <LuPencilLine color={"#D46A00"} size={24} />,
  code: <RiCodeBoxLine color={"#00D46A"} size={24} />,
};

export default function Lessons() {
  const [showLessons, setShowLessons] = useState<boolean>(false);
  return (
    <div className="border border-gray border-opacity-20">
      <button
        onClick={() => setShowLessons(!showLessons)}
        className="flex justify-between items-center w-full p-4"
      >
        <span className={`font-medium ${showLessons && "text-primary"}`}>
          Getting Started with Laravel
        </span>
        <PiCaretDown />
      </button>
      {showLessons && (
        <div className="px-4 pb-4">
          <div className="border border-gray border-opacity-20">
            <button className="flex gap-2 items-center p-4 w-full border-b border-gray border-opacity-20">
              <span>{icons.text}</span>
              <span>Untitled Text</span>
            </button>
            <button className="flex gap-2 items-center p-4 w-full border-b border-gray border-opacity-20">
              <span>{icons.media}</span>
              <span>Untitled Text</span>
            </button>
            <button className="flex gap-2 items-center p-4 w-full border-b border-gray border-opacity-20">
              <span>{icons.assesment}</span>
              <span>Untitled Text</span>
            </button>
            <button className="flex gap-2 items-center p-4 w-full ">
              <span>{icons.code}</span>
              <span>Untitled Text</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
