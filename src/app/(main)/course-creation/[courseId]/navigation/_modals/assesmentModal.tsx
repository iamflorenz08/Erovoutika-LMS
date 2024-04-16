import QuizItem from "@/components/quizCreation/quizItem";
import { IQuiz, IQuizItem } from "@/types/quiz";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { saveQuiz } from "./action";
import { IContent } from "@/types/course";
import { addContent } from "../action";

interface IProps {
  content?: IContent;
  courseId?: string;
  topicId?: string;
  onQuizContentChange?: (content: IContent) => void;
  onExit?: () => void;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-primary text-white font-medium text-xl flex items-center justify-center rounded w-[76px] h-[40px]"
    >
      {pending ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        "Save"
      )}
    </button>
  );
};

export default function AssesmentModal({
  content,
  courseId,
  topicId,
  onQuizContentChange,
  onExit,
}: IProps) {
  const quizItemsWithDummyId = content?.assesment?.quizItems?.map(
    (quizItem) => {
      return { ...quizItem, dummyId: crypto.randomUUID() };
    }
  );

  const [title, setTitle] = useState<string>(content?.title ?? "Untitled Quiz");
  const [quizItems, setQuizItems] = useState<Array<IQuizItem>>(
    quizItemsWithDummyId ?? []
  );

  const addQuizItem = () => {
    setQuizItems([
      ...quizItems,
      {
        dummyId: crypto.randomUUID(),
        question: "",
        type: "multiple_choice",
        options: [],
      },
    ]);
  };

  const updateQuizItem = (index: number, newQuizItem: IQuizItem) => {
    setQuizItems((quizItems) => {
      quizItems[index] = newQuizItem;
      return [...quizItems];
    });
  };

  const removeQuizItem = (dummyId: string | undefined) => {
    setQuizItems(quizItems.filter((quizItem) => quizItem.dummyId !== dummyId));
  };

  return (
    <div className="modal-box !max-w-[816px] w-full p-0 rounded-lg">
      <div className="flex justify-between p-4 border-b">
        <h1 className="font-bold text-[32px]">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </h1>
        <div className="flex gap-8 items-center">
          <button
            onClick={() => onExit && onExit()}
            className="font-medium text-xl"
          >
            Cancel
          </button>

          <form
            action={async () => {
              const quiz = await saveQuiz({
                _id: content?.assesment?._id,
                topic: topicId,
                course: courseId,
                quizItems: quizItems.filter(
                  (quizItem) => quizItem.question && quizItem.options
                ),
              });

              const newContent = await addContent({
                ...content,
                title,
                course: courseId,
                topic: topicId,
                type: "assesment",
                assesment: quiz,
              });

              onQuizContentChange && onQuizContentChange(newContent);
              onExit && onExit();
            }}
          >
            <SubmitButton />
          </form>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {quizItems.map((quizItem, index) => (
          <QuizItem
            key={quizItem.dummyId}
            quizItem={quizItem}
            onUpdate={(value) => updateQuizItem(index, value)}
            onRemove={() => removeQuizItem(quizItem.dummyId)}
          />
        ))}

        <button
          onClick={addQuizItem}
          className="p-4 hover:bg-gray hover:bg-opacity-20"
        >
          + Add question
        </button>
      </div>
    </div>
  );
}
