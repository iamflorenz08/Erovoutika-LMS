import ThreadStartInfo from "./threadStartInfo";
import RelatedThreads from "./relatedThreads";
import MainThread from "./mainThread";
import { getServerSession } from "next-auth";
import { IPost } from "@/types/postTypes";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Provider from "./provider";

interface IProps {
  params: { id: string };
}

const getPost = async (
  accessToken: string | undefined,
  postID: string,
  userId: string | any
) => {
  const res = await fetch(
    `${process.env.API_URI}/api/v1/posts/${postID}${
      userId ? "?userId=" + userId : ""
    }`,
    {
      next: { tags: ["post"] },
      headers: {
        authorization: "Bearer " + accessToken,
      },
    }
  );
  return res.json();
};
const addView = async (postId: string, userId: string, accessToken: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/v1/posts/view`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      postId,
      userId: userId,
    }),
  });
};

export default async function page({ params }: IProps) {
  const session = await getServerSession(authOptions);
  const post: IPost = await getPost(
    session?.user.tokens.accessToken,
    params.id,
    session?.user._id
  );

  if (session) {
    await addView(params.id, session.user._id, session.user.tokens.accessToken);
  }

  return (
    <Provider post={post}>
      <section className="flex gap-6 px-6">
        {/* THREAD STARTER INFO AND SUBSCRIBE THREAD */}
        <ThreadStartInfo author={post.author} postId={params.id} />

        {/* Main Thread and Comments */}
        <MainThread post={post} />

        {/* Related Threads or Forums */}
        <RelatedThreads postId={params.id} />
      </section>
    </Provider>
  );
}
