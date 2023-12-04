import { getServerSession } from "next-auth";
import ContentModal from "../../forum/contentModal";
import Posts from "../../forum/posts";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IPost } from "@/types/postTypes";

interface IProps {
    profileId: string,
}

const getPosts = async (profileId: string | undefined) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/posts/user/${profileId}`)
    return res.json()
}
export default async function PostsSection({ profileId }: IProps) {
    const posts: Array<IPost> = await getPosts(profileId)
    return (
        <>
            <Posts posts={posts} />
        </>
    )
}
