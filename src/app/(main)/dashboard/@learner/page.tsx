import { getServerSession } from "next-auth";
import CourseContainer from "./courseContainer";
import MyCourses from "./myCourses";
import ToDoListContainer from "./toDoList";
import UpComingTaskContainer from "./upComingTask";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ICourseVisited } from "@/types/view";
import { ICourseProgress } from "@/types/course";

const fetchCourseVisited = async () => {
  try {
    const session = await getServerSession(authOptions);
    const res = await fetch(`${process.env.API_URI}/api/v1/course/view`, {
      next: { tags: ["course_visit"] },
      headers: {
        Authorization: "Bearer " + session?.user.tokens.accessToken,
      },
    });

    if (!res.ok) throw new Error("Server error.");
    return res.json();
  } catch (error) {
    return [];
  }
};

const fetchCourseProgress = async () => {
  try {
    const session = await getServerSession(authOptions);
    const res = await fetch(`${process.env.API_URI}/api/v1/course/progress`, {
      headers: {
        Authorization: "Bearer " + session?.user.tokens.accessToken,
      },
    });
    if (!res.ok) throw new Error("Server error.");
    return res.json();
  } catch (error) {
    return [];
  }
};
const Dashboard = async () => {
  const courseVisitedPromise = fetchCourseVisited();
  const coursesProgressPromise = fetchCourseProgress();

  const [courseVisited, coursesProgress]: [
    courseVisited: Array<ICourseVisited>,
    coursesProgress: Array<ICourseProgress>
  ] = await Promise.all([courseVisitedPromise, coursesProgressPromise]);

  return (
    <div className="flex flex-col px-6 py-4 h-full gap-6">
      <div className="flex flex-col xl:flex-row w-full gap-6">
        <div className="flex flex-col w-full bg-white p-4 rounded-lg border border-gray border-opacity-20 h-[552px]">
          <h1 className="font-bold text-xl">Recently visited</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-4 gap-6 mt-4 h-full overflow-auto">
            {courseVisited.map((visited) => (
              <CourseContainer
                key={visited._id}
                imageUrl={
                  visited.course?.banner ??
                  "https://pbs.twimg.com/profile_images/1163911054788833282/AcA2LnWL_400x400.jpg"
                }
                text={visited.course?.name ?? ""}
                url={"/course/" + visited.course?._id}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-[432px]">
          <div className="bg-white flex flex-col gap-2 p-4 items-center justify-center rounded-lg border border-gray border-opacity-20 h-[128px]">
            <span className="font-bold text-3xl">3</span>
            <span className="font-medium text-2xl">Daily Quests Available</span>
          </div>
          <ToDoListContainer />
        </div>
      </div>

      <div className="flex flex-col-reverse xl:flex-row w-full gap-6">
        <div className="w-full">
          <MyCourses coursesProgress={coursesProgress} />
        </div>
        <div className="flex">
          <UpComingTaskContainer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
