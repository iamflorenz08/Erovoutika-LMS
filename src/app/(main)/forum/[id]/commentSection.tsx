import ParentComment from "./parentComment";
import { useFormState } from "react-dom";
import { IStatus } from "@/types/statusTypes";
import { addComment } from "./action";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { IComment } from "@/types/commentTypes";
import ReplyInputBox from "./replyInputBox";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { questReward } from "@/app/action";
import { useSession } from "next-auth/react";
import { fetchWithoutToken } from "@/utils/fetcher";
import { PostContext } from "./postContext";

interface IProps {
  showReply: boolean;
  setShowReply: (state: boolean) => void;
}

export interface ICommentStatus extends IStatus {
  artistID?: string | null;
  comment?: string | null;
  data?: IComment;
}

const initialState: ICommentStatus = {
  success: false,
};

const findIndexOfGreatest = (array: Array<IComment>) => {
  let greatest;
  let indexOfGreatest;
  for (var i = 0; i < array.length; i++) {
    if (!greatest || (array[i].updownVoteCount ?? 0) > greatest) {
      greatest = array[i].updownVoteCount;
      indexOfGreatest = i;
    }
  }
  return { greatest, indexOfGreatest };
};

export default function CommentSection({ showReply, setShowReply }: IProps) {
  const { data: session } = useSession();
  const { id } = useParams();
  const [status, formAction] = useFormState(addComment, initialState);
  const { post, setPost } = useContext(PostContext);
  const {
    data: comments,
    isLoading,
  }: { data: Array<IComment>; isLoading: boolean } = useSWR(
    `/api/v1/comments/${id}${
      session?.user._id ? "?userId=" + session.user._id : ""
    }`,
    fetchWithoutToken
  );

  useEffect(() => {
    if (status.success) {
      status.success = false;
      questReward("daily_quest_2").catch((err) => console.log(err));
      setShowReply(false);
    }
  }, [status]);

  const haveAcceptedAnswer = useMemo(() => {
    return comments && comments.some((comment) => comment.isAcceptedAnswer);
  }, [comments]);

  if (isLoading) return "Loading";

  const { greatest: topAnswerVoteCount, indexOfGreatest: topAnswerIndex } =
    findIndexOfGreatest(comments);

  return (
    <section className="bg-white shadow-md p-4 rounded-md flex flex-col gap-4">
      {/* COMMENT CREATION */}
      <form action={formAction} className="flex flex-col gap-4">
        <h1 className="font-medium text-xl">Comment</h1>
        {showReply && (
          <ReplyInputBox
            onSuccess={(comment) => comments.push(comment)}
            status={status}
          />
        )}
        <input type="hidden" name="parentID" value={id} />
      </form>

      {/* DIVIDER */}
      <div className="w-full h-[2px] bg-gray opacity-20"></div>

      {/* COMMENTS */}
      {comments &&
        comments.map((comment, index) => (
          <ParentComment
            key={index}
            isAuthor={post?.author?._id === session?.user._id}
            haveAcceptedAnswer={haveAcceptedAnswer}
            comment={comment}
            isTopAnswer={
              (topAnswerVoteCount ?? 0) <= 0
                ? false
                : (topAnswerVoteCount ?? 0) === comment.updownVoteCount
            }
          />
        ))}
    </section>
  );
}
