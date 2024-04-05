import { ICourse } from "@/types/course";
import CourseSlider from "./courseSlider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface IProps {
  id: "popular" | "recommended" | "all";
  title: string;
}

const fetchCourses = async () => {
  try {
    const session = await getServerSession(authOptions);
    const res = await fetch(`${process.env.API_URI}/api/v1/course`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.user.tokens.accessToken,
      },
    });
    const data = await res.json();
    if (!res.ok) return [];

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default async function CoursesSection({ title, id }: IProps) {
  const courses: Array<ICourse> = await fetchCourses();
  return (
    <section>
      <div className="p-4 bg-white border border-gray border-opacity-20 rounded-lg">
        <h1 className="font-semibold text-xl">{title}</h1>
      </div>

      <div className="relative h-[360px] mt-4 mx-6 ">
        <CourseSlider id={id} courses={courses} />
      </div>
    </section>
  );
}
