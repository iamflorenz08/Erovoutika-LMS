import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IAnswerQuiz } from "@/types/quiz";
import { getServerSession } from "next-auth";
import Link from "next/link";
import SubmitAssesmentButton from "./submitAssesmentButton";

const fetchAnswerQuestion = async (answerQuizId: string | undefined) => {
  if (!answerQuizId) return null;
  try {
    const session = await getServerSession(authOptions);
    const res = await fetch(
      `${process.env.API_URI}/api/v1/course/assesment/questions/${answerQuizId}`,
      {
        headers: {
          Authorization: "Bearer " + session?.user.tokens.accessToken,
        },
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

interface IProps {
  answerId?: string;
  answerQuestionIndex?: number;
}
export default async function NumberItems({
  answerId,
  answerQuestionIndex,
}: IProps) {
  const answerQuestion: IAnswerQuiz = await fetchAnswerQuestion(answerId);
  return (
    <>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {answerQuestion.answers?.map((answer, index) => (
          <Link
            key={answer._id}
            href={`/course/6610a7f49278ee599ebf9efa/quiz/${answerId}/${
              index + 1
            }`}
            className={`w-full h-12 rounded-md bg-border flex justify-center items-center font-semibold text-gray
            ${answerQuestionIndex === index + 1 && "!text-white !bg-primary"}
            ${answer.answer && "text-primary"}
            `}
          >
            {index + 1}
          </Link>
        ))}
      </div>
      <SubmitAssesmentButton type="two" />
      <div className="text-center mt-2">
        <span>
          {answerQuestion.answers?.reduce(
            (prev, answer) => prev + (answer.answer ? 1 : 0),
            0
          )}
          /{answerQuestion.answers?.length} Questions attempted
        </span>
      </div>
    </>
  );
}
