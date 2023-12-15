
import { Suspense } from "react"
import ContentModal from "../../forum/contentModal"
import PostsSection from "./postsSection"
import UserProfile from "./userProfile"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

interface IProps {
    params: { profileId: string }
}

export default async function ProfileIdPage({ params: { profileId } }: IProps) {
    const session = await getServerSession(authOptions)
    return (
        <main className="px-6 flex flex-col gap-6 duration-300">
            <Suspense fallback={<p>Loading profile...</p>}>
                <UserProfile
                    profileId={profileId}
                />
            </Suspense>

            <div className="flex gap-6">
                <div className="w-full max-w-[288px] h-fit">
                    {/* STATS */}
                    <div className="w-full bg-white shadow-md rounded-lg p-4">
                        <h1 className="font-semibold text-xl">Stats</h1>
                        <div className="border border-gray border-opacity-50 p-2 flex font-medium">
                            <div className="text-center w-full flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <span>999,999</span>
                                    <span>Points</span>
                                </div>

                                <div className="flex flex-col">
                                    <span>999,999</span>
                                    <span>Comments</span>
                                </div>
                            </div>

                            <div className="text-center w-full flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <span>999,999</span>
                                    <span>Posts</span>
                                </div>

                                <div className="flex flex-col">
                                    <span>999,999</span>
                                    <span>Finished quest</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="w-full h-fit flex flex-col gap-4">
                    <ContentModal />
                    <Suspense fallback={<p>Loading feed...</p>}>
                        <PostsSection
                            profileId={profileId}
                        />
                    </Suspense>
                </div>
                {session?.user._id === profileId ? (
                    <div className={`w-full max-w-[320px] h-fit `}>
                        <div className="w-full bg-white shadow-md rounded-lg p-4">
                            <h1 className="font-semibold text-xl">Daily Quest</h1>
                            <div className="flex flex-col gap-4">
                                <div className="p-2 bg-success bg-opacity-20 border border-gray border-opacity-10">
                                    <div className="flex justify-between">
                                        <h1 className="font-semibold">Quest #1</h1>
                                        <h2 className="text-gray">Progress: <span className="text-success font-bold">Done</span></h2>
                                    </div>
                                    <p className="mt-2">Daily Login.</p>
                                    <h2 className="flex justify-end mt-4">Reward: <span className="font-bold">5 points</span></h2>
                                </div>

                                <div className="p-2">
                                    <div className="flex justify-between">
                                        <h1 className="font-semibold">Quest #1</h1>
                                        <h2 className="text-gray">Progress: <span className="font-bold text-black">0/1</span></h2>
                                    </div>
                                    <p className="mt-2">View this recommended thread.</p>
                                    <h2 className="flex justify-end mt-4">Reward: <span className="font-bold">5 points</span></h2>
                                </div>

                                <div className="p-2 bg-success bg-opacity-20 border border-gray border-opacity-10">
                                    <div className="flex justify-between">
                                        <h1 className="font-semibold">Quest #1</h1>
                                        <h2 className="text-gray">Progress: <span className="text-success font-bold">Done</span></h2>
                                    </div>
                                    <p className="mt-2">Daily Login.</p>
                                    <h2 className="flex justify-end mt-4">Reward: <span className="font-bold">5 points</span></h2>
                                </div>

                            </div>
                            <div className="flex justify-between items-center mt-6">
                                <h2>Completed quests: <span className="font-bold">2/3</span></h2>
                                <button
                                    disabled
                                    className="px-6 py-2 disabled:bg-gray disabled:bg-opacity-50 font-semibold disabled:text-black disabled:text-opacity-60 rounded-lg">Claim</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`w-full max-w-[320px] h-fit`}>

                    </div>
                )}


            </div>
        </main>
    )
}
