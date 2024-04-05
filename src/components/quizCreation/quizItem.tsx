import React, { useEffect, useState } from "react";
import CustomSelect, { ISelectOption } from "../customSelect";
import { RxCross2 } from "@react-icons/all-files/rx/RxCross2";
import { IQuizItem, IQuizOption } from "@/types/quiz";
import { GoTrash } from "@react-icons/all-files/go/GoTrash";

interface IProps {
  quizItem?: IQuizItem;
  onUpdate?: (quizItem: IQuizItem) => void;
  onRemove?: () => void;
}

const selectOptions: Array<ISelectOption> = [
  {
    text: "Multiple choice",
    value: "multiple_choice",
  },
  {
    text: "Check box",
    value: "check_box",
  },
];

export default function QuizItem({
  onRemove,
  quizItem: quizItemContent,
  onUpdate,
}: IProps) {
  const newQuizItemOptions = quizItemContent?.options?.map((option) => {
    return { ...option, dummyId: crypto.randomUUID() };
  });
  const [quizItem, setQuizItem] = useState<IQuizItem>(
    { ...quizItemContent, options: newQuizItemOptions } || {
      dummyId: crypto.randomUUID(),
      question: "",
      type: "multiple_choice",
      options: [],
    }
  );

  useEffect(() => {
    onUpdate &&
      onUpdate({
        ...quizItem,
        options: quizItem.options?.filter((item) => item.answer),
      });
  }, [quizItem]);

  const addOption = () => {
    const option: IQuizOption = {
      dummyId: crypto.randomUUID(),
      answer: "",
      isCorrect: false,
    };
    quizItem.options?.push(option);
    setQuizItem({ ...quizItem });
  };

  const removeOption = (dummyId: string | undefined) => {
    setQuizItem({
      ...quizItem,
      options: quizItem.options?.filter((option) => option.dummyId !== dummyId),
    });
  };

  const correctAnswerChange = (dummyId: string | undefined) => {
    setQuizItem({
      ...quizItem,
      options: quizItem.options?.map((option) => {
        option.isCorrect = option.dummyId === dummyId;
        return option;
      }),
    });
  };

  const handleAnswerTextChange = (option: IQuizOption, index: number) => {
    const newQuizOptions = [...(quizItem.options || [])];
    newQuizOptions[index] = option;
    setQuizItem({ ...quizItem, options: newQuizOptions });
  };

  return (
    <div className="bg-border p-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <input
          className="outline-none px-4 py-2 bg-border rounded w-3/4"
          type="text"
          value={quizItem.question}
          onChange={(e) =>
            setQuizItem({ ...quizItem, question: e.target.value })
          }
          placeholder="Question"
        />
        <CustomSelect
          className="w-2/4"
          onChange={(value) => {
            if (value === "multiple_choice" || value === "check_box") {
              setQuizItem({ ...quizItem, type: value });
            }
          }}
          options={selectOptions}
        />
      </div>
      <div className="flex flex-col gap-4">
        {quizItem.options?.map((option, index) => (
          <div key={option.dummyId} className="flex gap-4 items-center">
            <input
              type="radio"
              name={"question_" + quizItem.dummyId}
              defaultChecked={option.isCorrect}
              onChange={() => correctAnswerChange(option.dummyId)}
              className="radio radio-success"
            />
            <input
              type="text"
              className="outline-none border-b-2 border-transparent focus:border-black py-1 duration-100 w-full"
              value={option.answer}
              onChange={(e) => {
                option.answer = e.target.value;
                handleAnswerTextChange(option, index);
              }}
              placeholder={`Option ${index + 1}`}
            />
            <button onClick={() => removeOption(option.dummyId)}>
              <RxCross2 size={20} />
            </button>
          </div>
        ))}
      </div>
      <button onClick={addOption} className="w-fit">
        + Add option
      </button>

      <div className="h-0.5 w-full bg-border"></div>

      <div className="flex justify-end">
        <button
          onClick={() => onRemove && onRemove()}
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray hover:bg-opacity-20 rounded duration-300"
        >
          <GoTrash />
          Remove
        </button>
      </div>
    </div>
  );
}
