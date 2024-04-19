import { PiArrowFatDownLight } from "@react-icons/all-files/pi/PiArrowFatDownLight";
import { PiArrowFatUpLight } from "@react-icons/all-files/pi/PiArrowFatUpLight";
import { PiArrowFatDownFill } from "@react-icons/all-files/pi/PiArrowFatDownFill";
import { PiArrowFatUpFill } from "@react-icons/all-files/pi/PiArrowFatUpFill";
import { useOptimistic, useState } from "react";
import { VoteType, addVote } from "./action";
import { useParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

interface IProps {
  voteCount: number;
  voteType: string | undefined;
}

export default function UpdownVote({ voteCount, voteType }: IProps) {
  const { id: postId }: { id: string } = useParams();
  const { status } = useSession();
  const [active, setActive] = useState<string | undefined>();
  const [voteDetails, setVoteDetails] = useOptimistic(
    {
      voteCount,
      voteType,
    },
    (state: IProps, newVoteDetails: IProps) => {
      return newVoteDetails;
    }
  );

  return (
    <form
      action={async () => {
        if (status === "unauthenticated") {
          signIn();
          return;
        }
        setVoteDetails({
          voteType: active,
          voteCount:
            active === "upvote"
              ? voteCount + 1
              : active === "downvote"
              ? voteCount - 1
              : voteCount,
        });
        await addVote(postId, null, active as VoteType);
      }}
      className="flex gap-2 items-center"
    >
      <button
        disabled={status === "loading"}
        type="submit"
        onClick={() =>
          voteDetails.voteType === "downvote" || !voteDetails.voteType
            ? setActive("upvote")
            : setActive(undefined)
        }
      >
        {voteDetails.voteType === "upvote" ? (
          <PiArrowFatUpFill className="text-primary" size={24} />
        ) : (
          <PiArrowFatUpLight size={24} />
        )}
      </button>
      <span>{voteDetails.voteCount}</span>
      <button
        disabled={status === "loading"}
        type="submit"
        onClick={() =>
          voteDetails.voteType === "upvote" || !voteDetails.voteType
            ? setActive("downvote")
            : setActive(undefined)
        }
      >
        {voteDetails.voteType === "downvote" ? (
          <PiArrowFatDownFill className="text-primary" size={24} />
        ) : (
          <PiArrowFatDownLight size={24} />
        )}
      </button>
    </form>
  );
}
