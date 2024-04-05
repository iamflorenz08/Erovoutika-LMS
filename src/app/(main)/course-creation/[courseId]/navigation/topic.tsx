"use client";
import { PiCaretDown } from "@react-icons/all-files/pi/PiCaretDown";
import { AnimatePresence, motion } from "framer-motion";
import { IoDocumentTextOutline } from "@react-icons/all-files/io5/IoDocumentTextOutline";
import { LuPencilLine } from "@react-icons/all-files/lu/LuPencilLine";
import { RiCodeBoxLine } from "@react-icons/all-files/ri/RiCodeBoxLine";
import { SlPicture } from "@react-icons/all-files/sl/SlPicture";
import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";
import { GoPencil } from "@react-icons/all-files/go/GoPencil";
import { GoCodeSquare } from "@react-icons/all-files/go/GoCodeSquare";
import { useEffect, useRef, useState } from "react";
import LessonModal from "./_modals/lessonModal";
import { ContentType, IContent, ICourse } from "@/types/course";
import AssesmentModal from "./_modals/assesmentModal";

const icons = {
  text: <IoDocumentTextOutline color={"#006AD4"} size={24} />,
  media: <SlPicture color={"#692BD4"} size={24} />,
  assesment: <LuPencilLine color={"#D46A00"} size={24} />,
  code: <RiCodeBoxLine color={"#00D46A"} size={24} />,
};

const contentOptions: {
  [key: string]: any;
  label: string;
  type: ContentType;
  icon: any;
}[] = [
  {
    label: "Lesson",
    type: "text",
    icon: <IoDocumentOutline size={24} />,
  },
  {
    label: "Assesments",
    type: "assesment",
    icon: <GoPencil size={24} />,
  },
  {
    label: "Code",
    type: "code",
    icon: <GoCodeSquare size={24} />,
  },
];

interface IProps {
  i: number;
  index: number;
  setIndex: (index: number) => void;
  topicId?: string;
  courseId?: string;
  courseContents?: Array<IContent>;
}

export default function Topic({
  i,
  index,
  setIndex,
  topicId,
  courseId,
  courseContents,
}: IProps) {
  const isOpen = index === i;
  const modal = useRef<any>(null);
  const [contents, setContents] = useState<Array<IContent>>(
    courseContents ?? []
  );
  const [content, setContent] = useState<IContent | undefined>(undefined);
  const [modalType, setModalType] = useState<ContentType>();

  const handleExit = () => {
    modal.current.close();
    setTimeout(() => setModalType(undefined), 200);
  };

  const contentChanged = (content: ICourse) => {
    if (!content._id) return;
    const index = contents.findIndex((v) => content._id === v._id);
    if (index === -1) {
      setContents([...contents, content]);
      return;
    }
    contents[index] = content;
    setContents([...contents]);
  };

  return (
    <motion.div className="bg-white bg-border rounded-lg">
      <button
        onClick={() => setIndex(i)}
        className="flex w-full p-4 justify-between items-center"
      >
        <span className="font-medium">Topic #1</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ bounce: 0 }}
        >
          <PiCaretDown size={24} />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="close"
            animate="open"
            variants={{
              open: { opacity: 1, y: 0 },
              close: { opacity: 0, y: -10 },
            }}
            className="px-4 pb-4"
          >
            <div
              className={`${
                contents.length > 0 && "border"
              } border-gray border-opacity-20`}
            >
              {contents.map((content, index) => (
                <button
                  onClick={() => {
                    setContent(content);
                    setModalType(content.type);
                    modal.current?.showModal();
                  }}
                  key={content._id}
                  className={`flex gap-2 items-center p-4 w-full  ${
                    contents.length - 1 !== index && "border-b"
                  } border-gray border-opacity-20`}
                >
                  <span>{content.type && icons[content.type]}</span>
                  <span>{content.title}</span>
                </button>
              ))}
            </div>

            <div className="dropdown dropdown-top mx-4 mt-4 z-[1000]">
              <div tabIndex={0} role="button">
                + Add content
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {contentOptions.map((option, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setModalType(option.type);
                        setContent(undefined);
                        modal.current?.showModal();
                      }}
                      className="flex gap-2 active:!bg-primary-light active:!text-white"
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <dialog className="modal" ref={modal}>
        {(modalType === "text" || modalType === "media") && (
          <LessonModal
            topicId={topicId}
            onExit={handleExit}
            onContentChange={contentChanged}
            courseId={courseId}
            content={content}
          />
        )}

        {modalType === "assesment" && (
          <AssesmentModal
            content={content}
            onQuizContentChange={contentChanged}
            courseId={courseId}
            topicId={topicId}
            onExit={handleExit}
          />
        )}
      </dialog>
    </motion.div>
  );
}
