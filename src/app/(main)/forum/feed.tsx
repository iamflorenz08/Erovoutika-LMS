
import { getServerSession } from "next-auth"
import Categories from "./categories"
import ContentModal from "./contentModal"
import Posts from "./posts"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { IPost } from "@/types/postTypes"

const getPosts = async (accessToken: string | undefined) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/posts`, {
        cache: 'no-cache',
        headers: {
            'authorization': 'Bearer ' + accessToken
        }
    })
    return res.json()
}

export default async function Feed() {
    const session = await getServerSession(authOptions)
    const posts: IPost[] = await getPosts(session?.user.tokens.accessToken)
    return (
        <>
            <div className="w-full flex flex-col gap-4">
                {/* Thread Creation */}
                <ContentModal />

                {/* Categories */}
                <Categories />

                {/* Posts */}
                <Posts
                    posts={posts}
                />
            </div>
        </>
    )
}
