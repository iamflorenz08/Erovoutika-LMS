import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IAnswer } from "@/types/quiz";
import { getServerSession } from "next-auth";
import NumberItems from "./numberItems";
import AnswerForm from "./answerForm";

interface IProps {
  params: { id: string; answerId: string; questionIndex: string };
}

const fetchQuestion = async (
  answerQuestionId: string,
  questionIndex: string
) => {
  try {
    const session = await getServerSession(authOptions);
    const res = await fetch(
      `${process.env.API_URI}/api/v1/course/assesment/questions/${answerQuestionId}/${questionIndex}`,
      {
        next: { tags: ["quiz"] },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.user.tokens.accessToken,
        },
      }
    );
    if (!res.ok) throw new Error();
    return res.json();
  } catch (error) {
    return {} as IAnswer;
  }
};

export default async function page({ params }: IProps) {
  const question: IAnswer = await fetchQuestion(
    params.answerId,
    params.questionIndex
  );

  return (
    <div className="flex gap-6 px-6 py-4">
      <AnswerForm
        answerQuestionId={params.answerId}
        courseId={params.id}
        questionIndex={params.questionIndex}
        question={question}
      />
      <section className="bg-white bg-border min-w-[336px] p-4 rounded-lg h-fit">
        <h1 className="font-semibold text-2xl text-center">
          Untitled Assessment
        </h1>
        <NumberItems
          answerId={params.answerId}
          answerQuestionIndex={Number(params.questionIndex)}
        />
      </section>
    </div>
  );
}
