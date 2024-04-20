import { PiArrowFatUpLight } from "@react-icons/all-files/pi/PiArrowFatUpLight";
import { PiArrowFatDownLight } from "@react-icons/all-files/pi/PiArrowFatDownLight";
import { LuReply } from "@react-icons/all-files/lu/LuReply";
import { BiDotsVerticalRounded } from "@react-icons/all-files/bi/BiDotsVerticalRounded";
import Image from "next/image";
import ChildComment from "./childComment";
import { IComment } from "@/types/commentTypes";
import { useEffect, useState } from "react";
import ReplyInputBox from "./replyInputBox";
import { useFormState } from "react-dom";
import { acceptAnswer, addComment } from "./action";
import { ICommentStatus } from "./commentSection";
import useSWR, { useSWRConfig } from "swr";
import CommentVoteButtons from "./commentVoteButtons";
import { fetchWithoutToken } from "@/utils/fetcher";
import { HiOutlineCheckBadge } from "@react-icons/all-files/hi2/HiOutlineCheckBadge";
import { HiCheckBadge } from "@react-icons/all-files/hi2/HiCheckBadge";
import { signIn, useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { timeAgo } from "@/utils/dateUtils";
interface IProps {
  comment: IComment;
  isTopAnswer?: boolean;
  isAuthor?: boolean;
  haveAcceptedAnswer?: boolean;
}

const initialState: ICommentStatus = {
  success: false,
};

export default function ParentComment({
  comment,
  isTopAnswer,
  isAuthor,
  haveAcceptedAnswer,
}: IProps) {
  const { data: session, status: sessionStatus } = useSession();
  const { id } = useParams();
  const { mutate } = useSWRConfig();
  const [status, formAction] = useFormState(addComment, initialState);
  const [isAcceptedAnswer, setIsAcceptedAnswer] = useState<boolean>(
    comment.isAcceptedAnswer ?? false
  );
  const [createComment, setCreateComment] = useState<boolean>(false);
  const {
    data: comments,
    isLoading,
  }: { data: Array<IComment>; isLoading: boolean } = useSWR(
    `/api/v1/comments/${comment._id}`,
    fetchWithoutToken
  );

  useEffect(() => {
    if (status.success) {
      status.success = false;
      setCreateComment(false);
    }
  }, [status]);

  const handleAcceptAnswer = async () => {
    if (sessionStatus === "unauthenticated") {
      signIn();
      return;
    }
    if (isAcceptedAnswer) return;
    setIsAcceptedAnswer(true);
    await acceptAnswer(comment._id);
    mutate(
      `/api/v1/comments/${id}${
        session?.user._id ? "?userId=" + session.user._id : ""
      }`
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {/* POST HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Image
            className="w-12 h-12 object-cover"
            src={"/sample_user_icon.png"}
            alt="user_icon"
            width={48}
            height={48}
          />
          <div>
            <h1 className="font-medium">
              {comment.author?.fullName.first} {comment.author?.fullName.last}
            </h1>
            <span className="text-gray text-sm">
              {comment.createdAt && timeAgo(new Date(comment.createdAt))}
            </span>
          </div>
        </div>

        <div className="flex gap-[10px]">
          {isAcceptedAnswer && (
            <span className="bg-reward text-white px-2.5 py-1.5 flex items-center gap-2 rounded-[20px]  font-semibold">
              <HiOutlineCheckBadge size={20} />
              <span>Accepted Answer</span>
            </span>
          )}
          {isTopAnswer && (
            <span className="bg-green-700 text-white px-2.5 py-1.5 rounded-[20px] font-semibold">
              Top Answer
            </span>
          )}
        </div>
      </div>

      {/* BODY */}
      <div dangerouslySetInnerHTML={{ __html: comment.comment }}></div>

      {/* POST FOOTER */}
      <div className="flex flex-wrap gap-4 justify-end items-center w-full">
        <div className="flex gap-4 text-gray items-center">
          <button className="text-gray">
            <BiDotsVerticalRounded size={24} />
          </button>
          <button
            onClick={() => setCreateComment((value) => !value)}
            className="flex gap-2 items-center"
          >
            <LuReply size={24} />
            Reply
          </button>

          {isAuthor && (
            <button
              disabled={haveAcceptedAnswer}
              onClick={handleAcceptAnswer}
              className={`${isAcceptedAnswer && "text-reward"} ${
                haveAcceptedAnswer &&
                !isAcceptedAnswer &&
                "disabled:text-gray disabled:text-opacity-30"
              }`}
            >
              {isAcceptedAnswer ? (
                <HiCheckBadge size={25} />
              ) : (
                <HiOutlineCheckBadge size={25} />
              )}
            </button>
          )}

          <span className="flex gap-2 items-center">
            <CommentVoteButtons
              voteCount={comment.updownVoteCount ?? 0}
              voteType={comment.vote?.type}
              commentId={comment._id}
            />
          </span>
        </div>
      </div>

      {/* CHILD COMMENT */}

      {comments &&
        comments.map((comment, index) => (
          <ChildComment
            key={index}
            comment={comment}
            onClickReply={() => setCreateComment((value) => !value)}
          />
        ))}

      <form
        action={formAction}
        className="flex flex-col gap-4 pl-4 border-l-2 border-gray border-opacity-20"
      >
        {createComment && (
          <ReplyInputBox
            status={status}
            onSuccess={(comment) => comments.push(comment)}
            onCancel={() => setCreateComment(false)}
          />
        )}
        <input type="hidden" name="parentID" value={comment._id} />
      </form>
    </div>
  );
}
