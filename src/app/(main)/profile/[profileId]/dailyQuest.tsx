import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IPoint } from "@/types/point";
import { count } from "console";
import { getServerSession } from "next-auth";
import { number } from "zod";
import ClaimRewardButton from "./claimRewardButton";

interface IProgressCount {
  maxCount: number;
  count: number;
}

const fetchDailyQuests = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Not authenticated.");
    const res = await fetch(`${process.env.API_URI}/api/v1/points/quest`, {
      next: { tags: ["daily_quest"] },
      headers: {
        authorization: "Bearer " + session.user.tokens.accessToken,
      },
    });
    if (!res.ok) throw new Error("Server error");
    return res.json();
  } catch (error) {
    return [];
  }
};

export default async function DailyQuest() {
  const dailyQuests: IPoint = await fetchDailyQuests();

  const dailyQuest1 = dailyQuests?.quests?.[0];
  const dailyQuest2 = dailyQuests?.quests?.[1];

  return (
    <div className={`w-full max-w-[320px] h-fit `}>
      <div className="w-full bg-white shadow-md rounded-lg p-4">
        <h1 className="font-semibold text-xl">Daily Quest</h1>
        <div className="flex flex-col gap-4">
          <div
            className={`p-2 ${
              dailyQuest1?.isCompleted &&
              "bg-success bg-opacity-20 border border-gray border-opacity-10"
            }`}
          >
            <div className="flex justify-between">
              <h1 className="font-semibold">Quest #1</h1>
              <h2 className="text-gray">
                Progress:{" "}
                <span
                  className={`font-bold ${
                    dailyQuest1?.isCompleted ? "text-success" : "text-black"
                  }`}
                >
                  {dailyQuest1?.isCompleted
                    ? "Done"
                    : `${dailyQuest1?.count}/${dailyQuest1?.maxCount}`}
                </span>
              </h2>
            </div>
            <p className="mt-2">Daily Login.</p>
            <h2 className="flex justify-end mt-4">
              Reward: <span className="font-bold">10 points</span>
            </h2>
          </div>

          <div
            className={`p-2 ${
              dailyQuest2?.isCompleted &&
              "bg-success bg-opacity-20 border border-gray border-opacity-10"
            }`}
          >
            <div className="flex justify-between">
              <h1 className="font-semibold">Quest #2</h1>
              <h2 className="text-gray">
                Progress:{" "}
                <span
                  className={`font-bold ${
                    dailyQuest2?.isCompleted ? "text-success" : "text-black"
                  }`}
                >
                  {dailyQuest2?.isCompleted
                    ? "Done"
                    : `${dailyQuest2?.count}/${dailyQuest2?.maxCount}`}
                </span>
              </h2>
            </div>
            <p className="mt-2">Comment on any thread.</p>
            <h2 className="flex justify-end mt-4">
              Reward: <span className="font-bold">10 points</span>
            </h2>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <h2>
            Completed quests:{" "}
            <span className="font-bold">
              {dailyQuests.quests?.reduce(
                (prev, dailyQuest) => (dailyQuest.isCompleted ? 1 : 0) + prev,
                0
              )}
              /{dailyQuests.quests?.length}
            </span>
          </h2>
          <ClaimRewardButton
            disabled={
              !dailyQuests.isQuestsCompleted ||
              dailyQuests.isDailyQuestRewardClaimed
            }
            isDailyQuestRewardClaimed={dailyQuests.isDailyQuestRewardClaimed}
          />
        </div>
      </div>
    </div>
  );
}
