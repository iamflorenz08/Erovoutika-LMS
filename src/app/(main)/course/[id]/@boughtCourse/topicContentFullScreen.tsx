import PostContent from "@/components/postContent";
import { IContent } from "@/types/course";
import { RxCross2 } from "@react-icons/all-files/rx/RxCross2";
import { useEffect, useRef, useState } from "react";
import { finishReadingContent } from "./action";
import { useInView } from "framer-motion";
import { useParams } from "next/navigation";

interface IProps {
  topicContent?: IContent;
  onClose?: () => void;
}

export default function TopicContentFullScreen({
  topicContent,
  onClose,
}: IProps) {
  const bottomRef = useRef(null);
  const isInView = useInView(bottomRef);
  const params: { id: string } = useParams();
  const [isAcceptable, setIsAcceptable] = useState<boolean>(false);

  useEffect(() => {
    setIsAcceptable(false);
    const timeout = setTimeout(() => setIsAcceptable(true), 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [topicContent]);

  useEffect(() => {
    const finishReading = async () => {
      await finishReadingContent(params.id, topicContent?._id);
    };

    isInView &&
      isAcceptable &&
      topicContent?.type === "text" &&
      finishReading();
  }, [isInView, isAcceptable]);

  return (
    <div className="fixed inset-0 h-screen w-full bg-black bg-opacity-20 z-50 flex justify-center items-center py-4">
      <div className="bg-white max-h-full p-4 w-[808px] rounded-md overflow-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl">{topicContent?.title}</h1>
          <button onClick={onClose}>
            <RxCross2 />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-4 border border-gray border-opacity-20">
          {topicContent?.text && (
            <PostContent
              key={topicContent._id}
              className="!p-0"
              content={topicContent.text}
            />
          )}
        </div>
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
