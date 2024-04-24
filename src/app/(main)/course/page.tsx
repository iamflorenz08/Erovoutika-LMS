import CoursesSection from "../../../components/coursesSection";
import { ICourse } from "@/types/course";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

const fetchRecommendedCourses = async () => {
  try {
    const session = await getServerSession(authOptions);
    const res = await fetch(
      `${process.env.API_URI}/api/v1/course/recommended`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.user.tokens.accessToken,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) return [];

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchOwnedCourses = async () => {
  try {
    const session = await getServerSession(authOptions);
    const res = await fetch(`${process.env.API_URI}/api/v1/course/owned`, {
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
  const coursesPromise = fetchCourses();
  const recommendedCoursesPromise = fetchRecommendedCourses();
  const ownedCoursesPromise = fetchOwnedCourses();

  const [courses, recommendedCourses, ownedCourses] = await Promise.all([
    coursesPromise,
    recommendedCoursesPromise,
    ownedCoursesPromise,
  ]);

  return (
    <div className="px-6 py-4 flex flex-col gap-6">
      <CoursesSection id="owned" title="Owned Courses" courses={ownedCourses} />

      <CoursesSection id="all" title="Browse Courses" courses={courses} />

      <CoursesSection
        id="recommended"
        title="Recommended Courses"
        courses={recommendedCourses}
      />
    </div>
  );
}
