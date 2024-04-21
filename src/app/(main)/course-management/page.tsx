import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CoursesSection from "@/components/coursesSection";
import { ICourse } from "@/types/course";
import { getServerSession } from "next-auth";

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

export default async function page() {
  const courses: Array<ICourse> = await fetchCourses();
  return (
    <div className="p-4">
      <CoursesSection
        id="courseManagement"
        title="Assigned Courses"
        courses={courses}
      />
    </div>
  );
}
