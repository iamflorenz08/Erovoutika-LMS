
import { getServerSession } from "next-auth"
import Categories from "./categories"
import ContentModal from "./contentModal"
import Posts from "./posts"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { IPost } from "@/types/postTypes"

interface IProps {
    category?: string
}

const getPosts = async (userId: string | undefined, category: string | undefined) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/posts?${category ? 'category=' + category : ''}&${userId ? 'userId=' + userId : ''}`, {
        cache: 'no-store'
    })
    return res.json()
}
export default async function Feed({ category }: IProps) {
    const session = await getServerSession(authOptions)
    const posts: IPost[] = await getPosts(session?.user._id, category)
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
