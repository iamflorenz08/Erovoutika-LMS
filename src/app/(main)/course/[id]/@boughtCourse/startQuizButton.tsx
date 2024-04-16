import { useState } from "react";
import { createAnswerQuiz } from "./action";
import { useParams, useRouter } from "next/navigation";

interface IProps {
  quizId?: string;
  isContinue?: boolean;
}

export default function StartQuizButton({ quizId, isContinue }: IProps) {
  const router = useRouter();
  const params: { id: string } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createQuiz = async () => {
    if (!quizId) return;
    setIsLoading(true);
    const answerQuizId = await createAnswerQuiz(quizId);
    setIsLoading(false);
    if (!answerQuizId) return;
    router.push(`/course/${params.id}/quiz/${answerQuizId.answerQuizId}/1`);
  };
  return (
    <button
      disabled={isLoading}
      onClick={createQuiz}
      className="bg-primary text-white px-9 py-2 font-semibold rounded-md"
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : isContinue ? (
        "Continue"
      ) : (
        "Start"
      )}
    </button>
  );
}
