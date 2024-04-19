"use client";
import { useState } from "react";
import { claimRewardDailyQuest } from "./action";

interface IProps {
  disabled?: boolean;
  isDailyQuestRewardClaimed?: boolean;
}
export default function ClaimRewardButton({
  disabled,
  isDailyQuestRewardClaimed,
}: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const claimReward = async () => {
    setIsLoading(true);
    const claimReward = await claimRewardDailyQuest();
    console.log(claimReward);
    setIsLoading(false);
  };

  return (
    <button
      disabled={disabled}
      onClick={claimReward}
      className="px-6 py-2 disabled:bg-gray disabled:bg-opacity-50 font-semibold disabled:text-black disabled:text-opacity-60 bg-primary text-white rounded-lg"
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : isDailyQuestRewardClaimed ? (
        "Claimed"
      ) : (
        "Claim"
      )}
    </button>
  );
}
