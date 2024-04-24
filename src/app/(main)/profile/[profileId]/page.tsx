import { Suspense } from "react";
import ContentModal from "../../forum/contentModal";
import PostsSection from "./postsSection";
import UserProfile from "./userProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DailyQuest from "./dailyQuest";

interface IProps {
  params: { profileId: string };
}

export default async function ProfileIdPage({ params: { profileId } }: IProps) {
  const session = await getServerSession(authOptions);
  return (
    <main className="px-6 flex flex-col gap-6 duration-300">
      <Suspense fallback={<p>Loading profile...</p>}>
        <UserProfile profileId={profileId} />
      </Suspense>

      <div className="flex gap-6">
        <div className="w-full max-w-[288px] h-fit">
          {/* STATS */}
          <div className="w-full bg-white shadow-md rounded-lg p-4">
            <h1 className="font-semibold text-xl">Stats</h1>
            <div className="border border-gray border-opacity-50 p-2 flex font-medium">
              <div className="text-center w-full flex flex-col gap-2">
                <div className="flex flex-col">
                  <span>N/A</span>
                  <span>Points</span>
                </div>

                <div className="flex flex-col">
                  <span>N/A</span>
                  <span>Comments</span>
                </div>
              </div>

              <div className="text-center w-full flex flex-col gap-2">
                <div className="flex flex-col">
                  <span>N/A</span>
                  <span>Posts</span>
                </div>

                <div className="flex flex-col">
                  <span>N/A</span>
                  <span>Finished quest</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-fit flex flex-col gap-4">
          <ContentModal />
          <Suspense fallback={<p>Loading feed...</p>}>
            <PostsSection profileId={profileId} />
          </Suspense>
        </div>
        {session?.user._id === profileId ? (
          <DailyQuest />
        ) : (
          <div className={`w-full max-w-[320px] h-fit`}></div>
        )}
      </div>
    </main>
  );
}
