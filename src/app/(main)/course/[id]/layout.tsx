import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Provider from "./provider";

interface IProps {
  params: { id: string };
  boughtCourse: React.ReactNode;
  buyCourse: React.ReactNode;
}

const isBought = async (courseId: string) => {
  try {
    const session = await getServerSession(authOptions);
    const res = await fetch(
      `${process.env.API_URI}/api/v1/course/student/check/${courseId}/${session?.user._id}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.user.tokens.accessToken,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) return false;
    if (!data.success) return false;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default async function layout({
  boughtCourse,
  buyCourse,
  params,
}: IProps) {
  const isCourseBought = await isBought(params.id);

  return (
    <>
      <Provider>{isCourseBought ? boughtCourse : buyCourse}</Provider>
    </>
  );
}
