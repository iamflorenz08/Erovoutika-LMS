import Image from "next/image"
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { IPost } from "@/types/postTypes"
import Link from "next/link"

const getSavedThreads = async (accessToken: string | any) => {
    if (!accessToken) return null
    const res = await fetch(`${process.env.API_URI}/api/v1/save/thread`, {
        headers: {
            'authorization': 'Bearer ' + accessToken
        }
    })
    return res.json()
}

export default async function WatchedThreads() {
    const session = await getServerSession(authOptions)
    const savedThreads: Array<IPost> = await getSavedThreads(session?.user.tokens.accessToken)

    return (
        <div className="hidden bg-white w-full max-w-[336px] rounded-lg p-4 xl:flex flex-col gap-4 h-fit sticky top-0 shadow-md" >
            <button className="flex items-center gap-2 text-xl font-medium">
                <h1>Saved threads</h1>
                <span className="text-sm"><FaChevronRight /></span>
            </button>

            <div className="flex flex-col gap-4">
                {savedThreads && savedThreads.length > 0 ? savedThreads.slice(0, 5).map((savedThread, index) => (
                    <Link
                        key={index}
                        href={'/forum/' + savedThread._id}
                        className="flex items-center gap-4 hover:bg-primary-light hover:bg-opacity-5 rounded-lg duration-300">
                        <Image className="w-12 h-12 object-cover" src={'/sample_user_icon.png'} alt="icon" width={48} height={48} />
                        <div>
                            <h1 className="font-medium text-[10px] text-gray capitalize line-clamp-1">{savedThread.author?.fullName.first} {savedThread.author?.fullName.last}</h1>
                            <p className="font-semibold line-clamp-1">{savedThread.title}</p>
                            <h2 className="font-medium text-xs text-gray">{savedThread.commentCount} comments</h2>
                        </div>
                    </Link>
                )) : (
                    <span>No saved threads</span>
                )}
            </div>
        </div>
    )
}
