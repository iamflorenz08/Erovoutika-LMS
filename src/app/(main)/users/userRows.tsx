import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IUser } from "@/types/userTypes";
import { formatDate } from "@/utils/dateUtils";
import { getServerSession } from "next-auth";
import ChangeRole from "./changeRole";
import Image from "next/image";

interface IProps {
  role?: string;
  page?: string;
}
const fetchUsers = async (
  role: string | undefined,
  page: string | undefined
) => {
  try {
    const session = await getServerSession(authOptions);
    const res = await fetch(
      `${process.env.API_URI}/api/v1/users?limit=10
      ${role ? "&role=" + role : "&role=all"}${
        page ? "&page=" + page : "&page=1"
      }`,
      {
        headers: {
          authorization: "Bearer " + session?.user.tokens.accessToken,
        },
      }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
};

export default async function UserRows({ role, page }: IProps) {
  const users: Array<IUser> = await fetchUsers(role, page);
  console.log(users);
  return users.map((user) => (
    <tr key={user._id}>
      <td className="py-2 w-fit">
        <div className="w-6 h-6 bg-gray rounded-full relative overflow-hidden">
          {user.profileImage && (
            <Image
              className="object-cover"
              src={user.profileImage}
              alt="profile"
              fill
            />
          )}
        </div>
      </td>
      <td className="py-2">
        <span className="capitalize">
          {user.fullName?.first} {user.fullName?.last}
        </span>
      </td>
      <td className="py-2">
        <span>{user.createdAt && formatDate(new Date(user.createdAt))}</span>
      </td>
      <td className="py-2">
        {/* <span className="capitalize">{user.role ?? "Learner"}</span> */}
        <ChangeRole userId={user._id} role={user.role} />
      </td>
      <td className="py-2">
        <span>
          {user.levelInfo?.label ?? "Novice"} (Lvl {user.levelInfo?.level ?? 1})
        </span>
      </td>
      <td className="py-2 flex">
        <span>...</span>
      </td>
    </tr>
  ));
}
