import { headers } from "next/headers";
import EditProfile from "./editProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IUser } from "@/types/userTypes";
const fetchUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Not authenticated.");
    const res = await fetch(
      `${process.env.API_URI}/api/v1/users/${session?.user._id}`,
      {
        next: { tags: ["user"] },
        headers: {
          Authorization: "Bearer " + session?.user.tokens.accessToken,
        },
      }
    );

    if (!res.ok) throw new Error("Server error");

    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export default async function page() {
  const user: IUser = await fetchUser();
  return <EditProfile user={user} />;
}
