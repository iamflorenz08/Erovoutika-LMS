import ThreadStartInfo from "./threadStartInfo"
import RelatedThreads from "./relatedThreads"
import MainThread from "./mainThread"
import { getServerSession } from "next-auth"
import { IPost } from "@/types/postTypes"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

interface IProps {
    params: { id: string }
}

const getPost = async (accessToken: string | undefined, postID: string) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/posts/${postID}`, {
        headers: {
            "authorization": "Bearer " + accessToken
        }
    })
    return res.json()
}

export default async function page({ params }: IProps) {
    const session = await getServerSession(authOptions)
    const post: IPost = await getPost(session?.user.tokens.accessToken, params.id)
    return (
        <section className="flex gap-6 px-6">
            {/* THREAD STARTER INFO AND SUBSCRIBE THREAD */}
            <ThreadStartInfo
                author={post.author}
            />

            {/* Main Thread and Comments */}
            <MainThread
                post={post}
            />

            {/* Related Threads or Forums */}
            <RelatedThreads />
        </section>
    )
}
