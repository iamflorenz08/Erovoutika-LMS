"use client";
import PostContent from "@/components/postContent";
import { SelectTopicContext } from "@/contexts/SelectTopicContext";
import { IAnswerQuiz } from "@/types/quiz";
import { formatDate } from "@/utils/dateUtils";
import { fetchWithToken } from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import StartQuizButton from "./startQuizButton";
import { useInView } from "framer-motion";
import { finishReadingContent } from "./action";
import { useParams } from "next/navigation";
import { IContent } from "@/types/course";
import Image from "next/image";
import { FaRegFilePdf } from "@react-icons/all-files/fa6/FaRegFilePdf";

export default function TopicContent() {
  const params: { id: string } = useParams();
  const bottomRef = useRef(null);
  const isInView = useInView(bottomRef);

  const [isAcceptable, setIsAcceptable] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const [topicContent, setTopicContent]: [
    topicContent: IContent,
    setTopicContent: React.Dispatch<SetStateAction<IContent>>
  ] = useContext(SelectTopicContext);
  const { data, isLoading }: { data: Array<IAnswerQuiz>; isLoading: boolean } =
    useSWR(
      () =>
        topicContent.type === "assesment" &&
        topicContent.assesment &&
        status === "authenticated"
          ? `/api/v1/course/assesment/progress/${topicContent.assesment._id}`
          : null,
      (url) => fetchWithToken(url, session?.user.tokens.accessToken || "")
    );

  useEffect(() => {
    setIsAcceptable(false);
    const timeout = setTimeout(() => setIsAcceptable(true), 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [topicContent]);

  useEffect(() => {
    const finishReading = async () => {
      await finishReadingContent(params.id, topicContent._id);
    };

    isInView &&
      isAcceptable &&
      (topicContent.type === "text" || topicContent.type === "media") &&
      finishReading();
  }, [isInView, isAcceptable]);

  const handleGenerateCertificate = async () => {
    if (!params.id) throw new Error("No course ID.");
    if (status !== "authenticated") throw new Error("Not authorized.");
    let anchor = document.createElement("a");
    fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/api/v1/course/certificate/${params.id}`,
      {
        headers: {
          authorization: "Bearer " + session?.user.tokens.accessToken,
        },
      }
    )
      .then((res) => res.blob())
      .then((blob) => {
        let objectUrl = window.URL.createObjectURL(blob);
        anchor.href = objectUrl;
        anchor.download = "erohub-certificate.pdf";
        anchor.click();
        window.URL.revokeObjectURL(objectUrl);
      });
  };

  return (
    <>
      <h1 className="font-semibold text-xl">{topicContent.title}</h1>
      {topicContent.type === "text" && (
        <div className="mt-4 flex flex-col gap-4 border border-gray border-opacity-20">
          {topicContent.text && (
            <PostContent
              key={topicContent._id}
              className="!p-0"
              content={topicContent.text}
            />
          )}
        </div>
      )}

      {topicContent.type === "media" && (
        <>
          {topicContent.media?.fileType?.includes("image/") && (
            <div className="h-96 w-full mt-4 relative bg-gray bg-opacity-15">
              {topicContent.media?.fileUrl && (
                <Image
                  className="object-contain"
                  src={topicContent.media?.fileUrl}
                  alt="file"
                  fill
                />
              )}
            </div>
          )}

          {topicContent.media?.fileType?.includes("application/pdf") && (
            <div className="h-14 border-2 border-primary-light flex gap-4 items-center px-4 rounded-md text-primary-light mt-4">
              <FaRegFilePdf size={24} />
              <span>{topicContent.media.fileName}</span>
            </div>
          )}
        </>
      )}

      {topicContent.type === "certificate" && (
        <>
          <div className="mt-4 flex flex-col border border-gray border-opacity-20 p-4">
            <span className="font-semibold">Note:</span>
            {topicContent.isCourseCompleted ? (
              <span>Congratulations on successfully completing the course</span>
            ) : (
              <span>
                Finish all of the course contents before making a claim.
              </span>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <button
              disabled={!topicContent.isCourseCompleted}
              onClick={handleGenerateCertificate}
              className="bg-primary text-white px-9 py-2 rounded-md disabled:bg-gray"
            >
              Claim
            </button>
          </div>
        </>
      )}

      {topicContent.type === "assesment" && (
        <>
          <div className="mt-4 border border-gray border-opacity-20 p-4">
            <div className="flex gap-2">
              <span className="font-semibold">Opened:</span>
              <span>Tuesday, 5 September 2023, 12:00 AM</span>
            </div>

            <div className="flex gap-2">
              <span className="font-semibold">Due:</span>
              <span>Tuesday, 12 September 2023, 12:00 AM</span>
            </div>
          </div>

          <div className="mt-4 border border-gray border-opacity-20 p-4">
            <div className="flex gap-2">
              <span className="font-semibold">Questions:</span>
              <span>20</span>
            </div>

            <div className="flex gap-2">
              <span className="font-semibold">Passing Score:</span>
              <span>15</span>
            </div>

            <div className="flex gap-2">
              <span className="font-semibold">Attempts:</span>
              <span>2/3</span>
            </div>

            <div className="flex gap-2">
              <span className="font-semibold">Total Marks:</span>
              <span>20</span>
            </div>
          </div>

          <div className="mt-4 border border-gray border-opacity-20 p-4">
            <h1 className="font-semibold">Instructions:</h1>
            <div className="flex flex-col gap-4">
              <p>
                Welcome to the quiz! To get started, click the &quot;Start
                Quiz&quot; button. Each question will be presented one at a
                time. Read the questions carefully and select the most
                appropriate answer. If it&apos;s a multiple-choice question,
                click on your chosen option.
              </p>

              <p>
                You can navigate between questions using the &quot;Next&quot;
                and &quot;Previous&quot; buttons. Feel free to review and change
                your answers before submitting.
              </p>

              <p>
                Once you&apos;ve answered all the questions, click
                &quot;Submit&quot; Be aware that after submission, you
                won&apos;t be able to modify your answers. After submitting,
                you&apos;ll see your results.
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <StartQuizButton
              quizId={topicContent.assesment?._id}
              isContinue={
                data && data.some((result) => result.status === "pending")
              }
            />
          </div>

          <h1 className="font-semibold mt-10">Attempt History</h1>

          <div className="flex flex-col gap-2 mt-4">
            {isLoading
              ? "Loading"
              : data.map(
                  (result, index) =>
                    result.status === "submitted" && (
                      <div
                        key={result._id}
                        className="border border-gray border-opacity-20 p-4 flex justify-between items-center"
                      >
                        <div className="flex flex-col">
                          <span>Attempt #{index + 1}</span>
                          <span className="text-gray">
                            {result.dateSubmitted &&
                              formatDate(new Date(result.dateSubmitted))}
                          </span>
                        </div>
                        <div>
                          Marks:{" "}
                          {result.answers?.reduce(
                            (prev, answer) => prev + (answer.isCorrect ? 1 : 0),
                            0
                          )}
                        </div>
                      </div>
                    )
                )}
          </div>
        </>
      )}

      <div ref={bottomRef} />
    </>
  );
}
