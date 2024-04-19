import { PiArrowFatDownLight } from "@react-icons/all-files/pi/PiArrowFatDownLight";
import { PiArrowFatUpLight } from "@react-icons/all-files/pi/PiArrowFatUpLight";
import { PiArrowFatDownFill } from "@react-icons/all-files/pi/PiArrowFatDownFill";
import { PiArrowFatUpFill } from "@react-icons/all-files/pi/PiArrowFatUpFill";
import { useEffect, useState } from "react";
import { VoteType, addVote } from "./action";
import { useSWRConfig } from "swr";
import { signIn, useSession } from "next-auth/react";
import { useParams } from "next/navigation";

interface IProps {
  voteCount: number;
  commentId: string;
  voteType?: string;
}

export default function CommentVoteButtons({
  voteCount,
  commentId,
  voteType,
}: IProps) {
  const { mutate } = useSWRConfig();
  const { data: session, status } = useSession();
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState<VoteType>(
    voteType as VoteType
  );

  const handleSelectedOption = async (option: VoteType) => {
    if (status === "unauthenticated") return signIn();

    if (selectedOption === option) {
      setSelectedOption(null);
      await addVote(null, commentId, null);
    } else {
      setSelectedOption(option);
      await addVote(null, commentId, option);
    }

    mutate(`/api/v1/comments/${id}?userId=${session?.user._id}`);
  };

  return (
    <>
      <button onClick={() => handleSelectedOption("upvote")}>
        {selectedOption === "upvote" ? (
          <PiArrowFatUpFill size={24} className="text-primary" />
        ) : (
          <PiArrowFatUpLight size={24} />
        )}
      </button>
      <span>{voteCount}</span>
      <button onClick={() => handleSelectedOption("downvote")}>
        {selectedOption === "downvote" ? (
          <PiArrowFatDownFill size={24} className="text-primary" />
        ) : (
          <PiArrowFatDownLight size={24} />
        )}
      </button>
    </>
  );
}
