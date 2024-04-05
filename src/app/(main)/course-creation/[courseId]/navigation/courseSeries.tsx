"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiCaretDown } from "@react-icons/all-files/pi/PiCaretDown";
import Topic from "./topic";
import { ICourse, ITopic } from "@/types/course";
import { addTopic } from "./action";
import { useFormStatus } from "react-dom";
import useUpdateCourseDetails from "@/hooks/useUpdateCourseDetails";

interface IProps {
  courseId: string;
  courseTopics?: Array<ITopic>;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="m-4 text-left w-fit flex items-center"
    >
      {pending ? (
        <span className="loading loading-spinner text-primary-light"></span>
      ) : (
        "+ Add series"
      )}
    </button>
  );
};

export default function CourseSeries({ courseId, courseTopics }: IProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [accordionIndex, setAccordionIndex] = useState<number>(0);
  const [topics, setTopics] = useState<Array<ITopic>>(courseTopics ?? []);

  return (
    <motion.div className="bg-white bg-border rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full p-4 justify-between items-center bg-white rounded-lg relative"
      >
        <span className="font-medium text-xl">Course Series</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ bounce: 0 }}
        >
          <PiCaretDown size={24} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial="close"
            animate="open"
            exit="close"
            variants={{
              open: { opacity: 1, y: 0 },
              close: { opacity: 0, y: -20 },
            }}
            className="px-4 pb-4 flex flex-col gap-4"
          >
            {topics?.map((topic, k) => (
              <Topic
                key={topic._id}
                i={k}
                index={accordionIndex}
                setIndex={(index) => setAccordionIndex(index)}
                topicId={topic._id}
                courseId={courseId}
                courseContents={topic.contents}
              />
            ))}

            <form
              action={async () => {
                const topic: ITopic = await addTopic(
                  courseId,
                  `Topic #${(topics?.length || 0) + 1}`
                );
                setTopics([...(topics || []), topic]);
              }}
            >
              <SubmitButton />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
