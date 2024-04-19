"use client";
import { useContext, useState } from "react";
import { submitAnswer, submitAssesment } from "./action";
import { IAnswer } from "@/types/quiz";
import PreviousNextButton from "./previousNextButton";
import DialogYesNo from "@/components/dialogYesNo";
import { useParams, useRouter } from "next/navigation";
import { finishReadingContent } from "../../../action";
import topicContent from "../../../topicContent";
import { SelectTopicContext } from "@/contexts/SelectTopicContext";

interface IProps {
  courseId?: string;
  answerQuestionId?: string;
  questionIndex?: string;
  question?: IAnswer;
}
export default function AnswerForm({
  answerQuestionId,
  courseId,
  questionIndex,
  question,
}: IProps) {
  const router = useRouter();
  const params: { id: string; answerId: string } = useParams();
  const [submitModal, setSubmitModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [topicContent, setTopicContent] = useContext(SelectTopicContext);

  const submit = async () => {
    setIsSubmitting(true);
    const [isSubmitted] = await Promise.all([
      submitAssesment(params.answerId),
      finishReadingContent(params.id, topicContent._id),
    ]);
    if (!isSubmitted) {
      setIsSubmitting(false);
      return;
    }
    router.replace(`/course/${params.id}`);
    setIsSubmitting(false);
  };

  return (
    <>
      <form
        action={async (formData) => {
          const isAnswerSubmitted = await submitAnswer(
            formData,
            answerQuestionId,
            questionIndex
          );
          if (!isAnswerSubmitted) return;
          if (question?.hasNextPage) {
            router.push(
              `/course/${courseId}/quiz/${answerQuestionId}/${
                Number(questionIndex) + 1
              }`
            );

            return;
          }
          setSubmitModal(true);
        }}
        className="w-full bg-white bg-border p-4 rounded-lg flex flex-col gap-6"
      >
        <div className="flex gap-6">
          <div className="p-4 flex flex-col gap-6 w-full">
            <h1 className="text-xl font-medium">Question {questionIndex}</h1>
            <p>{question?.quizItem?.question}</p>
          </div>
          <div className="p-4 w-full">
            <h1 className="text-xl font-medium">Answer choices</h1>
            <p className="mt-2">Select only one option</p>

            <div className="mt-6 flex flex-col gap-4">
              {question?.quizItem?.options?.map((option, index) => (
                <label
                  key={index}
                  className="bg-[#F8F8F8] p-2 flex gap-2 rounded-md"
                >
                  <input
                    name="selectedAnswer"
                    type="radio"
                    defaultChecked={question.answer === option.answer}
                    value={option.answer}
                    className="radio radio-success"
                  />
                  {option.answer}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-6">
          <PreviousNextButton
            answerQuestionId={answerQuestionId}
            courseId={courseId}
            questionIndex={questionIndex}
            hasPrevPage={question?.hasPrevPage}
            hasNextPage={question?.hasNextPage}
          />
        </div>
      </form>

      {submitModal && (
        <DialogYesNo
          title="Submit quiz"
          body="Are you sure you want to submit the quiz?"
          noLabel="Cancel"
          yesLabel={
            isSubmitting ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Yes, submit it"
            )
          }
          noCallback={() => setSubmitModal(false)}
          yesCallback={submit}
        />
      )}
    </>
  );
}
