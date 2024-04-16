"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFormStatus } from "react-dom";
import SubmitAssesmentButton from "./submitAssesmentButton";
interface IProps {
  courseId?: string;
  answerQuestionId?: string;
  questionIndex?: string;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}
export default function PreviousNextButton({
  answerQuestionId,
  courseId,
  questionIndex,
  hasNextPage,
  hasPrevPage,
}: IProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {hasPrevPage && (
        <Link
          href={`/course/${courseId}/quiz/${answerQuestionId}/${
            Number(questionIndex) - 1
          }`}
          className="font-medium text-xl"
        >
          Previous
        </Link>
      )}

      <button
        disabled={pending}
        className="py-2 px-9 bg-primary text-white font-medium text-xl rounded-md"
      >
        {pending ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : hasNextPage ? (
          "Next"
        ) : (
          "Finish attempt"
        )}
      </button>
    </>
  );
}
