import { IUser } from "@/types/userTypes";
import Image from "next/image";
import SaveThread from "./saveThread";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { any } from "zod";
import { ISaveThread } from "@/types/saveTypes";

interface IProps {
  author?: IUser;
  postId: string | any;
}

const getSavedThread = async (
  accessToken: string | any,
  postId: string | any
) => {
  if (!accessToken) return null;
  const res = await fetch(
    `${process.env.API_URI}/api/v1/save/thread/${postId}`,
    {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    }
  );
  return res.json();
};

export default async function ThreadStartInfo({ author, postId }: IProps) {
  const session = await getServerSession(authOptions);
  const savedThread: ISaveThread = await getSavedThread(
    session?.user.tokens.accessToken,
    postId
  );
  return (
    <div className="max-w-[272px] w-full bg-white shadow-md p-4 rounded-lg h-fit sticky top-0">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="font-medium">Thread Starter</h1>
        <Image
          className="w-12 h-12 object-cover rounded-full"
          src={"/sample_user_icon.png"}
          alt="user_icon"
          width={48}
          height={48}
        />
        <div className="flex flex-col items-center">
          <h1 className="font-medium capitalize">
            {author?.fullName?.first} {author?.fullName?.last}
          </h1>
          <h2 className="font-light text-gray capitalize">{author?.role}</h2>
          <span className="border border-gray border-opacity-50 text-gray text-[10px] w-fit px-1.5 py-0.5 rounded-xl">
            Lvl. {author?.levelInfo?.level}
          </span>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <h1 className="font-medium">Badges</h1>
        <div className="flex gap-5 justify-center text-center my-4 ">
          {author?.currentBadges?.map((badge, index) => (
            <Image
              key={index}
              className="h-12 w-12 object-center"
              src={badge.imageURL}
              alt={badge.name}
              height={48}
              width={48}
            />
          ))}
        </div>

        <div className="flex font-medium">
          <div className="flex flex-col w-full text-center">
            <span>{author?.levelInfo?.points}</span>
            <span>Points</span>
          </div>
          <div className="flex flex-col w-full text-center">
            <span>N/A</span>
            <span>Posts</span>
          </div>
        </div>
      </div>

      <SaveThread saveState={savedThread ? true : false} />
    </div>
  );
}
