import Image from "next/image";
import { HiPencil } from "@react-icons/all-files/hi/HiPencil";
import { IUser } from "@/types/userTypes";
import { PiChatCircleDotsFill } from "@react-icons/all-files/pi/PiChatCircleDotsFill";
import Badge from "./badge";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface IProps {
  profileId: string;
}

const getUser = async (
  profileId: string | undefined,
  token: string | undefined
) => {
  const res = await fetch(`${process.env.API_URI}/api/v1/users/${profileId}`, {
    next: { tags: ["user"] },
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  });
  return res.json();
};

export default async function UserProfile({ profileId }: IProps) {
  const session = await getServerSession(authOptions);
  const user: IUser = await getUser(
    profileId,
    session?.user.tokens.accessToken
  );
  const levelProgress =
    ((user.levelInfo?.points ?? 0) / (user.levelInfo?.maxPoints ?? 0)) * 100;
  return (
    <div className="flex flex-col xl:flex-row gap-4 items-center bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col lg:flex-row gap-4 xl:gap-[120px] lg:justify-between xl:justify-start items-center w-full">
        <div className="flex gap-4 items-center">
          <Image
            className="h-[120px] w-[120px] object-cover"
            src={"/sample_user_icon.png"}
            alt="user_icon"
            height={120}
            width={120}
          />
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="font-medium text-3xl capitalize">
              {user.fullName.first.toLowerCase()}{" "}
              {user.fullName.last.toLowerCase()}
            </h1>
            <h2 className="font-light text-gray">Student</h2>
            <div className="max-w-[240px] w-full">
              <div className="flex justify-between">
                <span>Level {user.levelInfo?.level}</span>
                <span>
                  {user.levelInfo?.points}/{user.levelInfo?.maxPoints}
                </span>
              </div>

              <div className="relative bg-gray bg-opacity-50 h-2 rounded-full overflow-hidden mt-0.5">
                <div
                  className="bg-primary-light h-full absolute left-0"
                  style={{
                    width: `${levelProgress}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/*BADGES AND BADGES MODAL */}
        <div className="flex justify-center gap-4 text-primary">
          {[0, 1, 2].map((value, index) => (
            <Badge
              key={index}
              index={index}
              badge={user.currentBadges[index]}
              availableBadges={user.availableBadges}
            />
          ))}
        </div>
      </div>

      <div className="flex w-full justify-center xl:w-max lg:min-w-max items-end lg:justify-end xl:min-h-[120px]">
        {session?.user._id === profileId ? (
          <button className="bg-gray bg-opacity-40 px-4 py-2 flex gap-2 items-center font-medium rounded-lg">
            <HiPencil size={24} />
            Edit Profile
          </button>
        ) : (
          <button className="bg-gray bg-opacity-40 px-4 py-2 flex gap-2 items-center font-medium rounded-lg">
            <PiChatCircleDotsFill size={24} />
            Message
          </button>
        )}
      </div>
    </div>
  );
}
