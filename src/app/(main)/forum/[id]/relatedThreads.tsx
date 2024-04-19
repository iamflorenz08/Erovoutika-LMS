import { IPost } from "@/types/postTypes";
import Image from "next/image";
import Link from "next/link";
interface IProps {
  postId: string;
}

const getRelatedPosts = async (postId: string) => {
  const res = await fetch(
    `${process.env.API_URI}/api/v1/posts/related/${postId}`
  );
  return res.json();
};

export default async function RelatedThreads({ postId }: IProps) {
  const relatedPosts: Array<IPost> = await getRelatedPosts(postId);
  return (
    <div className="hidden bg-white w-full max-w-[336px] rounded-lg p-4 xl:flex flex-col gap-4 h-fit sticky top-0 shadow-md">
      <button className="flex items-center gap-2 text-xl font-medium">
        <h1>Related</h1>
      </button>

      <div className="flex flex-col gap-4">
        {relatedPosts.map((post, index) => (
          <Link
            key={index}
            href={"/forum/" + post._id}
            className="flex items-center gap-4 hover:bg-primary-light hover:bg-opacity-5 rounded-lg duration-300"
          >
            <Image
              className="w-12 h-12 object-cover"
              src={"/sample_user_icon.png"}
              alt="icon"
              width={48}
              height={48}
            />
            <div>
              <h1 className="font-medium text-[10px] text-gray capitalize">
                {post.author?.fullName.first}
              </h1>
              <p className="font-semibold line-clamp-1">{post.title}</p>
              <h2 className="font-medium text-xs text-gray">
                {post.commentCount} comments
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
