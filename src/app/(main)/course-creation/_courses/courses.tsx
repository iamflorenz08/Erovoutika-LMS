import { ICourse } from "@/types/course";
import CourseSection from "./courseSection";
import CreateCourseButton from "./createCourseButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const fetchCourses = async (accessToken: string | any) => {
  if (!accessToken) return;
  const res = await fetch(`${process.env.API_URI}/api/v1/course`, {
    next: { tags: ["course"] },
    headers: {
      authorization: "Bearer " + accessToken,
    },
  });

  return res.json();
};

export default async function Courses() {
  const session = await getServerSession(authOptions);
  const courses: Array<ICourse> = await fetchCourses(
    session?.user.tokens.accessToken
  );
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-medium text-xl">Courses</h1>
        <CreateCourseButton />
      </div>
      <CourseSection courses={courses} />
    </>
  );
}
